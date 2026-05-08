import { useState } from 'react';
import ReactGA from 'react-ga4';

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

  const inputClass =
    'w-full p-3 bg-zinc-900 border border-zinc-700 text-sm font-medium text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder-zinc-500';
  const subtitleCyberClass =
    'text-[11px] font-mono-tech font-bold text-center mb-10 tracking-[0.2em] uppercase bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent animate-neon-flicker block select-none';

  const registrarConta = (e) => {
    e.preventDefault();

    if (cadSenha !== cadSenhaConfirmacao) {
      mostrarToast('As senhas não coincidem. Digite novamente.', 'erro');
      return;
    }

    const regexSenha = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regexSenha.test(cadSenha)) {
      mostrarToast(
        'Sua senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial (Ex: @, #, !).',
        'erro',
      );
      return;
    }

    fetch('https://borajogar-api.onrender.com/usuarios', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nome: cadNome,
        email: cadEmail,
        senha: cadSenha,
        telefone: cadTelefone,
        codigo_indicacao: cadCodigoConvite,
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        mostrarToast('Conta criada! Sua carteira já está pronta.', 'sucesso');
        if (window.fbq) window.fbq('track', 'CompleteRegistration');

        setFormEmail(cadEmail);
        setFormSenha(cadSenha);
        setModoLogin(true);
        setCadNome('');
        setCadEmail('');
        setCadSenha('');
        setCadSenhaConfirmacao('');
        setCadTelefone('');
        setCadCodigoConvite('');
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

        ReactGA.event({
          category: 'User',
          action: 'Login_Success',
          label: data.usuario.email,
        });
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
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          mostrarToast(data.mensagem, 'sucesso');
          setModoEsqueciSenha(false);
          setEsqueciEmail('');
        } else {
          mostrarToast(data.detail || 'Erro ao solicitar recuperação.', 'erro');
        }
      })
      .catch(() => mostrarToast('Erro de conexão.', 'erro'));
  };

  // ------------------------------------------------------------------
  // RENDERIZAÇÃO: MODO ESQUECI A SENHA
  // ------------------------------------------------------------------
  if (modoEsqueciSenha) {
    return (
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
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // RENDERIZAÇÃO: MODO CADASTRO
  // ------------------------------------------------------------------
  if (!modoLogin) {
    return (
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
              placeholder="WhatsApp (DDD+Número)"
              value={cadTelefone}
              onChange={(e) => setCadTelefone(e.target.value)}
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

            <div className="mt-4 rounded-xl border border-zinc-800 bg-zinc-950/50 p-4 shadow-inner">
              <p className="text-center text-[11px] leading-relaxed text-zinc-400">
                Ao clicar em "Finalizar Cadastro", você confirma que é maior de idade e declara que
                leu, compreendeu e concorda integralmente com os nossos{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAbaAtual('termos');
                    window.scrollTo(0, 0);
                  }}
                  className="font-bold text-emerald-400 underline decoration-emerald-500/50 underline-offset-2 transition-colors hover:text-emerald-300 hover:decoration-emerald-400"
                >
                  Termos de Uso
                </button>{' '}
                e{' '}
                <button
                  type="button"
                  onClick={() => {
                    setAbaAtual('privacidade');
                    window.scrollTo(0, 0);
                  }}
                  className="font-bold text-emerald-400 underline decoration-emerald-500/50 underline-offset-2 transition-colors hover:text-emerald-300 hover:decoration-emerald-400"
                >
                  Política de Privacidade
                </button>
                .
              </p>
            </div>

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-emerald-600 py-4 text-sm font-bold uppercase tracking-wide text-white shadow-lg shadow-emerald-500/30 transition-all hover:bg-emerald-500"
            >
              Finalizar Cadastro
            </button>

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
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------
  // RENDERIZAÇÃO PADRÃO: MODO LOGIN
  // ------------------------------------------------------------------
  return (
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
      </div>
    </div>
  );
}
