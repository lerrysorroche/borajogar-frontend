import { useState } from 'react';
import ReactGA from 'react-ga4';
import { auth, provider } from '../firebase';
import { signInWithPopup } from 'firebase/auth';

export default function Auth({
  setUsuarioLogado,
  setAbaAtual,
  mostrarToast,
  currentBanner,
  modoLogin,
  setModoLogin,
  modoEsqueciSenha,
  setModoEsqueciSenha,
}) {
  const [formEmail, setFormEmail] = useState('');
  const [formSenha, setFormSenha] = useState('');
  const [cadNome, setCadNome] = useState('');
  const [cadEmail, setCadEmail] = useState('');
  const [cadSenha, setCadSenha] = useState('');
  const [cadTelefone, setCadTelefone] = useState('');
  const [cadCodigoConvite, setCadCodigoConvite] = useState('');
  const [cadSenhaConfirmacao, setCadSenhaConfirmacao] = useState('');

  const [verSenhaLogin, setVerSenhaLogin] = useState(false);
  const [verSenhaCad, setVerSenhaCad] = useState(false);
  const [verSenhaCadConf, setVerSenhaCadConf] = useState(false);
  const [esqueciEmail, setEsqueciEmail] = useState('');

  // Estados para o fluxo do Google
  const [pedindoTelefoneGoogle, setPedindoTelefoneGoogle] = useState(false);
  const [dadosGoogleTemp, setDadosGoogleTemp] = useState(null);
  const [telefoneGoogle, setTelefoneGoogle] = useState('');

  const inputClass =
    'w-full p-3 bg-zinc-900 border border-zinc-700 text-sm font-medium text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder-zinc-500';
  const subtitleCyberClass =
    'text-[11px] font-mono-tech font-bold text-center mb-10 tracking-[0.2em] uppercase bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent animate-neon-flicker block select-none';

  const handleTelefoneChange = (e, setter) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);

    if (valor.length > 10) {
      valor = valor.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
    } else if (valor.length > 6) {
      valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4}).*/, '($1) $2-$3');
    } else if (valor.length > 2) {
      valor = valor.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
    } else if (valor.length > 0) {
      valor = valor.replace(/^(\d{0,2})/, '($1');
    }

    setter(valor);
  };

  // ==========================================
  // LÓGICA DE LOGIN COM GOOGLE
  // ==========================================
  const enviarGoogleParaBackend = async (email, nome, telefone) => {
    try {
      const res = await fetch('https://borajogar-api.onrender.com/login/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, nome, telefone }),
      });
      const data = await res.json();

      if (data.novo_usuario && data.mensagem === 'precisa_telefone') {
        setPedindoTelefoneGoogle(true);
        mostrarToast('Quase lá! Só precisamos do seu WhatsApp.', 'aviso');
      } else if (res.ok) {
        setUsuarioLogado(data.usuario);
        localStorage.setItem('usuario_locadora', JSON.stringify(data.usuario));
        localStorage.setItem('token_locadora', data.token);
        setAbaAtual(data.usuario.is_admin ? 'admin' : 'vitrine');
        mostrarToast(`Bem-vindo(a), ${data.usuario.nome}!`, 'sucesso');
        setPedindoTelefoneGoogle(false);
      } else {
        mostrarToast(data.detail || 'Erro ao logar com Google', 'erro');
      }
    } catch (error) {
      mostrarToast('Erro de conexão.', 'erro');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      setDadosGoogleTemp({ email: user.email, nome: user.displayName });
      enviarGoogleParaBackend(user.email, user.displayName, '');
    } catch (error) {
      mostrarToast('Login com Google cancelado ou falhou.', 'erro');
    }
  };

  const finalizarCadastroGoogle = (e) => {
    e.preventDefault();
    const telLimpo = telefoneGoogle.replace(/\D/g, '');
    if (telLimpo.length < 10) {
      mostrarToast('Por favor, informe um WhatsApp válido.', 'erro');
      return;
    }
    enviarGoogleParaBackend(dadosGoogleTemp.email, dadosGoogleTemp.nome, telLimpo);
  };

  // ==========================================
  // LÓGICA TRADICIONAL
  // ==========================================
  const registrarConta = (e) => {
    e.preventDefault();
    if (cadSenha !== cadSenhaConfirmacao) {
      mostrarToast('As senhas não coincidem. Digite novamente.', 'erro');
      return;
    }
    const regexSenha = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regexSenha.test(cadSenha)) {
      mostrarToast(
        'Sua senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial.',
        'erro',
      );
      return;
    }
    const telefoneLimpo = cadTelefone.replace(/\D/g, '');
    if (telefoneLimpo.length < 10) {
      mostrarToast('Por favor, informe um número de WhatsApp válido com o DDD.', 'erro');
      return;
    }

    fetch('https://borajogar-api.onrender.com/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: cadNome,
        email: cadEmail,
        senha: cadSenha,
        telefone: telefoneLimpo,
        codigo_indicacao: cadCodigoConvite,
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        mostrarToast('Conta criada! Faça o login para continuar.', 'sucesso');
        if (window.fbq) window.fbq('track', 'CompleteRegistration');
        setFormEmail(cadEmail);
        setFormSenha(cadSenha);
        setModoLogin(true);
      } else {
        mostrarToast(data.detail, 'erro');
      }
    });
  };

  const entrarNoSistema = (e) => {
    e.preventDefault();
    fetch('https://borajogar-api.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formEmail, senha: formSenha }),
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        setUsuarioLogado(data.usuario);
        localStorage.setItem('usuario_locadora', JSON.stringify(data.usuario));
        localStorage.setItem('token_locadora', data.token);
        setAbaAtual(data.usuario.is_admin ? 'admin' : 'vitrine');
        mostrarToast(`Bem-vindo, ${data.usuario.nome}!`, 'sucesso');
        ReactGA.event({ category: 'User', action: 'Login_Success', label: data.usuario.email });
      } else {
        mostrarToast(data.detail, 'erro');
      }
    });
  };

  const solicitarRecuperacaoSenha = (e) => {
    e.preventDefault();
    if (!esqueciEmail) return;
    mostrarToast('Enviando solicitação...', 'aviso');
    fetch('https://borajogar-api.onrender.com/esqueci-senha', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: esqueciEmail }),
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        mostrarToast(data.mensagem, 'sucesso');
        setModoEsqueciSenha(false);
        setEsqueciEmail('');
      } else {
        mostrarToast(data.detail, 'erro');
      }
    });
  };

  const ButtonGoogle = () => (
    <>
      <div className="relative my-6 flex items-center py-2">
        <div className="flex-grow border-t border-zinc-800"></div>
        <span className="shrink-0 px-4 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
          Ou entre mais rápido com
        </span>
        <div className="flex-grow border-t border-zinc-800"></div>
      </div>
      <button
        type="button"
        onClick={handleGoogleLogin}
        className="flex w-full items-center justify-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800 py-3.5 text-sm font-bold tracking-wide text-white transition-all hover:bg-zinc-700"
      >
        <svg className="h-5 w-5" viewBox="0 0 24 24">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Google
      </button>
    </>
  );

  const LayoutBase = ({ children }) => (
    <div
      className="flex min-h-screen items-center justify-center p-4 transition-all duration-1000 ease-in-out"
      style={{
        backgroundImage: `url('${currentBanner}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur"></div>
      <div className="animate-fade-in relative z-10 w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-2xl md:p-10">
        <h2 className="mb-8 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-center text-3xl font-black tracking-tighter text-transparent">
          BORA JOGAR!
        </h2>
        <span className={subtitleCyberClass}>A sua Próxima Aventura Começa Aqui!</span>
        {children}
      </div>
    </div>
  );

  // ------------------------------------------------------------------
  // TELA 1: CAPTURAR WHATSAPP (APÓS GOOGLE)
  // ------------------------------------------------------------------
  if (pedindoTelefoneGoogle) {
    return (
      <LayoutBase>
        <form onSubmit={finalizarCadastroGoogle} className="animate-fade-in space-y-5">
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/30 p-4 text-center">
            <span className="mb-2 block text-2xl">📱</span>
            <h3 className="mb-1 text-sm font-bold text-emerald-400">
              Olá, {dadosGoogleTemp?.nome}!
            </h3>
            <p className="text-xs font-medium text-zinc-300">
              Para garantir o envio do seu código de ativação e protegermos a sua conta, precisamos
              do seu WhatsApp oficial.
            </p>
          </div>
          <input
            type="text"
            placeholder="WhatsApp com DDD"
            value={telefoneGoogle}
            onChange={(e) => handleTelefoneChange(e, setTelefoneGoogle)}
            className={inputClass}
            required
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-emerald-600 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-500"
          >
            Concluir Cadastro
          </button>
        </form>
      </LayoutBase>
    );
  }

  // ------------------------------------------------------------------
  // TELA 2: ESQUECI A SENHA
  // ------------------------------------------------------------------
  if (modoEsqueciSenha) {
    return (
      <LayoutBase>
        <form onSubmit={solicitarRecuperacaoSenha} className="animate-fade-in space-y-5">
          <p className="mb-6 text-center text-sm leading-relaxed text-zinc-400">
            Digite seu e-mail de cadastro. Se ele existir, enviaremos uma senha temporária em
            instantes.
          </p>
          <input
            type="email"
            placeholder="Seu E-mail"
            value={esqueciEmail}
            onChange={(e) => setEsqueciEmail(e.target.value)}
            className={inputClass}
            required
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-amber-600 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-amber-500/30 transition-all hover:bg-amber-500"
          >
            Recuperar Senha
          </button>
          <div className="mt-8 border-t border-zinc-800 pt-6 text-center">
            <button
              type="button"
              onClick={() => setModoEsqueciSenha(false)}
              className="text-sm font-bold uppercase tracking-wider text-zinc-400 transition-colors hover:text-white"
            >
              Voltar para o Login
            </button>
          </div>
        </form>
      </LayoutBase>
    );
  }

  // ------------------------------------------------------------------
  // TELA 3: CADASTRO
  // ------------------------------------------------------------------
  if (!modoLogin) {
    return (
      <LayoutBase>
        <form onSubmit={registrarConta} className="animate-fade-in space-y-4">
          <input
            type="text"
            placeholder="Nome Completo"
            value={cadNome}
            onChange={(e) => setCadNome(e.target.value)}
            className={inputClass}
            required
          />
          <input
            type="email"
            placeholder="E-mail"
            value={cadEmail}
            onChange={(e) => setCadEmail(e.target.value)}
            className={inputClass}
            required
          />
          <input
            type="text"
            placeholder="WhatsApp com DDD"
            value={cadTelefone}
            onChange={(e) => handleTelefoneChange(e, setCadTelefone)}
            className={inputClass}
            required
          />

          <div className="relative">
            <input
              type={verSenhaCad ? 'text' : 'password'}
              placeholder="Crie uma Senha"
              value={cadSenha}
              onChange={(e) => setCadSenha(e.target.value)}
              className={`${inputClass} pr-12`}
              required
            />
            <button
              type="button"
              onClick={() => setVerSenhaCad(!verSenhaCad)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-white"
            >
              {verSenhaCad ? '🙈' : '👁️'}
            </button>
          </div>
          <div className="relative">
            <input
              type={verSenhaCadConf ? 'text' : 'password'}
              placeholder="Confirme sua Senha"
              value={cadSenhaConfirmacao}
              onChange={(e) => setCadSenhaConfirmacao(e.target.value)}
              className={`${inputClass} pr-12`}
              required
            />
            <button
              type="button"
              onClick={() => setVerSenhaCadConf(!verSenhaCadConf)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-white"
            >
              {verSenhaCadConf ? '🙈' : '👁️'}
            </button>
          </div>

          <input
            type="text"
            placeholder="Código de um Amigo (Opcional)"
            value={cadCodigoConvite}
            onChange={(e) => setCadCodigoConvite(e.target.value.toUpperCase())}
            className={`${inputClass} border-purple-500/50 bg-purple-950/20 uppercase text-purple-100 placeholder-purple-400/50`}
          />
          <button
            type="submit"
            className="mt-2 w-full rounded-xl bg-emerald-600 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-500"
          >
            Finalizar Cadastro
          </button>

          <ButtonGoogle />

          <div className="mt-6 border-t border-zinc-800 pt-6 text-center">
            <p className="text-sm leading-relaxed text-zinc-400">
              Já possui uma conta? <br />
              <button
                type="button"
                onClick={() => {
                  setModoLogin(true);
                  setModoEsqueciSenha(false);
                }}
                className="mt-3 text-sm font-black uppercase tracking-wider text-blue-400 transition-colors hover:text-blue-300"
              >
                Faça Login aqui
              </button>
            </p>
          </div>
        </form>
      </LayoutBase>
    );
  }

  // ------------------------------------------------------------------
  // TELA 4: LOGIN
  // ------------------------------------------------------------------
  return (
    <LayoutBase>
      <form onSubmit={entrarNoSistema} className="animate-fade-in space-y-5">
        <input
          type="email"
          placeholder="Seu E-mail"
          value={formEmail}
          onChange={(e) => setFormEmail(e.target.value)}
          className={inputClass}
          required
        />
        <div className="relative">
          <input
            type={verSenhaLogin ? 'text' : 'password'}
            placeholder="Sua Senha"
            value={formSenha}
            onChange={(e) => setFormSenha(e.target.value)}
            className={`${inputClass} pr-12`}
            required
          />
          <button
            type="button"
            onClick={() => setVerSenhaLogin(!verSenhaLogin)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-white"
          >
            {verSenhaLogin ? '🙈' : '👁️'}
          </button>
        </div>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => setModoEsqueciSenha(true)}
            className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 transition-colors hover:text-blue-400"
          >
            Esqueceu a senha?
          </button>
        </div>
        <button
          type="submit"
          className="w-full rounded-xl bg-blue-600 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-blue-500/30 transition-all hover:bg-blue-500"
        >
          Entrar na Loja
        </button>

        <ButtonGoogle />

        <div className="mt-8 border-t border-zinc-800 pt-6 text-center">
          <p className="text-sm leading-relaxed text-zinc-400">
            Ainda não tem conta? <br />
            <button
              type="button"
              onClick={() => {
                setModoLogin(false);
                setModoEsqueciSenha(false);
              }}
              className="mt-3 text-sm font-black uppercase tracking-wider text-emerald-400 transition-colors hover:text-emerald-300"
            >
              CRIE UMA CONTA GRÁTIS
            </button>
          </p>
        </div>
      </form>
    </LayoutBase>
  );
}
