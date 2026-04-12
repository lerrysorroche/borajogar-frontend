// ==============================================================================
// BORA JOGAR! - FRONTEND (React)
// ==============================================================================

import { useState, useEffect } from 'react'

function App() {
  const NUMERO_WHATSAPP_SUPORTE = "5541995948532"; 
  const JOGOS_POR_PAGINA = 12; 

  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const usuarioSalvo = localStorage.getItem('usuario_locadora')
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null
  })
  
  const [abaAtual, setAbaAtual] = useState('vitrine') 
  const [modoLogin, setModoLogin] = useState(true) 
  const [toast, setToast] = useState({ visivel: false, mensagem: '', tipo: 'sucesso' })
  const [modalConfirmacao, setModalConfirmacao] = useState({ visivel: false, tipo: '', jogoId: null, jogoTitulo: '', preco7: 0, preco14: 0, diasEscolhidos: 7 })
  const [modalDescricao, setModalDescricao] = useState(null);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)

  const [formEmail, setFormEmail] = useState('')
  const [formSenha, setFormSenha] = useState('')
  const [cadNome, setCadNome] = useState('')
  const [cadEmail, setCadEmail] = useState('')
  const [cadSenha, setCadSenha] = useState('')
  const [cadTelefone, setCadTelefone] = useState('')
  const [cadCodigoConvite, setCadCodigoConvite] = useState('')

  // Confirmações de Senha
  const [cadSenhaConfirmacao, setCadSenhaConfirmacao] = useState('')
  const [mudarSenhaNovaConfirmacao, setMudarSenhaNovaConfirmacao] = useState('')

  // Estados do Olhinho (Mostrar/Ocultar Senha)
  const [verSenhaLogin, setVerSenhaLogin] = useState(false)
  const [verSenhaCad, setVerSenhaCad] = useState(false)
  const [verSenhaCadConf, setVerSenhaCadConf] = useState(false)
  const [verSenhaAtual, setVerSenhaAtual] = useState(false)
  const [verSenhaNova, setVerSenhaNova] = useState(false)
  const [verSenhaNovaConf, setVerSenhaNovaConf] = useState(false)

  const [modoEsqueciSenha, setModoEsqueciSenha] = useState(false)
  const [esqueciEmail, setEsqueciEmail] = useState('')
  const [mudarSenhaAtual, setMudarSenhaAtual] = useState('')
  const [mudarSenhaNova, setMudarSenhaNova] = useState('')

  const [jogos, setJogos] = useState([])
  const [meusAlugueis, setMeusAlugueis] = useState([])
  const [minhasReservas, setMinhasReservas] = useState([]) 
  const [extrato, setExtrato] = useState([]) 
  const [notificacoes, setNotificacoes] = useState([]) // 🚀 NOVA VARIÁVEL AQUI 
  
  // ESTADOS DA ENQUETE
  const [enqueteOpcoes, setEnqueteOpcoes] = useState([])
  const [meuVoto, setMeuVoto] = useState(null)
  const [novaOpcaoEnqueteTitulo, setNovaOpcaoEnqueteTitulo] = useState('')
  const [novaOpcaoEnqueteImagem, setNovaOpcaoEnqueteImagem] = useState('')

  const [configSistema, setConfigSistema] = useState({ devolucao_dinamica: false, valor_por_dia: 2.0, anuncio_ativo: false, mensagem_anuncio: "" })
  const [estatisticasAdmin, setEstatisticasAdmin] = useState({ faturamento: 0, total_clientes: 0, locacoes_ativas: 0 })
  const [contasManutencao, setContasManutencao] = useState([])
  const [novasSenhasTemp, setNovasSenhasTemp] = useState({}) 
  const [codigosGerados2FA, setCodigosGerados2FA] = useState({})
  
  const [novoJogoTitulo, setNovoJogoTitulo] = useState('')
  const [novoJogoPlataforma, setNovoJogoPlataforma] = useState('PS5')
  const [novoJogoPreco, setNovoJogoPreco] = useState('')
  const [novoJogoPreco14, setNovoJogoPreco14] = useState('')
  const [novoJogoDescricao, setNovoJogoDescricao] = useState('')
  const [novoJogoImagem, setNovoJogoImagem] = useState('') 
  const [novoJogoTempo, setNovoJogoTempo] = useState('') 
  const [novoJogoNota, setNovoJogoNota] = useState('')
  const [novoJogoDataLancamento, setNovoJogoDataLancamento] = useState('') 
  
  const [novaContaJogoId, setNovaContaJogoId] = useState('')
  const [novaContaEmail, setNovaContaEmail] = useState('')
  const [novaContaSenha, setNovaContaSenha] = useState('')
  const [novaContaMfaSecret, setNovaContaMfaSecret] = useState('')

  const [paginaCatalogo, setPaginaCatalogo] = useState(0);
  const [paginaClientes, setPaginaClientes] = useState(0);

  const [indiceBanner, setIndiceBanner] = useState(0);

  const [modalEdicaoJogo, setModalEdicaoJogo] = useState(null)
  const [modalEdicaoCliente, setModalEdicaoCliente] = useState(null)
  
  const [termoBusca, setTermoBusca] = useState('')
  const [buscaEstoque, setBuscaEstoque] = useState('')
  const [buscaLocacao, setBuscaLocacao] = useState('')
  const [buscaCliente, setBuscaCliente] = useState('')
  const [ordenacaoClientes, setOrdenacaoClientes] = useState('recentes')
  const [filtroSaldoClientes, setFiltroSaldoClientes] = useState('todos')

  const [buscaManutencao, setBuscaManutencao] = useState('')
  const [ordenacaoLocacoes, setOrdenacaoLocacoes] = useState('expira_breve')
  const [ordenacaoManutencao, setOrdenacaoManutencao] = useState('urgente')
  const [todasReservas, setTodasReservas] = useState([])
  const [buscaReservaAdmin, setBuscaReservaAdmin] = useState('')
  const [ordenacaoReservaAdmin, setOrdenacaoReservaAdmin] = useState('antigas')

  const [todasLocacoes, setTodasLocacoes] = useState([])
  const [todosUsuarios, setTodosUsuarios] = useState([])

  const [valorRecarga, setValorRecarga] = useState('15')
  const [cupomRecarga, setCupomRecarga] = useState('')
  const [cpfRecarga, setCpfRecarga] = useState('')
  const [listaCupons, setListaCupons] = useState([])
  const [novoCupomCodigo, setNovoCupomCodigo] = useState('')
  const [novoCupomTipo, setNovoCupomTipo] = useState('PORCENTAGEM')
  const [novoCupomValor, setNovoCupomValor] = useState('')

  const [pixPendente, setPixPendente] = useState(null)

  const [paginaAtual, setPaginaAtual] = useState(1)
  const [filtroPlataforma, setFiltroPlataforma] = useState('TODAS')
  const [filtroDisponibilidade, setFiltroDisponibilidade] = useState('TODOS')

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token_locadora');
    return { 'Content-Type': 'application/json', 'Authorization': token ? `Bearer ${token}` : '' };
  }

  const mostrarToast = (mensagem, tipo = 'sucesso') => {
    setToast({ visivel: true, mensagem, tipo })
    setTimeout(() => { setToast(prev => ({ ...prev, visivel: false })) }, 3500)
  }

  const solicitarGeracaoPix = (e) => {
    e.preventDefault();
    const valorReal = parseFloat(valorRecarga);
    if (isNaN(valorReal) || valorReal < 15) { mostrarToast("O valor mínimo para recarga é de R$ 15,00", "erro"); return; }
    
    // 🚀 VALIDAÇÃO SIMPLES DO CPF
    const cpfLimpo = cpfRecarga.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) { mostrarToast("Por favor, digite um CPF válido com 11 números.", "erro"); return; }
    
    mostrarToast("Gerando código PIX seguro...", "aviso");

    fetch('https://borajogar-api.onrender.com/recarga/gerar-pix', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ utilizador_id: usuarioLogado.id, valor: valorReal, cupom: cupomRecarga, cpf: cpfLimpo }) // 🚀 ENVIANDO O CPF
    }).then(async res => {
      const data = await res.json()
      if (res.ok) { 
        setPixPendente({
            payment_id: data.payment_id,
            qr_code: data.qr_code,
            copia_cola: data.copia_cola
        });
      } else { mostrarToast(data.detail, "erro") }
    })
  }

  useEffect(() => {
    let intervalId;
    if (pixPendente) {
      intervalId = setInterval(() => {
        fetch(`https://borajogar-api.onrender.com/recarga/status/${pixPendente.payment_id}`)
        .then(res => res.json())
        .then(data => {
            if (data.status === 'PAGO') {
                mostrarToast("✅ Pagamento Confirmado! Saldo liberado.", "sucesso");
                setPixPendente(null); 
                setCupomRecarga('');
                setValorRecarga('15');
                carregarDados(); 
            }
        }).catch(() => console.log("Aguardando verificação..."));
      }, 5000); 
    }
    return () => clearInterval(intervalId); 
  }, [pixPendente])

  useEffect(() => {
    const urls = configSistema.banners_url ? configSistema.banners_url.split(',').map(u => u.trim()).filter(u => u) : [];
    if (urls.length <= 1) return; 

    const intervalo = setInterval(() => {
      setIndiceBanner(prev => (prev + 1) % urls.length);
    }, 8000); 

    return () => clearInterval(intervalo);
  }, [configSistema.banners_url]);

  const solicitarRecuperacaoSenha = (e) => {
    e.preventDefault();
    if (!esqueciEmail) return;
    mostrarToast("Enviando solicitação...", "aviso");
    
    fetch('https://borajogar-api.onrender.com/esqueci-senha', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: esqueciEmail })
    }).then(async res => {
      const data = await res.json();
      if (res.ok) {
        mostrarToast(data.mensagem, "sucesso");
        setModoEsqueciSenha(false);
        setEsqueciEmail('');
      } else {
        mostrarToast(data.detail || "Erro ao solicitar recuperação.", "erro");
      }
    }).catch(() => mostrarToast("Erro de conexão.", "erro"));
  }

  const alterarMinhaSenha = (e) => {
    e.preventDefault();

    if (mudarSenhaNova !== mudarSenhaNovaConfirmacao) {
      mostrarToast("A nova senha e a confirmação não coincidem.", "erro");
      return;
    }

    // Trava de Segurança: Mesma regra do cadastro
    const regexSenha = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regexSenha.test(mudarSenhaNova)) {
      mostrarToast("A nova senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial (Ex: @, #, !).", "erro");
      return; 
    }

    fetch('https://borajogar-api.onrender.com/mudar-senha', {
      method: 'POST', headers: getAuthHeaders(),
      body: JSON.stringify({ utilizador_id: usuarioLogado.id, senha_atual: mudarSenhaAtual, nova_senha: mudarSenhaNova })
    }).then(async res => {
      const data = await res.json();
      if (res.ok) {
        mostrarToast(data.mensagem, "sucesso");
        setMudarSenhaAtual('');
        setMudarSenhaNova('');
        setMudarSenhaNovaConfirmacao('');
      } else {
        mostrarToast(data.detail, "erro");
      }
    }).catch(() => mostrarToast("Erro de conexão.", "erro"));
  }

  const abrirConfirmacao = (tipo, jogoId, jogoTitulo, preco7, preco14, diasEscolhidosInicial = 7) => {
    // 🚀 MUDANÇA: Se não tem conta, manda fazer login/cadastro na hora de alugar!
    if (!usuarioLogado) {
      mostrarToast("Faça login ou crie uma conta grátis para alugar jogos!", "aviso");
      setModoLogin(true);
      setModoEsqueciSenha(false);
      setAbaAtual('login');
      window.scrollTo(0, 0);
      return;
    }

    const precoAlvo = diasEscolhidosInicial === 14 ? preco14 : preco7;
    if (usuarioLogado.saldo < precoAlvo) { mostrarToast(`Saldo insuficiente para ${diasEscolhidosInicial} dias!\nColoque créditos em "Meus Acessos"!`, "erro"); return; }
    if (usuarioLogado.saldo < 0) { mostrarToast(`Você está negativado!`, "erro"); return; }
    setModalConfirmacao({ visivel: true, tipo, jogoId, jogoTitulo, preco7, preco14, diasEscolhidos: diasEscolhidosInicial });
  }

  const confirmarTransacao = () => {
    const precoFinal = modalConfirmacao.diasEscolhidos === 7 ? modalConfirmacao.preco7 : modalConfirmacao.preco14;
    
    if (usuarioLogado.saldo < precoFinal) {
        mostrarToast("Saldo insuficiente para esta opção de dias!", "erro");
        return;
    }

    if (modalConfirmacao.tipo === 'aluguel') { executarAluguel(modalConfirmacao.jogoId, precoFinal, modalConfirmacao.diasEscolhidos); } 
    else { executarReserva(modalConfirmacao.jogoId, precoFinal, modalConfirmacao.diasEscolhidos); }
    
    setModalConfirmacao({ visivel: false, tipo: '', jogoId: null, jogoTitulo: '', preco7: 0, preco14: 0, diasEscolhidos: 7 }); 
  }

  const executarAluguel = (jogoId, precoJogo, dias) => {
    fetch('https://borajogar-api.onrender.com/locacoes', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ utilizador_id: usuarioLogado.id, jogo_id: jogoId, dias_aluguel: dias }) 
    }).then(async res => {
      const data = await res.json()
      if (res.ok) { 
        mostrarToast(data.mensagem, "sucesso"); 
        setUsuarioLogado({...usuarioLogado, saldo: usuarioLogado.saldo - precoJogo});
        carregarDados();
      } else { mostrarToast(data.detail, "erro") }
    })
  }

  const executarReserva = (jogoId, precoJogo, dias) => {
    fetch('https://borajogar-api.onrender.com/reservas', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ utilizador_id: usuarioLogado.id, jogo_id: jogoId, dias_aluguel: dias }) 
    }).then(async res => {
      const data = await res.json()
      if (res.ok) { 
        mostrarToast(data.mensagem, "sucesso"); 
        setUsuarioLogado({...usuarioLogado, saldo: usuarioLogado.saldo - precoJogo});
        carregarDados();
      } else { mostrarToast(data.detail, "erro") }
    })
  }

  const devolverAntecipado = (locacaoId, dataFim) => {
    const horasRestantes = (new Date(dataFim) - new Date()) / (1000 * 60 * 60);
    const diasRestantes = Math.floor(horasRestantes / 24);
    let msg = "Atenção: Tem certeza que deseja devolver este jogo agora e encerrar seu acesso?";
    if (diasRestantes > 0) {
        msg += `\n\n🎁 Você receberá um cashback de R$ ${(diasRestantes * configSistema.valor_por_dia).toFixed(2)} direto na sua carteira assim que o Admin verificar sua conta!`;
    } else { msg += "\n\n⚠️ Faltam menos de 24h para o fim do prazo, não haverá cashback."; }
    if(window.confirm(msg)) {
        fetch('https://borajogar-api.onrender.com/devolver', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ locacao_id: locacaoId, utilizador_id: usuarioLogado.id })
        }).then(async res => {
            const data = await res.json();
            if(res.ok) { mostrarToast(data.mensagem, "sucesso"); carregarDados(); } 
            else { mostrarToast(data.detail, "erro"); }
        });
    }
  }

  const gerarCodigo2FA = async (locacaoId) => {
    try {
      const res = await fetch(`https://borajogar-api.onrender.com/gerar-2fa/${locacaoId}/${usuarioLogado.id}`);
      const data = await res.json();
      if (res.ok) {
        setCodigosGerados2FA(prev => ({ ...prev, [locacaoId]: data.codigo }));
        mostrarToast("Código gerado! Digite rápido.", "aviso");
        setTimeout(() => {
          setCodigosGerados2FA(prev => { const novo = { ...prev }; delete novo[locacaoId]; return novo; });
        }, 30000);
      } else { mostrarToast(data.detail, "erro"); }
    } catch (e) { mostrarToast("Erro de conexão.", "erro"); }
  }

  const buscarDadosDoJogo = async () => {
    if (!novoJogoTitulo) { mostrarToast("Digite o título para buscar!", "aviso"); return; }
    const RAWG_API_KEY = "8638e63fc8cf45459e0fb1cf9db3de42"; 
    try {
      mostrarToast("Procurando jogo no banco de dados...", "aviso");
      const resBusca = await fetch(`https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(novoJogoTitulo)}&page_size=1`);
      const dadosBusca = await resBusca.json();
      if (dadosBusca.results && dadosBusca.results.length > 0) {
        const jogoEncontrado = dadosBusca.results[0];
        setNovoJogoImagem(jogoEncontrado.background_image || "");
        
        if (jogoEncontrado.released) {
          setNovoJogoDataLancamento(jogoEncontrado.released);
        }

        const resDetalhes = await fetch(`https://api.rawg.io/api/games/${jogoEncontrado.id}?key=${RAWG_API_KEY}`);
        const dadosDetalhes = await resDetalhes.json();
        if (dadosDetalhes.playtime) setNovoJogoTempo(`${dadosDetalhes.playtime}h`); else setNovoJogoTempo("");
        if (dadosDetalhes.rating) setNovoJogoNota(dadosDetalhes.rating); else setNovoJogoNota("0");

        if (dadosDetalhes.description_raw) {
          const descricaoIngles = dadosDetalhes.description_raw;
          try {
            const urlTradutor = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(descricaoIngles)}`;
            const resTraducao = await fetch(urlTradutor);
            const dadosTraducao = await resTraducao.json();
            const descricaoPortugues = dadosTraducao[0].map(item => item[0]).join("");
            setNovoJogoDescricao(descricaoPortugues);
          } catch (erroTraducao) {
            setNovoJogoDescricao(descricaoIngles);
            mostrarToast("Capa importada.", "aviso"); return;
          }
        }
        mostrarToast(`Dados importados com sucesso!`, "sucesso");
      } else { mostrarToast("Jogo não encontrado.", "erro"); }
    } catch (erro) { mostrarToast("Erro ao conectar com RAWG.", "erro"); }
  }

  const registrarConta = (e) => {
    e.preventDefault()

    if (cadSenha !== cadSenhaConfirmacao) {
      mostrarToast("As senhas não coincidem. Digite novamente.", "erro");
      return; 
    }

    const regexSenha = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regexSenha.test(cadSenha)) {
      mostrarToast("Sua senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial (Ex: @, #, !).", "erro");
      return; 
    }

    fetch('https://borajogar-api.onrender.com/usuarios', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome: cadNome, email: cadEmail, senha: cadSenha, telefone: cadTelefone, codigo_indicacao: cadCodigoConvite })
    }).then(async res => {
      const data = await res.json()
      if (res.ok) {
        mostrarToast("Conta criada! Sua carteira já está pronta.", "sucesso")
        setFormEmail(cadEmail); setFormSenha(cadSenha); setModoLogin(true); 
        setCadNome(''); setCadEmail(''); setCadSenha(''); setCadSenhaConfirmacao(''); setCadTelefone(''); setCadCodigoConvite('');
      } else { mostrarToast(data.detail, "erro") }
    })
  }

  const entrarNoSistema = (e) => {
    e.preventDefault()
    fetch('https://borajogar-api.onrender.com/login', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: formEmail, senha: formSenha })
    }).then(async res => {
      const data = await res.json()
      if (res.ok) {
        setUsuarioLogado(data.usuario)
        localStorage.setItem('usuario_locadora', JSON.stringify(data.usuario))
        localStorage.setItem('token_locadora', data.token)
        setAbaAtual(data.usuario.is_admin ? 'admin' : 'vitrine') 
        mostrarToast(`Bem-vindo, ${data.usuario.nome}!`, "sucesso")
      } else { mostrarToast(data.detail, "erro") }
    })
  }

  const sair = () => { 
    setUsuarioLogado(null); setAbaAtual('vitrine'); localStorage.removeItem('usuario_locadora'); localStorage.removeItem('token_locadora'); 
  }

  // FUNÇÕES DA ENQUETE
  const votarEnquete = (opcaoId) => {
    if (!usuarioLogado) {
       mostrarToast("Você precisa criar uma conta grátis ou fazer login para votar!", "aviso");
       setModoLogin(false); // Direciona direto pra aba de criar conta
       setModoEsqueciSenha(false);
       setAbaAtual('login');
       window.scrollTo(0, 0);
       return;
    }
    fetch('https://borajogar-api.onrender.com/enquete/votar', {
       method: 'POST', headers: getAuthHeaders(),
       body: JSON.stringify({ utilizador_id: usuarioLogado.id, opcao_id: opcaoId })
    }).then(async res => {
       if (res.ok) {
           mostrarToast("Voto registrado com sucesso! Obrigado.", "sucesso");
           setMeuVoto(opcaoId);
           carregarDados();
       } else {
           const data = await res.json();
           mostrarToast(data.detail, "erro");
       }
    });
  }

  const adicionarOpcaoEnquete = (e) => {
      e.preventDefault();
      fetch('https://borajogar-api.onrender.com/admin/enquete', {
          method: 'POST', headers: getAuthHeaders(),
          body: JSON.stringify({ titulo: novaOpcaoEnqueteTitulo, url_imagem: novaOpcaoEnqueteImagem })
      }).then(res => {
          if (res.ok) {
              mostrarToast("Opção adicionada à enquete!", "sucesso");
              setNovaOpcaoEnqueteTitulo(''); setNovaOpcaoEnqueteImagem('');
              carregarDados();
          } else { mostrarToast("Erro ao adicionar.", "erro"); }
      })
  }

  const removerOpcaoEnquete = (id) => {
      if(window.confirm("Remover esta opção da enquete?")) {
          fetch(`https://borajogar-api.onrender.com/admin/enquete/${id}`, { method: 'DELETE', headers: getAuthHeaders() })
          .then(res => { if(res.ok) carregarDados(); })
      }
  }

  const limparEnquete = () => {
      if(window.confirm("ATENÇÃO: Isso apagará TODOS os jogos da enquete e zerará TODOS os votos. Tem certeza?")) {
          fetch('https://borajogar-api.onrender.com/admin/enquete', { method: 'DELETE', headers: getAuthHeaders() })
          .then(res => { if(res.ok) carregarDados(); })
      }
  }

  const carregarDados = () => {
    // ====================================================================
    // 🚀 1. DADOS PÚBLICOS (Garante que sempre receba um Array)
    // ====================================================================
    fetch('https://borajogar-api.onrender.com/jogos').then(res => res.ok ? res.json() : []).then(dados => setJogos(Array.isArray(dados) ? dados : []));
    fetch('https://borajogar-api.onrender.com/configuracoes').then(res => res.ok ? res.json() : {}).then(dados => setConfigSistema(dados));
    
    let urlEnquete = 'https://borajogar-api.onrender.com/enquete';
    if (usuarioLogado && usuarioLogado.id) urlEnquete += `?usuario_id=${usuarioLogado.id}`;
    fetch(urlEnquete).then(res => res.ok ? res.json() : {opcoes: []}).then(dados => {
        setEnqueteOpcoes(dados.opcoes || []);
        if (dados.voto_usuario) setMeuVoto(dados.voto_usuario);
    });

    // ====================================================================
    // 🚀 2. TRAVA DE SEGURANÇA 
    // ====================================================================
    if (!usuarioLogado) return;
    
    // ====================================================================
    // 🚀 3. DADOS DE ADMIN
    // ====================================================================
    if (usuarioLogado.is_admin) {
      fetch('https://borajogar-api.onrender.com/admin/locacoes', { headers: getAuthHeaders() }).then(res => res.ok ? res.json() : []).then(dados => setTodasLocacoes(Array.isArray(dados) ? dados : []))
      fetch('https://borajogar-api.onrender.com/admin/reservas', { headers: getAuthHeaders() }).then(res => res.ok ? res.json() : []).then(dados => setTodasReservas(Array.isArray(dados) ? dados : []))
      fetch('https://borajogar-api.onrender.com/admin/estatisticas', { headers: getAuthHeaders() }).then(res => res.ok ? res.json() : {faturamento: 0, total_clientes: 0, locacoes_ativas: 0}).then(dados => setEstatisticasAdmin(dados))
      fetch('https://borajogar-api.onrender.com/usuarios', { headers: getAuthHeaders() }).then(res => res.ok ? res.json() : []).then(dados => setTodosUsuarios(Array.isArray(dados) ? dados : []))
      fetch('https://borajogar-api.onrender.com/admin/manutencao', { headers: getAuthHeaders() }).then(res => res.ok ? res.json() : []).then(dados => setContasManutencao(Array.isArray(dados) ? dados : []))
    }
    
    // ====================================================================
    // 🚀 4. DADOS DO CLIENTE
    // ====================================================================
    fetch(`https://borajogar-api.onrender.com/meus-alugueis/${usuarioLogado.id}`).then(res => res.ok ? res.json() : []).then(dados => setMeusAlugueis(Array.isArray(dados) ? dados : []))
    fetch(`https://borajogar-api.onrender.com/minhas-reservas/${usuarioLogado.id}`).then(res => res.ok ? res.json() : []).then(dados => setMinhasReservas(Array.isArray(dados) ? dados : []))
    fetch(`https://borajogar-api.onrender.com/extrato/${usuarioLogado.id}`).then(res => res.ok ? res.json() : []).then(dados => setExtrato(Array.isArray(dados) ? dados : []))
    fetch(`https://borajogar-api.onrender.com/notificacoes/${usuarioLogado.id}`).then(res => res.ok ? res.json() : []).then(dados => setNotificacoes(Array.isArray(dados) ? dados : []))
    
    // 🚀 CORREÇÃO DO SALDO GLOBAL
    fetch(`https://borajogar-api.onrender.com/usuarios/${usuarioLogado.id}/saldo`)
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data && data.saldo !== undefined) {
          const saldoReal = parseFloat(data.saldo);
          setUsuarioLogado(prev => ({ ...prev, saldo: saldoReal }));
          
          const userStorage = JSON.parse(localStorage.getItem('usuarioBoraJogar'));
          if (userStorage) {
            userStorage.saldo = saldoReal;
            localStorage.setItem('usuarioBoraJogar', JSON.stringify(userStorage));
          }
        }
      }).catch(err => console.log("Aguardando backend..."));
  }

  // 🚀 FUNÇÕES DE AÇÃO DO ALERTA DE FILA
  const manterReserva = (notificacaoId) => {
    fetch('https://borajogar-api.onrender.com/notificacoes/ler', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notificacao_id: notificacaoId })
    }).then(() => {
        mostrarToast("Perfeito! Acompanhe a nova data em Minhas Reservas.", "sucesso");
        carregarDados();
    });
  }

  const cancelarReservaComEstorno = (reservaId, notificacaoId) => {
    if(!window.confirm("Tem certeza que deseja cancelar esta reserva e receber o crédito de volta na carteira?")) return;
    fetch('https://borajogar-api.onrender.com/reservas/cancelar', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ reserva_id: reservaId, utilizador_id: usuarioLogado.id, notificacao_id: notificacaoId })
    }).then(async res => {
      const data = await res.json();
      if(res.ok) { mostrarToast(data.mensagem, "sucesso"); carregarDados(); }
      else { mostrarToast(data.detail, "erro"); }
    })
  }

  useEffect(() => { carregarDados(); }, [usuarioLogado?.id]) 
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [abaAtual, paginaAtual]);

  const salvarConfiguracoesDireto = (novaConfig, msgSucesso) => {
    fetch('https://borajogar-api.onrender.com/admin/configuracoes', {
        method: 'POST', headers: getAuthHeaders(),
        body: JSON.stringify(novaConfig)
    }).then(res => {
        if(res.ok) { mostrarToast(msgSucesso, "sucesso"); } 
        else { mostrarToast("Erro ao salvar.", "erro"); }
    });
  }

  const toggleAnuncio = () => {
    const novaConfig = { ...configSistema, anuncio_ativo: !configSistema.anuncio_ativo };
    setConfigSistema(novaConfig);
    salvarConfiguracoesDireto(novaConfig, novaConfig.anuncio_ativo ? "✅ Banner Ligado!" : "❌ Banner Desligado!");
  }

  const salvarConfiguracoesGlobais = () => {
    salvarConfiguracoesDireto(configSistema, "💾 Texto do Anúncio Salvo!");
  }

  const cadastrarJogo = (e) => {
    e.preventDefault()
    fetch('https://borajogar-api.onrender.com/jogos', {
      method: 'POST', headers: getAuthHeaders(),
      body: JSON.stringify({ 
        titulo: novoJogoTitulo, 
        plataforma: novoJogoPlataforma, 
        preco_aluguel: parseFloat(novoJogoPreco), 
        preco_aluguel_14: parseFloat(novoJogoPreco14) || 0.0, 
        descricao: novoJogoDescricao, 
        url_imagem: novoJogoImagem, 
        tempo_jogo: novoJogoTempo, 
        nota: parseFloat(novoJogoNota) || 0,
        data_lancamento: novoJogoDataLancamento || null 
      })
    }).then(res => {
      if (res.ok) { 
        mostrarToast("Jogo cadastrado!", "sucesso"); carregarDados(); 
        setNovoJogoTitulo(''); setNovoJogoPreco(''); setNovoJogoPreco14(''); setNovoJogoDescricao(''); setNovoJogoImagem(''); setNovoJogoTempo(''); setNovoJogoNota(''); setNovoJogoDataLancamento('');
      } else { mostrarToast("Erro ao cadastrar.", "erro") }
    })
  }

  const salvarEdicaoJogo = (e) => {
    e.preventDefault();
    if (!modalEdicaoJogo) return;

    fetch(`https://borajogar-api.onrender.com/jogos/${modalEdicaoJogo.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        titulo: modalEdicaoJogo.titulo,
        plataforma: modalEdicaoJogo.plataforma,
        preco_aluguel: parseFloat(modalEdicaoJogo.preco_aluguel),
        preco_aluguel_14: parseFloat(modalEdicaoJogo.preco_aluguel_14) || 0.0,
        descricao: modalEdicaoJogo.descricao,
        url_imagem: modalEdicaoJogo.url_imagem,
        tempo_jogo: modalEdicaoJogo.tempo_jogo,
        nota: parseFloat(modalEdicaoJogo.nota) || 0,
        data_lancamento: modalEdicaoJogo.data_lancamento || null 
      })
    }).then(async res => {
      if (res.ok) {
        mostrarToast("Jogo atualizado com sucesso!", "sucesso");
        setModalEdicaoJogo(null);
        carregarDados();
      } else {
        const data = await res.json();
        mostrarToast(data.detail || "Erro ao atualizar jogo.", "erro");
      }
    }).catch(() => mostrarToast("Erro de conexão.", "erro"));
  }

  const salvarEdicaoCliente = (e) => {
    e.preventDefault();
    if (!modalEdicaoCliente) return;

    fetch(`https://borajogar-api.onrender.com/usuarios/${modalEdicaoCliente.id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        nome: modalEdicaoCliente.nome,
        email: modalEdicaoCliente.email,
        telefone: modalEdicaoCliente.telefone,
        saldo: parseFloat(modalEdicaoCliente.saldo),
        motivo_ajuste: modalEdicaoCliente.motivo_ajuste || "Ajuste Administrativo" // 🚀 Envia o motivo
      })
    }).then(async res => {
      if (res.ok) {
        mostrarToast("Cliente atualizado com sucesso!", "sucesso");
        setModalEdicaoCliente(null);
        carregarDados();
      } else {
        const data = await res.json();
        mostrarToast(data.detail || "Erro ao atualizar cliente.", "erro");
      }
    }).catch(() => mostrarToast("Erro de conexão.", "erro"));
  }

  const cadastrarConta = (e) => {
    e.preventDefault()
    fetch('https://borajogar-api.onrender.com/contas', {
      method: 'POST', headers: getAuthHeaders(),
      body: JSON.stringify({ jogo_id: parseInt(novaContaJogoId), email_login: novaContaEmail, senha_login: novaContaSenha, mfa_secret: novaContaMfaSecret })
    }).then(async res => {
      if (res.ok) { 
        mostrarToast("Conta adicionada ao estoque!", "sucesso"); 
        setNovaContaEmail(''); setNovaContaSenha(''); setNovaContaMfaSecret(''); carregarDados(); 
      } else { const data = await res.json(); mostrarToast(data.detail, "erro") }
    })
  }

  const cadastrarCupom = (e) => {
    e.preventDefault();
    fetch('https://borajogar-api.onrender.com/admin/cupons', {
      method: 'POST', headers: getAuthHeaders(),
      body: JSON.stringify({ codigo: novoCupomCodigo, tipo: novoCupomTipo, valor: parseFloat(novoCupomValor) })
    }).then(async res => {
      if (res.ok) { mostrarToast("Cupom criado!", "sucesso"); setNovoCupomCodigo(''); setNovoCupomValor(''); carregarDados(); } 
      else { const data = await res.json(); mostrarToast(data.detail, "erro") }
    })
  }

  const removerCupom = id => { if(window.confirm("Apagar este cupom?")) fetch(`https://borajogar-api.onrender.com/admin/cupons/${id}`, { method: 'DELETE', headers: getAuthHeaders() }).then(res => { if(res.ok) carregarDados(); }) }
  const removerJogo = id => { if(window.confirm("Apagar este jogo?")) fetch(`https://borajogar-api.onrender.com/jogos/${id}`, { method: 'DELETE', headers: getAuthHeaders() }).then(res => { if(res.ok) { carregarDados(); mostrarToast("Jogo removido.", "sucesso"); } }) }
  const removerUsuario = id => { if(window.confirm("Remover cliente?")) fetch(`https://borajogar-api.onrender.com/usuarios/${id}`, { method: 'DELETE', headers: getAuthHeaders() }).then(res => { if(res.ok) { carregarDados(); mostrarToast("Cliente removido.", "sucesso"); } }) }

  const confirmarResetSenha = (contaId) => {
    const senha = novasSenhasTemp[contaId];
    if (!senha) { mostrarToast("Digite a nova senha antes de liberar a conta!", "aviso"); return; }
    fetch('https://borajogar-api.onrender.com/admin/reset-senha', {
      method: 'POST', headers: getAuthHeaders(),
      body: JSON.stringify({ conta_psn_id: contaId, nova_senha: senha })
    }).then(async res => {
      const data = await res.json()
      if (res.ok) { mostrarToast(data.mensagem, "sucesso"); carregarDados(); } else { mostrarToast(data.detail, "erro") }
    })
  }

  const aplicarMultaCliente = (idUsuario, nomeUsuario) => {
    if(!idUsuario) return;
    if(window.confirm(`Deseja aplicar uma multa de R$ 50,00 em ${nomeUsuario} por não desativar o console? O saldo dele ficará negativo e o cashback será cancelado.`)) {
      fetch('https://borajogar-api.onrender.com/admin/multar', {
        method: 'POST', headers: getAuthHeaders(),
        body: JSON.stringify({ utilizador_id: idUsuario, valor: 50.0 })
      }).then(async res => {
        const data = await res.json();
        if (res.ok) { mostrarToast(`Multa aplicada em ${nomeUsuario}.`, "sucesso"); carregarDados(); } else { mostrarToast(data.detail, "erro"); }
      })
    }
  }

  const revogarLocacao = (locacaoId) => {
    if(window.confirm("🚨 ATENÇÃO: Tem certeza que deseja REVOGAR este aluguel imediatamente? A conta irá para a tela de Manutenção para você trocar a senha.")) {
      fetch(`https://borajogar-api.onrender.com/admin/locacoes/${locacaoId}/revogar`, {
        method: 'POST',
        headers: getAuthHeaders()
      }).then(async res => {
        const data = await res.json();
        if (res.ok) {
          mostrarToast(data.mensagem, "sucesso");
          carregarDados();
        } else {
          mostrarToast(data.detail, "erro");
        }
      }).catch(() => mostrarToast("Erro de conexão.", "erro"));
    }
  }

  const cobrarNoWhatsApp = (nome, telefone, jogo) => {
    if(!telefone) return;
    let numeroLimpo = telefone.replace(/\D/g, '');
    if(!numeroLimpo.startsWith('55')) numeroLimpo = '55' + numeroLimpo;
    const mensagem = `Olá, ${nome}! Aqui é da locadora *BORA JOGAR!* 🎮\n\nSeu tempo com o jogo *${jogo}* terminou, mas notamos que a conta ainda está ativada como "Principal" no seu console.\n\n⚠️ Concedemos um *prazo de tolerância de 1 hora* para você entrar na conta e desativar. Caso não seja feito, o sistema aplicará uma multa automática de R$ 50,00 e sua carteira será bloqueada.\n\nComo fazer a desativação:\n\nNo PS5: Vá em Configurações > Usuários e Contas > Outros > Compartilhamento do console e jogo offline e desative.\n\nNo PS4: Vá em Configurações > Gerenciamento da conta > Ativar como seu PS4 principal e desative.\n\nMe avise aqui assim que desativar!`;
    const url = `https://wa.me/${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  }

  const avisarLiberacao = (nomeCliente, jogoNome) => {
    const clienteObj = todosUsuarios.find(u => u.nome === nomeCliente);
    if (!clienteObj || !clienteObj.telefone) {
      mostrarToast("Telefone do cliente não encontrado.", "erro");
      return;
    }
    let numeroLimpo = clienteObj.telefone.replace(/\D/g, '');
    if(!numeroLimpo.startsWith('55')) numeroLimpo = '55' + numeroLimpo;
    const mensagem = `Fala, ${nomeCliente}! A sua vez na fila chegou e o seu acesso para o jogo *${jogoNome}* já está liberado! 🎮\n\nAcesse seu painel na locadora (aba Meus Acessos) para pegar o e-mail, a senha e gerar o código de acesso.\n\nBora Jogar! 🚀`;
    window.open(`https://wa.me/${numeroLimpo}?text=${encodeURIComponent(mensagem)}`, '_blank');
  }

  const lidarComFiltroPlataforma = (plat) => { setFiltroPlataforma(plat); setPaginaAtual(1); }
  const lidarComFiltroDisp = (disp) => { setFiltroDisponibilidade(disp); setPaginaAtual(1); }
  const lidarComBusca = (e) => { setTermoBusca(e.target.value); setPaginaAtual(1); }

  const hojeGlobal = new Date();
  hojeGlobal.setHours(0, 0, 0, 0);

  const filtradosBase = jogos
    .filter(jogo => jogo.titulo.toLowerCase().includes(termoBusca.toLowerCase()))
    .filter(jogo => {
      if (filtroPlataforma === 'TODAS') return true;
      if (filtroPlataforma === 'PS5') return jogo.plataforma === 'PS5' || jogo.plataforma === 'PS4/PS5';
      if (filtroPlataforma === 'PS4/PS5') return jogo.plataforma === 'PS4/PS5';
      return jogo.plataforma === filtroPlataforma;
    })
    .filter(jogo => {
      if (filtroDisponibilidade === 'TODOS') return true;
      if (filtroDisponibilidade === 'DISPONIVEL') {
          const dataLanc = jogo.data_lancamento ? new Date(jogo.data_lancamento + 'T00:00:00') : null;
          const isFuturo = dataLanc && dataLanc > hojeGlobal;
          if (isFuturo) return true; 
          return jogo.estoque > 0;
      }
      return true;
    });

  const jogosFuturos = filtradosBase
    .filter(j => {
        const dataLanc = j.data_lancamento ? new Date(j.data_lancamento + 'T00:00:00') : null;
        return dataLanc && dataLanc > hojeGlobal;
    })
    .sort((a, b) => new Date(a.data_lancamento) - new Date(b.data_lancamento)); 

  const jogosNormais = filtradosBase
    .filter(j => {
        const dataLanc = j.data_lancamento ? new Date(j.data_lancamento + 'T00:00:00') : null;
        return !(dataLanc && dataLanc > hojeGlobal);
    });

  const idsLancamentos = [...jogosNormais]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3)
    .map(j => j.id);

  jogosNormais.sort((a, b) => {
    const aLancamento = idsLancamentos.includes(a.id);
    const bLancamento = idsLancamentos.includes(b.id);

    if (aLancamento && !bLancamento) return -1;
    if (!aLancamento && bLancamento) return 1;

    const aDisponivel = a.estoque > 0;
    const bDisponivel = b.estoque > 0;
    if (aDisponivel && !bDisponivel) return -1;
    if (!aDisponivel && bDisponivel) return 1;
    
    // 🚀 BLINDAGEM: Garante que undefined vire 0 na matemática
    const popA = a.popularidade || 0;
    const popB = b.popularidade || 0;
    
    if (popB !== popA) {
        return popB - popA;
    }
    
    return b.id - a.id;
  });

  const totalPaginas = Math.ceil(jogosNormais.length / JOGOS_POR_PAGINA);
  const indiceUltimoJogo = paginaAtual * JOGOS_POR_PAGINA;
  const indicePrimeiroJogo = indiceUltimoJogo - JOGOS_POR_PAGINA;
  const normaisDaPagina = jogosNormais.slice(indicePrimeiroJogo, indiceUltimoJogo);

  const jogosDaPagina = paginaAtual === 1 
    ? [...jogosFuturos, ...normaisDaPagina] 
    : [...normaisDaPagina];

  const jogosFiltrados = [...jogosFuturos, ...jogosNormais];

  const jogosEstoqueFiltrados = jogos.filter(jogo => jogo.titulo.toLowerCase().includes(buscaEstoque.toLowerCase()))
  const locacoesAtivasFiltradas = todasLocacoes
    .filter(loc => loc.status === 'ATIVA')
    .filter(loc => loc.jogo.toLowerCase().includes(buscaLocacao.toLowerCase()) || loc.cliente.toLowerCase().includes(buscaLocacao.toLowerCase()))
    .sort((a, b) => {
      if (ordenacaoLocacoes === 'expira_breve') return new Date(a.data_fim) - new Date(b.data_fim);
      if (ordenacaoLocacoes === 'expira_longe') return new Date(b.data_fim) - new Date(a.data_fim);
      if (ordenacaoLocacoes === 'az_cliente') return a.cliente.localeCompare(b.cliente);
      if (ordenacaoLocacoes === 'az_jogo') return a.jogo.localeCompare(b.jogo);
      return 0;
    });

  const reservasAdminFiltradas = todasReservas
    .filter(res => res.jogo.toLowerCase().includes(buscaReservaAdmin.toLowerCase()) || res.cliente.toLowerCase().includes(buscaReservaAdmin.toLowerCase()))
    .sort((a, b) => {
        if(ordenacaoReservaAdmin === 'antigas') return new Date(a.data_solicitacao) - new Date(b.data_solicitacao);
        if(ordenacaoReservaAdmin === 'recentes') return new Date(b.data_solicitacao) - new Date(a.data_solicitacao);
        if(ordenacaoReservaAdmin === 'az_cliente') return a.cliente.localeCompare(b.cliente);
        return 0;
    });

  const cancelarReservaAdmin = (reservaId, nomeCliente, tituloJogo) => {
    if(window.confirm(`Tem certeza que deseja CANCELAR a reserva de ${tituloJogo} do cliente ${nomeCliente}? O valor será devolvido à carteira dele.`)) {
      fetch(`https://borajogar-api.onrender.com/admin/reservas/${reservaId}/cancelar`, {
        method: 'POST', headers: getAuthHeaders()
      }).then(async res => {
        const data = await res.json();
        if(res.ok) { mostrarToast(data.mensagem, "sucesso"); carregarDados(); }
        else { mostrarToast(data.detail, "erro"); }
      })
    }
  }

  const contasManutencaoFiltradas = contasManutencao
    .filter(c => c.jogo.toLowerCase().includes(buscaManutencao.toLowerCase()) || (c.ultimo_cliente_nome && c.ultimo_cliente_nome.toLowerCase().includes(buscaManutencao.toLowerCase())))
    .sort((a, b) => {
      if (ordenacaoManutencao === 'urgente') return (b.cashback_pendente || 0) - (a.cashback_pendente || 0);
      if (ordenacaoManutencao === 'az_jogo') return a.jogo.localeCompare(b.jogo);
      return 0;
    });
  
  const clientesFiltrados = todosUsuarios
    .filter(u => u.nome.toLowerCase().includes(buscaCliente.toLowerCase()) || u.email.toLowerCase().includes(buscaCliente.toLowerCase()))
    .filter(u => {
      if (filtroSaldoClientes === 'positivo') return u.saldo > 0;
      if (filtroSaldoClientes === 'negativo') return u.saldo < 0;
      return true;
    })
    .sort((a, b) => {
      if (ordenacaoClientes === 'az') return a.nome.localeCompare(b.nome);
      if (ordenacaoClientes === 'za') return b.nome.localeCompare(a.nome);
      if (ordenacaoClientes === 'recentes') return b.id - a.id;
      if (ordenacaoClientes === 'antigos') return a.id - b.id;
      if (ordenacaoClientes === 'maior_saldo') return b.saldo - a.saldo;
      if (ordenacaoClientes === 'menor_saldo') return a.saldo - b.saldo;
      return 0;
    });

  const alugueisAtivos = meusAlugueis.filter(item => item.status === 'ATIVA');
  const todosAlugueisExpirados = meusAlugueis.filter(item => item.status === 'EXPIRADA');
  
  // 🚀 A MATEMÁTICA REAL (Conta tudo)
  const totalAlugueis = todosAlugueisExpirados.length;
  // 🚀 O VISUAL (Mostra só os 5 últimos no histórico do rodapé)
  const historicoAlugueis = todosAlugueisExpirados.slice(0, 5);

  // 🚀 SISTEMA DE RANKINGS
  const obterRankInfo = (qtd) => {
    if (qtd >= 50) return { nome: 'Super VIP', cor: 'bg-fuchsia-900/40 text-fuchsia-400 border-fuchsia-500/50', icon: '👑' };
    if (qtd >= 30) return { nome: 'VIP', cor: 'bg-rose-900/40 text-rose-400 border-rose-500/50', icon: '💎' };
    if (qtd >= 20) return { nome: 'Especial', cor: 'bg-amber-900/40 text-amber-400 border-amber-500/50', icon: '⭐' };
    if (qtd >= 10) return { nome: 'Veterano', cor: 'bg-purple-900/40 text-purple-400 border-purple-500/50', icon: '🏆' };
    if (qtd >= 1) return { nome: 'Membro', cor: 'bg-blue-900/40 text-blue-400 border-blue-500/50', icon: '🛡️' };
    return { nome: 'Novato', cor: 'bg-zinc-800 text-zinc-500 border-zinc-700', icon: '🌱' };
  };
  const meuRank = obterRankInfo(totalAlugueis);

  const inputClass = "w-full p-3 bg-zinc-900 border border-zinc-700 text-sm font-medium text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder-zinc-500"
  const subtitleCyberClass = "text-[11px] font-mono-tech font-bold text-center mb-10 tracking-[0.2em] uppercase bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent animate-neon-flicker block select-none";
  const navBtnClass = "text-sm font-bold px-4 py-2 rounded-xl transition-all duration-300"
  const adminInputClass = "w-full px-4 py-2.5 text-sm font-medium bg-zinc-950 border border-zinc-800 text-white rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all placeholder-zinc-600"
  const adminCardClass = "bg-zinc-900 p-6 md:p-8 rounded-3xl border border-zinc-800 shadow-2xl flex flex-col"

  const bannerUrls = configSistema.banners_url ? configSistema.banners_url.split(',').map(u => u.trim()).filter(u => u) : [];
  const currentBanner = bannerUrls.length > 0 ? bannerUrls[indiceBanner] : 'https://cinesiageek.com.br/wp-content/uploads/2024/09/playstation5.jpeg';

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-300 font-sans antialiased pb-10 relative overflow-x-hidden">
      
      {toast.visivel && (
        <div className={`fixed top-6 right-6 z-[150] px-5 py-4 rounded-xl shadow-2xl border transition-all duration-300 animate-fade-in flex items-center gap-3 max-w-sm ${
          toast.tipo === 'sucesso' ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100' :
          toast.tipo === 'erro' ? 'bg-rose-950/90 border-rose-500/50 text-rose-100' :
          'bg-amber-950/90 border-amber-500/50 text-amber-100'
        } backdrop-blur-md`}>
          <span className="text-xl">{toast.tipo === 'sucesso' ? '✅' : toast.tipo === 'erro' ? '❌' : '⚠️'}</span>
          <p className="text-sm font-medium leading-relaxed whitespace-pre-line">{toast.mensagem}</p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* NOVO MODAL DE EDIÇÃO DE JOGOS (ADMIN)                                     */}
      {/* ========================================================================= */}
      {modalEdicaoJogo && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-blue-900/20 to-zinc-900 border border-blue-500/30 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl shadow-blue-500/10 overflow-y-auto max-h-[90vh] custom-scrollbar">
            <h3 className="text-xl font-black text-blue-400 mb-6 tracking-tight flex items-center gap-3">
              ✏️ Editar Jogo
            </h3>
            <form onSubmit={salvarEdicaoJogo} className="flex flex-col gap-4">
              
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Título do Jogo</label>
                <input type="text" value={modalEdicaoJogo.titulo} onChange={e => setModalEdicaoJogo({...modalEdicaoJogo, titulo: e.target.value})} className={adminInputClass} required />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Plataforma</label>
                  <select value={modalEdicaoJogo.plataforma} onChange={e => setModalEdicaoJogo({...modalEdicaoJogo, plataforma: e.target.value})} className={adminInputClass}>
                    <option value="PS5">PS5</option>
                    <option value="PS4/PS5">PS4/PS5</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Data Lançamento (Pré-venda)</label>
                  <input type="date" value={modalEdicaoJogo.data_lancamento || ''} onChange={e => setModalEdicaoJogo({...modalEdicaoJogo, data_lancamento: e.target.value})} className={adminInputClass} />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Tempo (Ex: 20h)</label>
                  <input type="text" value={modalEdicaoJogo.tempo_jogo} onChange={e => setModalEdicaoJogo({...modalEdicaoJogo, tempo_jogo: e.target.value})} className={adminInputClass} />
                </div>
                <div className="w-full">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Nota (Ex: 4.8)</label>
                  <input type="number" step="0.1" value={modalEdicaoJogo.nota} onChange={e => setModalEdicaoJogo({...modalEdicaoJogo, nota: e.target.value})} className={adminInputClass} />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full relative">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Preço 7 Dias (R$)</label>
                  <input type="number" step="0.01" value={modalEdicaoJogo.preco_aluguel} onChange={e => setModalEdicaoJogo({...modalEdicaoJogo, preco_aluguel: e.target.value})} className={adminInputClass} required />
                </div>
                <div className="w-full relative">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Preço 14 Dias (R$)</label>
                  <input type="number" step="0.01" value={modalEdicaoJogo.preco_aluguel_14} onChange={e => setModalEdicaoJogo({...modalEdicaoJogo, preco_aluguel_14: e.target.value})} className={adminInputClass} />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">URL da Imagem (Capa)</label>
                <input type="url" value={modalEdicaoJogo.url_imagem} onChange={e => setModalEdicaoJogo({...modalEdicaoJogo, url_imagem: e.target.value})} className={adminInputClass} />
              </div>

              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Descrição do Jogo</label>
                <textarea value={modalEdicaoJogo.descricao} onChange={e => setModalEdicaoJogo({...modalEdicaoJogo, descricao: e.target.value})} className={`${adminInputClass} resize-none h-24`} required />
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t border-zinc-800">
                <button type="button" onClick={() => setModalEdicaoJogo(null)} className="flex-1 py-3 rounded-xl font-bold text-xs bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white uppercase tracking-wide transition-colors">Cancelar</button>
                <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-xs text-white uppercase tracking-wide shadow-lg transition-all bg-blue-600 hover:bg-blue-500 shadow-blue-600/20">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* NOVO MODAL DE EDIÇÃO DE CLIENTES (ADMIN)                                  */}
      {/* ========================================================================= */}
      {modalEdicaoCliente && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-gradient-to-br from-purple-900/20 to-zinc-900 border border-purple-500/30 rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl shadow-purple-500/10 overflow-y-auto max-h-[90vh] custom-scrollbar">
            <h3 className="text-xl font-black text-purple-400 mb-6 tracking-tight flex items-center gap-3">
              ✏️ Editar Cliente
            </h3>
            <form onSubmit={salvarEdicaoCliente} className="flex flex-col gap-4">
              
              <div>
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Nome do Cliente</label>
                <input type="text" value={modalEdicaoCliente.nome} onChange={e => setModalEdicaoCliente({...modalEdicaoCliente, nome: e.target.value})} className={adminInputClass} required />
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">E-mail</label>
                  <input type="email" value={modalEdicaoCliente.email} onChange={e => setModalEdicaoCliente({...modalEdicaoCliente, email: e.target.value})} className={adminInputClass} required />
                </div>
                <div className="w-full">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">WhatsApp</label>
                  <input type="text" value={modalEdicaoCliente.telefone || ''} onChange={e => setModalEdicaoCliente({...modalEdicaoCliente, telefone: e.target.value})} className={adminInputClass} />
                </div>
              </div>

              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-full">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Saldo na Carteira (R$)</label>
                  <input type="number" step="0.01" value={modalEdicaoCliente.saldo} onChange={e => setModalEdicaoCliente({...modalEdicaoCliente, saldo: e.target.value})} className={adminInputClass} required />
                </div>
                
                {/* 🚀 NOVO CAMPO: Motivo do Ajuste */}
                <div className="w-full">
                  <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Motivo (Aparecerá no Extrato)</label>
                  <input type="text" placeholder="Ex: Bônus, Correção..." value={modalEdicaoCliente.motivo_ajuste || ''} onChange={e => setModalEdicaoCliente({...modalEdicaoCliente, motivo_ajuste: e.target.value})} className={adminInputClass} />
                </div>
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t border-zinc-800">
                <button type="button" onClick={() => setModalEdicaoCliente(null)} className="flex-1 py-3 rounded-xl font-bold text-xs bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white uppercase tracking-wide transition-colors">Cancelar</button>
                <button type="submit" className="flex-1 py-3 rounded-xl font-bold text-xs text-white uppercase tracking-wide shadow-lg transition-all bg-purple-600 hover:bg-purple-500 shadow-purple-600/20">Salvar Alterações</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalConfirmacao.visivel && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-xl font-black text-white mb-2 tracking-tight">
              {modalConfirmacao.tipo === 'aluguel' ? '🎮 Confirmar Aluguel' : '⏳ Confirmar Reserva'}
            </h3>
            <p className="text-sm text-zinc-400 mb-6 leading-relaxed">
              Você está prestes a {modalConfirmacao.tipo === 'aluguel' ? 'alugar' : 'reservar'} <strong className="text-white">{modalConfirmacao.jogoTitulo}</strong> por <strong className="text-blue-400">{modalConfirmacao.diasEscolhidos} Dias</strong>.
            </p>

            {(() => {
              const precoAtual = modalConfirmacao.diasEscolhidos === 7 ? modalConfirmacao.preco7 : modalConfirmacao.preco14;
              const temSaldo = usuarioLogado.saldo >= precoAtual;
              
              return (
                <>
                  <div className="bg-zinc-950 rounded-2xl p-5 mb-8 border border-zinc-800 shadow-inner">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Período:</span>
                      <span className="text-sm text-white font-black">{modalConfirmacao.diasEscolhidos} Dias</span>
                    </div>
                    <div className="w-full h-px bg-zinc-800/50 mb-3"></div>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Valor a descontar:</span>
                      <span className="text-sm text-rose-400 font-black">- R$ {precoAtual.toFixed(2)}</span>
                    </div>
                    <div className="w-full h-px bg-zinc-800/50 mb-3"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Saldo após compra:</span>
                      <span className={`text-base font-black ${temSaldo ? 'text-emerald-400' : 'text-rose-500 animate-pulse'}`}>
                        R$ {(usuarioLogado.saldo - precoAtual).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setModalConfirmacao({ visivel: false, tipo: '', jogoId: null, jogoTitulo: '', preco7: 0, preco14: 0, diasEscolhidos: 7 })} className="flex-1 py-3 rounded-xl font-bold text-xs bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white uppercase tracking-wide transition-colors">Cancelar</button>
                    <button onClick={confirmarTransacao} disabled={!temSaldo} className={`flex-1 py-3 rounded-xl font-bold text-xs text-white uppercase tracking-wide shadow-lg transition-all ${!temSaldo ? 'opacity-50 cursor-not-allowed bg-zinc-600' : modalConfirmacao.tipo === 'aluguel' ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20' : 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20'}`}>
                        {temSaldo ? 'Confirmar' : 'Sem Saldo'}
                    </button>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}

      {/* MODAL DE SINOPSE DO JOGO */}
      {modalDescricao && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in" onClick={() => setModalDescricao(null)}>
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative" onClick={e => e.stopPropagation()}>
            <button onClick={() => setModalDescricao(null)} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white transition-colors">✕</button>
            <h3 className="text-xl font-black text-white mb-4 tracking-tight pr-8 leading-tight">{modalDescricao.titulo}</h3>
            <div className="max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
              <p className="text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap font-medium">{modalDescricao.descricao}</p>
            </div>
            <div className="mt-6 pt-4 border-t border-zinc-800">
              <button onClick={() => setModalDescricao(null)} className="w-full py-3.5 rounded-xl font-bold text-xs bg-zinc-800 text-white hover:bg-zinc-700 uppercase tracking-wide transition-colors">Fechar</button>
            </div>
          </div>
        </div>
      )}

      {abaAtual === 'login' && !usuarioLogado && modoLogin && !modoEsqueciSenha ? (
        <div className="flex justify-center items-center min-h-screen p-4 transition-all duration-1000 ease-in-out" style={{ backgroundImage: `url('${currentBanner}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur"></div>
          <div className="relative z-10 bg-zinc-900 p-8 md:p-10 rounded-3xl border border-zinc-800 w-full max-w-md shadow-2xl animate-fade-in">
            <h2 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-8 tracking-tighter">BORA JOGAR!</h2>
            <span className={subtitleCyberClass}>A sua Próxima Aventura Começa Aqui!</span>
            
            <form onSubmit={entrarNoSistema} className="space-y-5 animate-fade-in">
              <input type="email" placeholder="Seu E-mail" value={formEmail} onChange={e => setFormEmail(e.target.value)} className={inputClass} required />
              
              <div className="relative">
                <input type={verSenhaLogin ? "text" : "password"} placeholder="Sua Senha" value={formSenha} onChange={e => setFormSenha(e.target.value)} className={`${inputClass} pr-12`} required />
                <button type="button" onClick={() => setVerSenhaLogin(!verSenhaLogin)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors">
                  {verSenhaLogin ? '🙈' : '👁️'}
                </button>
              </div>
              
              <div className="flex justify-end">
                <button type="button" onClick={() => setModoEsqueciSenha(true)} className="text-[10px] font-bold text-zinc-400 hover:text-blue-400 transition-colors uppercase tracking-wider">
                  Esqueceu a senha?
                </button>
              </div>

              <button type="submit" className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm uppercase tracking-wide rounded-xl transition-all shadow-lg shadow-blue-500/30">Entrar na Loja</button>
              
              <div className="pt-6 text-center border-t border-zinc-800 mt-8">
                <p className="text-sm text-zinc-400 leading-relaxed">Ainda não tem conta? <br/>
                  <button type="button" onClick={() => { setModoLogin(false); setModoEsqueciSenha(false); }} className="mt-3 text-sm font-black text-emerald-400 hover:text-emerald-300 uppercase tracking-wider transition-colors">
                    CRIE UMA CONTA GRÁTIS
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      ) : abaAtual === 'login' && !usuarioLogado && !modoLogin && !modoEsqueciSenha ? (
        <div className="flex justify-center items-center min-h-screen p-4 transition-all duration-1000 ease-in-out" style={{ backgroundImage: `url('${currentBanner}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur"></div>
          <div className="relative z-10 bg-zinc-900 p-8 md:p-10 rounded-3xl border border-zinc-800 w-full max-w-md shadow-2xl animate-fade-in">
            <h2 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-8 tracking-tighter">BORA JOGAR!</h2>
            <span className={subtitleCyberClass}>A sua Próxima Aventura Começa Aqui!</span>
            <form onSubmit={registrarConta} className="space-y-4 animate-fade-in">
              <input type="text" placeholder="Nome Completo" value={cadNome} onChange={e => setCadNome(e.target.value)} className={inputClass} required />
              <input type="email" placeholder="E-mail" value={cadEmail} onChange={e => setCadEmail(e.target.value)} className={inputClass} required />
              <input type="text" placeholder="WhatsApp (DDD+Número)" value={cadTelefone} onChange={e => setCadTelefone(e.target.value)} className={inputClass} required />
              
              <div className="relative">
                <input type={verSenhaCad ? "text" : "password"} placeholder="Crie uma Senha" value={cadSenha} onChange={e => setCadSenha(e.target.value)} className={`${inputClass} pr-12`} required />
                <button type="button" onClick={() => setVerSenhaCad(!verSenhaCad)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors">
                  {verSenhaCad ? '🙈' : '👁️'}
                </button>
              </div>

              <div className="relative">
                <input type={verSenhaCadConf ? "text" : "password"} placeholder="Confirme sua Senha" value={cadSenhaConfirmacao} onChange={e => setCadSenhaConfirmacao(e.target.value)} className={`${inputClass} pr-12`} required />
                <button type="button" onClick={() => setVerSenhaCadConf(!verSenhaCadConf)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors">
                  {verSenhaCadConf ? '🙈' : '👁️'}
                </button>
              </div>

              <input type="text" placeholder="Código de um Amigo (Opcional)" value={cadCodigoConvite} onChange={e => setCadCodigoConvite(e.target.value.toUpperCase())} className={`${inputClass} border-purple-500/50 bg-purple-950/20 text-purple-100 placeholder-purple-400/50 uppercase`} />
              
              <div className="bg-zinc-950/50 border border-zinc-800 p-4 rounded-xl mt-4 shadow-inner">
                <p className="text-[11px] text-zinc-400 leading-relaxed text-center">
                  Ao clicar em "Finalizar Cadastro", você confirma que é maior de idade e declara que leu, compreendeu e concorda integralmente com os nossos{' '}
                  <button type="button" onClick={() => { setAbaAtual('termos'); window.scrollTo(0, 0); }} className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors underline decoration-emerald-500/50 underline-offset-2 hover:decoration-emerald-400">
                    Termos de Uso
                  </button>
                  {' '}e{' '}
                  <button type="button" onClick={() => { setAbaAtual('privacidade'); window.scrollTo(0, 0); }} className="text-emerald-400 font-bold hover:text-emerald-300 transition-colors underline decoration-emerald-500/50 underline-offset-2 hover:decoration-emerald-400">
                    Política de Privacidade
                  </button>.
                </p>
              </div>

              <button type="submit" className="w-full py-4 mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm uppercase tracking-wide rounded-xl transition-all shadow-lg shadow-emerald-500/30">Finalizar Cadastro</button>
              
              <div className="pt-6 text-center border-t border-zinc-800 mt-6">
                  <p className="text-sm text-zinc-400 leading-relaxed">Já possui uma conta? <br/>
                      <button type="button" onClick={() => { setModoLogin(true); setModoEsqueciSenha(false); }} className="mt-3 text-sm font-black text-blue-400 hover:text-blue-300 uppercase tracking-wider transition-colors">
                          Faça Login aqui
                      </button>
                  </p>
              </div>
            </form>
          </div>
        </div>
      ) : abaAtual === 'login' && !usuarioLogado && modoEsqueciSenha ? (
          <div className="flex justify-center items-center min-h-screen p-4 transition-all duration-1000 ease-in-out" style={{ backgroundImage: `url('${currentBanner}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
            <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur"></div>
            <div className="relative z-10 bg-zinc-900 p-8 md:p-10 rounded-3xl border border-zinc-800 w-full max-w-md shadow-2xl animate-fade-in">
              <h2 className="text-3xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-8 tracking-tighter">BORA JOGAR!</h2>
              <span className={subtitleCyberClass}>A sua Próxima Aventura Começa Aqui!</span>
              <form onSubmit={solicitarRecuperacaoSenha} className="space-y-5 animate-fade-in">
                  <p className="text-sm text-zinc-400 text-center mb-6 leading-relaxed">
                    Digite seu e-mail de cadastro. Se ele existir, enviaremos uma senha temporária em instantes.
                  </p>
                  <input type="email" placeholder="Seu E-mail" value={esqueciEmail} onChange={e => setEsqueciEmail(e.target.value)} className={inputClass} required />
                  <button type="submit" className="w-full py-4 bg-amber-600 hover:bg-amber-500 text-white font-bold text-sm uppercase tracking-wide rounded-xl transition-all shadow-lg shadow-amber-500/30">
                    Recuperar Senha
                  </button>
                  <div className="pt-6 text-center border-t border-zinc-800 mt-8">
                    <button type="button" onClick={() => setModoEsqueciSenha(false)} className="text-sm font-bold text-zinc-400 hover:text-white uppercase tracking-wider transition-colors">
                      Voltar para o Login
                    </button>
                  </div>
              </form>
            </div>
          </div>
      ) : (

      <>
        <nav className="bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 fixed top-0 left-0 w-full z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-16">
              
              <div className="flex items-center gap-8">
                <span className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tighter cursor-pointer" onClick={() => setAbaAtual('vitrine')}>BORA JOGAR!</span>
                
                <div className="hidden md:flex space-x-2">
                  <button onClick={() => setAbaAtual('vitrine')} className={`${navBtnClass} ${abaAtual === 'vitrine' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>🎮 Loja</button>
                  <button onClick={() => setAbaAtual('faq')} className={`${navBtnClass} ${abaAtual === 'faq' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>📖 Como Funciona</button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                {!usuarioLogado ? (
                  <button onClick={() => {setAbaAtual('login'); setModoLogin(true); setModoEsqueciSenha(false);}} className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2 rounded-xl transition-colors text-xs font-bold uppercase tracking-wider">Entrar</button>
                ) : (
                  <>
                    <div className="hidden md:flex items-center space-x-2 mr-2 border-r border-zinc-800 pr-4">
                      <button onClick={() => setAbaAtual('dashboard')} className={`${navBtnClass} ${abaAtual === 'dashboard' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>🔑 Meus Acessos</button>
                      
                      {usuarioLogado.is_admin && (
                        <button onClick={() => setAbaAtual('admin')} className={`${navBtnClass} ${abaAtual === 'admin' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>⚙️ Painel Admin</button>
                      )}
                    </div>

                    <div className="hidden md:flex bg-zinc-950 border border-zinc-800 px-4 py-2 rounded-xl items-center gap-3 shadow-inner">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Saldo</span>
                      <span className={`text-sm font-black ${usuarioLogado.saldo < 0 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
                        R$ {(usuarioLogado.saldo || 0).toFixed(2)}
                      </span>
                    </div>
                    
                    {/* 🚀 SINO DE NOTIFICAÇÃO NEON */}
                    <button onClick={() => {setAbaAtual('dashboard'); window.scrollTo(0,0);}} className="hidden md:flex relative items-center justify-center w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-orange-500/50 hover:bg-orange-500/10 transition-all group">
                      <span className={`text-lg transition-all ${notificacoes.length > 0 ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}>🔔</span>
                      {notificacoes.length > 0 && (
                        <span className="absolute -top-1 -right-1 flex h-3 w-3">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500 border border-zinc-900"></span>
                        </span>
                      )}
                    </button>

                    <span className="hidden md:block text-xs text-zinc-400">Olá, <strong className="text-white">{usuarioLogado.nome}</strong></span>
                    <button onClick={sair} className="hidden md:block bg-zinc-800 hover:bg-rose-600 hover:text-white text-zinc-300 px-4 py-2 rounded-xl transition-colors text-xs font-bold uppercase tracking-wider">Sair</button>

                    <button onClick={() => setMenuMobileAberto(!menuMobileAberto)} className="md:hidden text-zinc-300 hover:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {menuMobileAberto ? (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                      </svg>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {menuMobileAberto && usuarioLogado && (
            <div className="md:hidden bg-zinc-900 border-b border-zinc-800 absolute w-full left-0 top-16 shadow-2xl animate-fade-in flex flex-col">
              <div className="flex items-center justify-between p-5 border-b border-zinc-800/50 bg-zinc-950/50">
                <span className="text-sm text-zinc-400">Olá, <strong className="text-white truncate max-w-[120px] inline-block align-bottom">{usuarioLogado.nome}</strong></span>
                <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-3 py-2 rounded-lg shadow-inner">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Saldo</span>
                  <span className={`text-sm font-black ${usuarioLogado.saldo < 0 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
                    R$ {(usuarioLogado.saldo || 0).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex flex-col p-5 gap-3">
                <button onClick={() => { setAbaAtual('vitrine'); setMenuMobileAberto(false); }} className={`p-4 rounded-xl text-left text-sm font-bold uppercase tracking-wider transition-all shadow-md ${abaAtual === 'vitrine' ? 'bg-blue-600 text-white shadow-blue-600/20' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'}`}>🎮 Loja</button>
                <button onClick={() => { setAbaAtual('dashboard'); setMenuMobileAberto(false); }} className={`p-4 rounded-xl text-left text-sm font-bold uppercase tracking-wider transition-all shadow-md ${abaAtual === 'dashboard' ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'}`}>🔑 Meus Acessos</button>
                <button onClick={() => { setAbaAtual('faq'); setMenuMobileAberto(false); }} className={`p-4 rounded-xl text-left text-sm font-bold uppercase tracking-wider transition-all shadow-md ${abaAtual === 'faq' ? 'bg-purple-600 text-white shadow-purple-600/20' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'}`}>📖 Como Funciona</button>
                
                {usuarioLogado.is_admin && (
                  <button onClick={() => { setAbaAtual('admin'); setMenuMobileAberto(false); }} className={`p-4 rounded-xl text-left text-sm font-bold uppercase tracking-wider transition-all shadow-md ${abaAtual === 'admin' ? 'bg-rose-600 text-white shadow-rose-600/20' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'}`}>⚙️ Painel Admin</button>
                )}
                
                <button onClick={() => { sair(); setMenuMobileAberto(false); }} className="p-4 mt-4 rounded-xl text-center text-sm font-bold uppercase tracking-wider transition-all bg-rose-900/30 text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white shadow-lg">Sair da Conta</button>
              </div>
            </div>
          )}
        </nav>

        <main className="max-w-7xl mx-auto px-4 pb-12 pt-24 md:px-8 md:pt-28">

          {abaAtual === 'vitrine' && (
            <div className="animate-fade-in">
              <div className="relative rounded-3xl p-8 md:p-14 mb-10 border border-zinc-800 overflow-hidden shadow-2xl flex items-center min-h-[360px] transition-all duration-700" style={{ backgroundImage: `url('${currentBanner}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-zinc-950/40 to-transparent"></div>
                <div className="relative z-10 w-full">
                  <span className="inline-block py-1.5 px-4 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-[10px] font-mono-tech font-bold tracking-widest mb-6 uppercase shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                    CATÁLOGO ATUALIZADO
                  </span>
                  
                  {/* 🚀 TÍTULO DA VITRINE COMPACTADO E COM NOVA QUEBRA DE LINHA */}
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-mono-tech font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-6 tracking-tighter leading-tight max-w-2xl animate-neon-flicker uppercase">
                    A sua Próxima <br /> Aventura Começa Aqui!
                  </h1>
                  
                  <p className="text-sm md:text-base text-zinc-300 max-w-xl mb-8 leading-relaxed font-medium">
                    Alugue os maiores lançamentos e os melhores exclusivos. Receba seu acesso instantaneamente e comece a jogar sem sair de casa.
                  </p>
                  
                  <div className="relative max-w-xl group">
                    <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none"><span className="text-xl opacity-70">🎮</span></div>
                    <input type="text" placeholder="Qual jogo você quer jogar hoje?" value={termoBusca} onChange={lidarComBusca} className="w-full py-4 pl-16 pr-6 bg-zinc-900/60 backdrop-blur-xl border border-zinc-700/50 rounded-2xl text-sm font-medium text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-xl" />
                  </div>

                  <div className="flex flex-wrap gap-4 mt-6 max-w-xl">
                    <div className="flex bg-zinc-900/80 rounded-xl p-1.5 backdrop-blur-md border border-zinc-700/50 shadow-lg overflow-x-auto scrollbar-hide">
                      <button onClick={() => lidarComFiltroPlataforma('TODAS')} className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all whitespace-nowrap ${filtroPlataforma === 'TODAS' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>Todas</button>
                      <button onClick={() => lidarComFiltroPlataforma('PS5')} className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all whitespace-nowrap ${filtroPlataforma === 'PS5' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>PS5</button>
                      <button onClick={() => lidarComFiltroPlataforma('PS4/PS5')} className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all whitespace-nowrap ${filtroPlataforma === 'PS4/PS5' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>PS4/PS5</button>
                    </div>
                    
                    <div className="flex bg-zinc-900/80 rounded-xl p-1.5 backdrop-blur-md border border-zinc-700/50 shadow-lg">
                      <button onClick={() => lidarComFiltroDisp('TODOS')} className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all ${filtroDisponibilidade === 'TODOS' ? 'bg-emerald-600 text-white shadow' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>Status: Todos</button>
                      <button onClick={() => lidarComFiltroDisp('DISPONIVEL')} className={`px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all ${filtroDisponibilidade === 'DISPONIVEL' ? 'bg-emerald-600 text-white shadow' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>Só Disponíveis</button>
                    </div>
                  </div>
                </div>

                {bannerUrls.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
                    {bannerUrls.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setIndiceBanner(idx)}
                        className={`h-2 rounded-full transition-all duration-300 ${idx === indiceBanner ? 'bg-blue-500 w-6' : 'bg-white/30 hover:bg-white/60 w-2'}`}
                        aria-label={`Banner ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>

              {configSistema.anuncio_ativo && configSistema.mensagem_anuncio && (
                <div className="w-full p-1 rounded-3xl mb-10 animate-pulse-slow shadow-2xl relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500">
                  <div className="bg-zinc-950 p-6 md:p-8 rounded-[22px] flex items-center justify-center gap-4 text-center">
                    <span className="text-3xl hidden md:block">📣</span>
                    <h2 className="text-base md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 tracking-tight uppercase leading-snug">
                      {configSistema.mensagem_anuncio}
                    </h2>
                    <span className="text-3xl hidden md:block">🔥</span>
                  </div>
                </div>
              )}

              {enqueteOpcoes.length > 0 && (
                <div className="mb-12 bg-zinc-900/50 border border-zinc-800 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden animate-fade-in">
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-fuchsia-500 to-blue-500"></div>
                  <h3 className="text-xl md:text-2xl font-black text-white mb-2 tracking-tight">QUAL JOGO VOCÊ QUER JOGAR NO FUTURO?</h3>
                  <p className="text-sm text-zinc-400 mb-6 leading-relaxed">Clique em uma das opções e ajude o BORA JOGAR! escolher quais jogos devem entrar no catálogo no futuro!</p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                    {enqueteOpcoes.map(opcao => {
                      const isSelected = meuVoto === opcao.id;
                      return (
                        <div key={opcao.id} onClick={() => votarEnquete(opcao.id)} className={`relative h-40 md:h-48 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 group ${isSelected ? 'border-2 border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.5)] scale-105 z-10' : 'border-2 border-transparent hover:border-zinc-600 opacity-80 hover:opacity-100'}`}>
                          <img src={opcao.url_imagem} alt={opcao.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3">
                            <span className="text-white font-black text-xs md:text-sm tracking-tight leading-tight drop-shadow-md">{opcao.titulo}</span>
                          </div>
                          
                          {/* Checkmark Neon */}
                          {isSelected && (
                            <div className="absolute top-2 right-2 bg-fuchsia-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-lg border border-white/20">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                            </div>
                          )}

                          {/* Contador Admin */}
                          {usuarioLogado?.is_admin && (
                            <div className="absolute top-2 left-2 bg-black/80 backdrop-blur-md text-fuchsia-400 font-black text-[10px] px-2 py-1 rounded-lg border border-zinc-700">
                              {opcao.total_votos} votos
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              <div className="mb-6 text-xs font-bold text-zinc-500 uppercase tracking-wider">
                Mostrando <span className="text-white">{jogosFiltrados.length}</span> jogo(s) encontrado(s)
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {jogosDaPagina.map(jogo => {
                  const isLancamento = idsLancamentos.includes(jogo.id);
                  
                  const hoje = new Date();
                  hoje.setHours(0, 0, 0, 0); 
                  const dataLanc = jogo.data_lancamento ? new Date(jogo.data_lancamento + 'T00:00:00') : null;
                  const isEmBreve = dataLanc && dataLanc > hoje;
                  const dataFormatada = dataLanc ? dataLanc.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }) : '';
                  const tituloLimpo = jogo.titulo; 
                  
                  // 🚀 NOVA LÓGICA DE HIERARQUIA (NÍVEL 1)
                  const ehJogoVIP = isLancamento || isEmBreve;
                  const isVeterano = usuarioLogado ? (usuarioLogado.is_admin || totalAlugueis >= 1) : false;
                  const bloqueadoParaUsuario = ehJogoVIP && usuarioLogado && !isVeterano;

                  // 🚀 VERIFICA SE O USUÁRIO JÁ RESERVOU ESTE JOGO
                  const minhaReservaAtiva = minhasReservas.find(res => res.jogo === tituloLimpo);
                  
                  // 🚀 MATEMÁTICA DE DATAS PÚBLICAS BLINDADA
                  let dataVagaGlobal = isEmBreve ? new Date(dataLanc) : new Date();
                  
                  if (jogo.proxima_devolucao) {
                      const pd = new Date(jogo.proxima_devolucao);
                      if (pd > dataVagaGlobal) dataVagaGlobal = pd;
                  }

                  // Usa matemática de milissegundos para evitar o bug de 'Invalid Date' ao virar o mês
                  const diasFilaEsperaMs = (jogo.fila_dias_espera || 0) * 24 * 60 * 60 * 1000;
                  const dataFinalExata = new Date(dataVagaGlobal.getTime() + diasFilaEsperaMs);
                  
                  const dataVagaGlobalStr = dataFinalExata.toLocaleDateString('pt-BR');
                  
                  return (
                  <div key={jogo.id} className={`bg-zinc-900 rounded-3xl border ${bloqueadoParaUsuario ? 'border-zinc-800/50 opacity-90 grayscale-[20%]' : 'border-zinc-800'} flex flex-col shadow-xl hover:-translate-y-2 hover:border-blue-500/50 transition-all duration-300 group overflow-hidden`}>
                    <div className="h-56 w-full bg-zinc-800 relative overflow-hidden">
                      {jogo.url_imagem ? <img src={jogo.url_imagem} alt={tituloLimpo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" /> : <div className="w-full h-full flex items-center justify-center bg-zinc-800/80"><span className="text-5xl opacity-50">🎮</span></div>}
                      
                      {/* ETIQUETAS EM COLUNA (flex-col) */}
                      <div className="absolute top-4 left-4 right-4 flex justify-between items-start pointer-events-none">
                        <div className="flex flex-col gap-2 items-start">
                          <span className="bg-zinc-950/80 backdrop-blur-md text-white border border-zinc-700/50 text-[10px] uppercase tracking-wider font-bold px-3 py-1.5 rounded-lg shadow-lg">
                            {jogo.plataforma}
                          </span>
                          {jogo.nota > 0 && (
                            <span className="bg-zinc-950/80 backdrop-blur-md text-amber-400 border border-zinc-700/50 text-[10px] uppercase font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
                              ⭐ {jogo.nota}
                            </span>
                          )}
                          {jogo.tempo_jogo && jogo.tempo_jogo !== '0h' && (
                            <span className="bg-zinc-950/80 backdrop-blur-md text-zinc-300 border border-zinc-700/50 text-[10px] uppercase font-bold px-3 py-1.5 rounded-lg shadow-lg flex items-center gap-1">
                              ⏱️ ~{jogo.tempo_jogo}
                            </span>
                          )}
                        </div>
                        
                        <div className="flex flex-col items-end">
                          {jogo.estoque > 0 && !isEmBreve ? (
                            <span className="bg-emerald-500/90 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-black px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg border border-emerald-400/50 [text-shadow:1px_1px_0px_black,-1px_-1px_0px_black,1px_-1px_0px_black,-1px_1px_0px_black]"><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>DISPONÍVEL</span>
                          ) : isEmBreve ? (
                            <span className="bg-purple-600/90 backdrop-blur-md text-white text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded-lg shadow-lg border border-purple-500/50 [text-shadow:1px_1px_0px_black,-1px_-1px_0px_black,1px_-1px_0px_black,-1px_1px_0px_black]">LANÇAMENTO {dataFormatada && `(${dataFormatada})`}</span>
                          ) : (
                            <span className="bg-rose-600/90 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-black px-3 py-1.5 rounded-lg shadow-lg border border-rose-500/50 [text-shadow:1px_1px_0px_black,-1px_-1px_0px_black,1px_-1px_0px_black,-1px_1px_0px_black]">ALUGADO</span>
                          )}
                        </div>
                      </div>

                      {isLancamento && !isEmBreve && (
                        <div className="absolute bottom-4 left-4 z-20">
                          <span className="bg-fuchsia-600/90 text-white text-[10px] font-black px-3 py-1.5 rounded-xl border border-fuchsia-400 shadow-[0_0_15px_rgba(192,38,211,0.8)] flex items-center gap-1.5 tracking-widest uppercase backdrop-blur-md">
                            <span className="animate-pulse">🔥</span> Lançamento
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-black text-white mb-2 tracking-tight group-hover:text-blue-400 transition-colors leading-tight">{tituloLimpo}</h3>
                      <div className="mb-6">
                        <p className="text-xs text-zinc-400 line-clamp-4 leading-relaxed font-medium" title={jogo.descricao}>{jogo.descricao}</p>
                        <button 
                          onClick={() => setModalDescricao(jogo)} 
                          className="text-[10px] text-blue-400 hover:text-blue-300 font-bold uppercase tracking-wider mt-2 flex items-center gap-1 transition-colors"
                        >
                          Ler sinopse completa <span className="text-lg leading-none">›</span>
                        </button>
                      </div>
                      
                      <div className="mt-auto">
                        {(jogo.estoque === 0 || isEmBreve) && (
                          <div className="bg-zinc-950 rounded-xl p-4 mb-4 border border-zinc-800/80 shadow-inner">
                            <div className="flex justify-between items-center mb-2">
                              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">👥 Fila de espera:</span>
                              <span className="text-xs font-black text-amber-400">{jogo.tamanho_fila || 0} pessoa(s)</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">⏳ Próxima Vaga em:</span>
                              <span className="text-xs font-black text-blue-400">
                                {dataVagaGlobalStr}
                              </span>
                            </div>
                          </div>
                        )}

                        {/* 🚀 LÓGICA DE EXIBIÇÃO: RESERVADO vs BOTÕES DE COMPRA */}
                        <div className="flex gap-3 w-full mt-3">
                          {minhaReservaAtiva ? (
                            <div className="flex-1 transition-all rounded-xl p-3 flex flex-col items-center justify-center border bg-emerald-950/40 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.15)] group relative overflow-hidden h-[76px]">
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                                <span className="text-[10px] uppercase tracking-widest font-bold text-emerald-500 mb-1 flex items-center gap-1">
                                    ✅ Já Reservado
                                </span>
                                <strong className="text-sm font-black text-white tracking-tight text-center">
                                    Sua vez em: <span className="text-emerald-400">{minhaReservaAtiva.data_estimada_str}</span>
                                </strong>
                            </div>
                          ) : bloqueadoParaUsuario ? (
                            <button
                              onClick={() => mostrarToast("🚨 Acesso Restrito! Este lançamento é exclusivo para clientes com Rank Membro ou superior. Complete pelo menos 1 aluguel para desbloquear.", "aviso")}
                              className="flex-1 transition-all rounded-xl p-3 flex flex-col items-center justify-center border bg-zinc-950/80 border-rose-500/20 shadow-inner hover:bg-rose-950/30 group/lock h-[76px]"
                            >
                              <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-500 mb-1 group-hover/lock:text-rose-400 transition-colors">Acesso Restrito</span>
                              <strong className="text-sm font-black text-rose-500 tracking-tight flex items-center gap-2 uppercase">
                                🔒 Requer Rank
                              </strong>
                            </button>
                          ) : (
                            <>
                              {/* Botão 7 Dias */}
                              <button
                                onClick={() => abrirConfirmacao(jogo.estoque > 0 && !isEmBreve ? 'aluguel' : 'reserva', jogo.id, tituloLimpo, jogo.preco_aluguel, jogo.preco_aluguel_14 || 0, 7)}
                                className={`flex-1 transition-all rounded-xl p-2.5 flex flex-col items-center justify-center group border h-[76px] ${
                                    jogo.estoque > 0 && !isEmBreve 
                                    ? 'bg-blue-600/90 hover:bg-blue-500 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)]' 
                                    : 'bg-amber-500/90 hover:bg-amber-400 border-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]' 
                                }`}
                              >
                                <span className="text-[10px] uppercase tracking-wider font-black text-white/90 group-hover:text-white transition-colors [text-shadow:1px_1px_0px_black,-1px_-1px_0px_black,1px_-1px_0px_black,-1px_1px_0px_black]">
                                    {jogo.estoque > 0 && !isEmBreve ? 'Alugar' : 'Reservar'} 7 Dias
                                </span>
                                <strong className="text-lg mt-0.5 font-black text-white tracking-tight [text-shadow:1px_1px_0px_black,-1px_-1px_0px_black,1px_-1px_0px_black,-1px_1px_0px_black]">
                                    R$ {jogo.preco_aluguel.toFixed(2)}
                                </strong>
                              </button>

                              {/* Botão 14 Dias */}
                              {jogo.preco_aluguel_14 > 0 && (
                                <button
                                  onClick={() => abrirConfirmacao(jogo.estoque > 0 && !isEmBreve ? 'aluguel' : 'reserva', jogo.id, tituloLimpo, jogo.preco_aluguel, jogo.preco_aluguel_14, 14)}
                                  className={`flex-1 transition-all rounded-xl p-2.5 flex flex-col items-center justify-center group relative border h-[76px] ${
                                      jogo.estoque > 0 && !isEmBreve 
                                      ? 'bg-cyan-600/90 hover:bg-cyan-500 border-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.4)]'
                                      : 'bg-orange-500/80 hover:bg-orange-400 border-orange-400 shadow-[0_0_15px_rgba(249,115,22,0.4)]'
                                  }`}
                                >
                                  <span className={`absolute -top-3 right-2 text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider shadow-lg border bg-zinc-950 z-10 ${jogo.estoque > 0 && !isEmBreve ? 'text-cyan-400 border-cyan-500/50' : 'text-orange-400 border-orange-500/50'}`}>
                                    PROMO
                                  </span>
                                  <span className="text-[10px] uppercase tracking-wider font-black text-white/90 group-hover:text-white transition-colors [text-shadow:1px_1px_0px_black,-1px_-1px_0px_black,1px_-1px_0px_black,-1px_1px_0px_black]">
                                    {jogo.estoque > 0 && !isEmBreve ? 'Alugar' : 'Reservar'} 14 D
                                  </span>
                                  <strong className="text-lg mt-0.5 font-black text-white tracking-tight [text-shadow:1px_1px_0px_black,-1px_-1px_0px_black,1px_-1px_0px_black,-1px_1px_0px_black]">
                                    R$ {jogo.preco_aluguel_14.toFixed(2)}
                                  </strong>
                                </button>
                              )}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>

              {totalPaginas > 1 && (
                <div className="flex justify-center items-center gap-3 mt-16">
                  <button onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))} disabled={paginaAtual === 1} className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xs uppercase tracking-wider">Anterior</button>
                  {[...Array(totalPaginas)].map((_, index) => {
                    const numeroDaPagina = index + 1;
                    return (
                      <button key={numeroDaPagina} onClick={() => setPaginaAtual(numeroDaPagina)} className={`w-10 h-10 rounded-xl font-black text-sm transition-all ${paginaAtual === numeroDaPagina ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-500' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>{numeroDaPagina}</button>
                    );
                  })}
                  <button onClick={() => setPaginaAtual(prev => Math.min(prev + 1, totalPaginas))} disabled={paginaAtual === totalPaginas} className="px-4 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-xs uppercase tracking-wider">Próximo</button>
                </div>
              )}
            </div>
          )}

          {abaAtual === 'dashboard' && (
            <div className="animate-fade-in max-w-5xl mx-auto space-y-8">
              
              {/* 🚀 CABEÇALHO DO PERFIL CYBERPUNK */}
              <div className="bg-gradient-to-r from-purple-900/20 via-zinc-900 to-zinc-900 border border-purple-500/30 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 shadow-2xl relative overflow-hidden">
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-purple-600/10 blur-3xl rounded-full pointer-events-none"></div>
                
                {/* Avatar Automático DiceBear */}
                <div className="relative">
                  <div className="w-24 h-24 rounded-2xl bg-zinc-950 border-2 border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)] p-1 overflow-hidden flex items-center justify-center">
                    <img src={`https://api.dicebear.com/7.x/bottts/svg?seed=${usuarioLogado.nome}&colors=purple,green,orange`} alt="Avatar" className="w-full h-full object-cover" />
                  </div>
                  {historicoAlugueis.length > 0 && (
                    <div className="absolute -bottom-3 -right-3 bg-zinc-950 rounded-full p-1">
                      <div className="bg-emerald-500 w-6 h-6 rounded-full flex items-center justify-center shadow-[0_0_10px_rgba(16,185,129,0.5)] border border-emerald-300">
                        <span className="text-[10px]">✨</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left z-10">
                  <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none mb-2">{usuarioLogado.nome}</h2>
                  <p className="text-sm font-mono-tech text-zinc-400 mb-4">{usuarioLogado.email}</p>
                  
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                    <span className="bg-zinc-950 border border-zinc-800 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5">
                      🎮 {totalAlugueis} Locações
                    </span>
                    <span className={`${meuRank.cor} px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,255,255,0.05)]`}>
                      {meuRank.icon} Rank: {meuRank.nome}
                    </span>
                  </div>
                </div>
              </div>

              {/* 🚀 ALERTAS DE ALTERAÇÃO DE FILA REAIS */}
              {notificacoes.map(notif => (
                <div key={notif.id} className="bg-orange-950/30 border border-orange-500/40 rounded-3xl p-6 md:p-8 shadow-[0_0_20px_rgba(249,115,22,0.1)] flex flex-col gap-4 animate-fade-in relative overflow-hidden mb-4">
                  <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                  <div className="flex items-start gap-4">
                    <span className="text-3xl animate-bounce">⚠️</span>
                    <div>
                      <h3 className="text-orange-400 font-black text-lg tracking-tight uppercase mb-1">Atualização na sua Reserva</h3>
                      <p className="text-sm text-zinc-300 leading-relaxed font-medium">
                        {notif.mensagem}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 mt-2 pl-0 sm:pl-12">
                    <button onClick={() => manterReserva(notif.id)} className="flex-1 bg-orange-600 hover:bg-orange-500 text-white font-bold uppercase tracking-wider py-3 px-6 rounded-xl text-xs transition-colors shadow-lg shadow-orange-600/20">
                      👍 Entendi, manter reserva
                    </button>
                    <button onClick={() => cancelarReservaComEstorno(notif.reserva_id, notif.id)} className="flex-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-bold uppercase tracking-wider py-3 px-6 rounded-xl border border-zinc-700 text-xs transition-colors">
                      💸 Cancelar e Estornar Crédito
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <section className="bg-gradient-to-br from-cyan-900/20 to-zinc-900 p-6 md:p-8 rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/10 flex flex-col h-auto lg:h-[540px] relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute -right-8 -top-8 text-9xl opacity-5 pointer-events-none">💸</div>
                  <h3 className="text-lg font-black text-cyan-400 mb-2 tracking-tight flex items-center gap-2">💰 Adicionar Saldo via PIX</h3>
                  <p className="text-xs text-zinc-400 mb-4 leading-relaxed">Recarregue sua carteira instantaneamente para alugar jogos sem filas.</p>
                  
                  {pixPendente ? (
                    <div className="flex flex-col items-center justify-center animate-fade-in z-10 bg-zinc-950 p-6 rounded-2xl border border-cyan-500/30 shadow-inner mt-auto mb-auto">
                        <img src={`data:image/png;base64,${pixPendente.qr_code}`} alt="QR Code PIX" className="w-40 h-40 rounded-xl border border-zinc-800 p-2 mb-4 bg-white shadow-lg" />
                        <p className="text-[11px] font-medium text-zinc-400 mb-4 text-center leading-relaxed">Escaneie o QR Code ou copie o código abaixo. <strong className="text-cyan-400 block mt-1 text-xs font-bold animate-pulse">Aguardando pagamento...</strong></p>
                        
                        <div className="flex gap-2 w-full">
                            <button onClick={() => { navigator.clipboard.writeText(pixPendente.copia_cola); mostrarToast("PIX Copiado!", "sucesso"); }} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-xl text-[10px] uppercase tracking-wide transition-colors border border-zinc-700">
                                📋 Copiar Código
                            </button>
                            <button onClick={() => setPixPendente(null)} className="bg-rose-900/30 hover:bg-rose-900/80 text-rose-400 font-bold px-4 rounded-xl text-[10px] uppercase tracking-wide transition-colors border border-rose-500/30">
                                Cancelar
                            </button>
                        </div>
                    </div>
                  ) : (
                    <form onSubmit={solicitarGeracaoPix} className="flex flex-col gap-3 mt-auto relative z-10">
                      <div>
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 block">Valor da Recarga (R$)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-black text-base">R$</span>
                          <input type="number" min="15" step="1" value={valorRecarga} onChange={e => setValorRecarga(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-zinc-950 border border-zinc-800 text-white rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none font-black text-base transition-all" required />
                        </div>
                      </div>
                      
                      <div>
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 block">Seu CPF (Exigência do Banco Central)</label>
                        <input type="text" placeholder="Apenas números..." value={cpfRecarga} onChange={e => setCpfRecarga(e.target.value)} maxLength="14" className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 text-white font-bold rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none text-sm placeholder-zinc-600 transition-all" required />
                      </div>

                      <div>
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-1.5 block">Cupom Promocional</label>
                        <input type="text" placeholder="Ex: BORA20" value={cupomRecarga} onChange={e => setCupomRecarga(e.target.value.toUpperCase())} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-800 text-white font-bold rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none uppercase placeholder:normal-case placeholder-zinc-600 text-sm transition-all" />
                      </div>
  
                      <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black uppercase tracking-wider py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-cyan-600/20 mt-1 flex items-center justify-center gap-2 text-xs">
                        <span>Gerar PIX</span> <span className="text-base">⚡</span>
                      </button>

                      <div className="mt-3 pt-3 border-t border-zinc-800/50 flex flex-col items-center gap-1 opacity-80">
                        <div className="flex items-center gap-2 text-zinc-400 text-[9px] uppercase tracking-widest font-bold">
                          <span>🔒 Pagamento 100% Seguro</span>
                          <span className="text-zinc-700">•</span>
                          <span>🪙 PIX</span>
                        </div>
                        <div className="text-[9px] text-zinc-500 flex items-center gap-1 font-medium text-center">
                          Processado por <strong className="text-white">Asaas Instituição de Pagamento</strong>
                        </div>
                      </div>
                    </form>
                  )}
                </section>

                <section className="bg-gradient-to-br from-zinc-800/20 to-zinc-900 p-8 rounded-3xl border border-zinc-700/30 shadow-2xl flex flex-col h-[400px] lg:h-[540px] hover:-translate-y-1 transition-transform duration-300">
                  <h3 className="text-lg font-black text-white tracking-tight mb-8 flex items-center gap-2">🧾 Extrato da Conta</h3>
                  {extrato.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-500"><span className="text-5xl mb-4 opacity-30">💳</span><p className="text-xs font-medium">Nenhuma transação encontrada.</p></div>
                  ) : (
                    <div className="space-y-4 overflow-y-auto pr-3 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent flex-1">
                      {extrato.map((t, i) => (
                        <div key={i} className="flex justify-between items-center bg-zinc-950/50 p-5 rounded-2xl border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                          <div className="min-w-0 pr-4">
                            <p className="text-xs md:text-sm font-bold text-zinc-200 truncate" title={t.descricao}>{t.descricao}</p>
                            <p className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 mt-1">{new Date(t.data_transacao).toLocaleString()}</p>
                          </div>
                          <span className={`text-base md:text-lg font-black tracking-tight shrink-0 ${t.tipo === 'ENTRADA' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {t.tipo === 'ENTRADA' ? '+' : '-'} R$ {parseFloat(t.valor).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>

              <details className="group bg-gradient-to-r from-rose-900/20 to-zinc-900 rounded-3xl border border-rose-500/30 shadow-2xl shadow-rose-500/10 [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer text-white font-bold select-none relative hover:bg-rose-900/10 transition-colors">
                  <span className="flex items-center gap-3 text-lg font-black text-rose-400 tracking-tight relative z-10">🔐 Segurança da Conta</span>
                  <span className="transition duration-300 group-open:-rotate-180 text-rose-500 relative z-10 text-lg">▼</span>
                  <div className="absolute -right-8 -top-8 text-9xl opacity-5 pointer-events-none transition-transform duration-500 group-open:scale-110">🔐</div>
                </summary>
                
                <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-rose-500/20 pt-8 relative z-10 animate-fade-in">
                  <p className="text-xs text-zinc-400 mb-8 max-w-2xl leading-relaxed">
                    Mantenha sua conta segura alterando sua senha regularmente ou troque a senha temporária que enviamos por e-mail.
                  </p>
                  <form onSubmit={alterarMinhaSenha} className="flex flex-col gap-5 items-end max-w-4xl">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 w-full">
                      <div className="w-full relative">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 block">Senha Atual (Provisória)</label>
                        <div className="relative">
                          <input type={verSenhaAtual ? "text" : "password"} placeholder="Sua senha atual" value={mudarSenhaAtual} onChange={e => setMudarSenhaAtual(e.target.value)} className={`${adminInputClass} pr-12`} required />
                          <button type="button" onClick={() => setVerSenhaAtual(!verSenhaAtual)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors">{verSenhaAtual ? '🙈' : '👁️'}</button>
                        </div>
                      </div>
                      <div className="w-full relative">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 block">Nova Senha</label>
                        <div className="relative">
                          <input type={verSenhaNova ? "text" : "password"} placeholder="Sua nova senha" value={mudarSenhaNova} onChange={e => setMudarSenhaNova(e.target.value)} className={`${adminInputClass} pr-12`} required />
                          <button type="button" onClick={() => setVerSenhaNova(!verSenhaNova)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors">{verSenhaNova ? '🙈' : '👁️'}</button>
                        </div>
                      </div>
                      <div className="w-full relative">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider mb-2 block">Confirme a Nova Senha</label>
                        <div className="relative">
                          <input type={verSenhaNovaConf ? "text" : "password"} placeholder="Confirme a senha" value={mudarSenhaNovaConfirmacao} onChange={e => setMudarSenhaNovaConfirmacao(e.target.value)} className={`${adminInputClass} pr-12`} required />
                          <button type="button" onClick={() => setVerSenhaNovaConf(!verSenhaNovaConf)} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-colors">{verSenhaNovaConf ? '🙈' : '👁️'}</button>
                        </div>
                      </div>
                    </div>
                    <button type="submit" className="w-full sm:w-auto bg-rose-600 hover:bg-rose-500 text-white font-bold uppercase tracking-wider px-8 py-3.5 rounded-2xl transition-colors border border-rose-500/50 shadow-lg shadow-rose-600/20 whitespace-nowrap text-xs mt-2">
                      Atualizar Senha
                    </button>
                  </form>
                </div>
              </details>

              {usuarioLogado && usuarioLogado.codigo_indicacao && (
                <details className="group bg-gradient-to-r from-purple-900/30 to-blue-900/20 rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-500/10 [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                  <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer select-none relative hover:bg-purple-900/10 transition-colors">
                    <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 tracking-tight relative z-10">🎁 Indique um Amigo e Ganhe Bônus!</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-purple-400 relative z-10 text-lg">▼</span>
                    <div className="absolute -right-10 -top-10 text-9xl opacity-5 transition-transform duration-700 group-open:scale-110 pointer-events-none">🎁</div>
                  </summary>
                  
                  <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-purple-500/20 pt-8 animate-fade-in relative z-10">
                    <p className="text-xs text-zinc-300 mb-8 max-w-3xl leading-relaxed">
                      Mande o seu código para um amigo. Quando ele criar uma conta nova e fizer a <strong className="text-emerald-400">primeira recarga</strong>, nós daremos <strong>10% do valor</strong> da recarga dele de presente para você gastar em jogos!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-5 items-center">
                      <div className="bg-zinc-950 border border-zinc-800 px-8 py-3.5 rounded-2xl flex items-center gap-5 w-full sm:w-auto justify-center shadow-inner">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Seu Código:</span>
                        <span className="text-2xl font-black text-white tracking-widest select-all">{usuarioLogado.codigo_indicacao}</span>
                      </div>
                      <button onClick={() => { navigator.clipboard.writeText(usuarioLogado.codigo_indicacao); mostrarToast("Código copiado! Envie para seus amigos.", "sucesso"); }} className="bg-purple-600 hover:bg-purple-500 text-white font-bold uppercase tracking-wider px-8 py-4 rounded-2xl text-xs transition-colors shadow-lg shadow-purple-600/20 w-full sm:w-auto">
                        📋 Copiar Código
                      </button>
                    </div>
                  </div>
                </details>
              )}

              <details className="group bg-gradient-to-r from-emerald-900/20 to-zinc-900 rounded-3xl border border-emerald-500/30 border-l-4 border-l-emerald-500 shadow-2xl shadow-emerald-500/10 [&_summary::-webkit-details-marker]:hidden overflow-hidden" open>
                <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer select-none hover:bg-emerald-900/10 transition-colors">
                  <span className="flex items-center gap-3 text-lg font-black text-emerald-400 tracking-tight">🔑 Chaves de Acesso Ativas</span>
                  <span className="transition duration-300 group-open:-rotate-180 text-emerald-500 text-lg">▼</span>
                </summary>
                
                <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-emerald-500/20 pt-8 animate-fade-in">
                  {alugueisAtivos.length > 0 && (
                    <div className="mb-8 bg-rose-950/40 border border-rose-500/50 rounded-2xl p-5 flex items-start gap-4 shadow-inner">
                      <span className="text-2xl animate-pulse">🚨</span>
                      <div>
                        <h4 className="text-rose-400 font-bold text-xs uppercase tracking-wider mb-2">Evite Bloqueio e Multa de R$ 50,00</h4>
                        <p className="text-xs text-zinc-300 leading-relaxed font-medium">
                          É <strong>obrigatório</strong> desativar o "Compartilhamento de Console" ou "PS4 Principal" na sua conta ANTES do tempo de aluguel expirar. O descumprimento gera uma multa automática e deixa seu saldo negativo.
                        </p>
                      </div>
                    </div>
                  )}

                  {alugueisAtivos.length === 0 ? <p className="text-zinc-500 text-sm font-medium">Nenhum jogo ativo no momento.</p> : (
                    <div className="grid grid-cols-1 gap-6">
                      {alugueisAtivos.map(item => (
                        <div key={item.locacao_id} className="bg-zinc-950/60 p-6 md:p-8 rounded-3xl border border-emerald-500/30 shadow-xl flex flex-col gap-6 hover:border-emerald-400/50 transition-colors">
                          <h4 className="text-xl font-black text-white tracking-tight leading-tight">{item.jogo}</h4>
                          <div className="flex flex-col gap-3 bg-black/50 p-5 rounded-2xl border border-zinc-800/80 shadow-inner">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider w-14">Login</span>
                              <span className="text-emerald-400 font-bold text-sm md:text-base select-all break-all tracking-wide">{item.email_login}</span>
                            </div>
                            <div className="w-full h-px bg-zinc-800/80 my-1"></div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider w-14">Senha</span>
                              <span className="text-zinc-200 font-mono font-bold text-sm md:text-base bg-zinc-900 px-3 py-1 rounded-lg select-all border border-zinc-700 inline-block w-max tracking-widest">{item.senha_login}</span>
                            </div>
                          </div>
                          
                          <div className="w-full">
                            {codigosGerados2FA[item.locacao_id] ? (
                              <div className="text-emerald-400 font-mono text-2xl font-black tracking-widest bg-zinc-950 py-4 rounded-2xl border border-emerald-500/50 select-all text-center shadow-inner">
                                {codigosGerados2FA[item.locacao_id]}
                              </div>
                            ) : (
                              <button onClick={() => gerarCodigo2FA(item.locacao_id)} className="w-full bg-emerald-600 hover:bg-emerald-500 text-xs text-white font-bold uppercase tracking-wider py-4 rounded-2xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.4)] hover:shadow-[0_0_25px_rgba(16,185,129,0.6)] flex items-center justify-center gap-3 border border-emerald-400">
                                🔐 Gerar Código de Acesso (2FA)
                              </button>
                            )}
                          </div>
                          
                          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
                            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 px-4 py-3 rounded-xl border border-amber-500/20 w-full sm:w-auto justify-center">
                              <span>⏳ Expira:</span>
                              <span className="text-xs font-black">{new Date(item.data_fim).toLocaleString()}</span>
                            </div>
                            {(() => {
                              const jogoDetalhes = jogos.find(j => j.titulo === item.jogo);
                              const temFila = jogoDetalhes && jogoDetalhes.tamanho_fila > 0;
                              if (temFila) {
                                return (
                                  <button onClick={() => devolverAntecipado(item.locacao_id, item.data_fim)} className="w-full sm:w-auto bg-emerald-900/40 hover:bg-emerald-600 text-emerald-400 hover:text-white font-bold uppercase tracking-wider px-8 py-3.5 rounded-xl text-xs transition-all border border-emerald-500/30 shadow-lg flex items-center justify-center gap-2 animate-fade-in">
                                    ♻️ Devolver (Cashback Ativo)
                                  </button>
                                )
                              }
                              return null;
                            })()}
                          </div>

                          <details className="mt-6 group/tut bg-gradient-to-r from-emerald-900/30 to-zinc-900 rounded-2xl border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.2)] hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all duration-300 [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                            <summary className="flex items-center justify-between p-5 cursor-pointer text-emerald-400 font-black text-xs md:text-sm select-none hover:bg-emerald-900/30 transition-colors uppercase tracking-wider">
                              <span className="flex items-center gap-2 animate-pulse-slow">📖 PASSO A PASSO DE COMO ENTRAR NA CONTA E JOGAR (PS4/PS5)</span>
                              <span className="transition duration-300 group-open/tut:-rotate-180">▼</span>
                            </summary>
                            <div className="p-5 md:p-8 border-t border-emerald-500/30 text-xs text-zinc-300 space-y-5 bg-black/60">
                              <p className="text-rose-400 font-black uppercase mb-4 tracking-wider flex items-center gap-3 border-b border-rose-500/30 pb-4 text-sm">
                                <span className="text-xl animate-pulse">⚠️</span> ATENÇÃO: NUNCA ENTRE COMO CONVIDADO!
                              </p>
                              <ol className="list-decimal pl-6 space-y-4 font-medium leading-relaxed">
                                <li>Ligue o console. Selecione <strong className="text-white">ADICIONAR USUÁRIO</strong> (na tela de boas vindas dos usuários).</li>
                                <li>Do lado esquerdo da tela, selecione <strong className="text-white">VAMOS COMEÇAR</strong>.</li>
                                <li>Aceite os termos e selecione <strong className="text-white">CONFIRMAR</strong>.</li>
                                <li>Na tela com o QR Code, selecione <strong className="text-white">INICIAR SESSÃO MANUALMENTE</strong> (canto esquerdo embaixo).</li>
                                <li>Insira o E-mail e Senha da conta que estão disponíveis acima.</li>
                                <li>Quando o console pedir o código (2FA), clique no botão verde <strong className="text-emerald-400">"Gerar Código de Acesso (2FA)"</strong> aqui no site.</li>
                                <li>Digite o código 2FA (6 dígitos) rapidamente, ele fica ativo por 30 segundos.</li>
                                <li><strong className="text-rose-400">NÃO ATIVE MAIS NADA</strong>. Somente selecione OK.</li>
                                <li>Para jogar na sua conta pessoal e ganhar os troféus, é OBRIGATÓRIO habilitar o compartilhamento:
                                  <ul className="list-disc pl-5 mt-3 text-zinc-400 space-y-3 border-l-2 border-zinc-700 ml-1">
                                    <li><strong>No PS5:</strong> Vá em Configurações &gt; Usuários e contas &gt; Outros &gt; Compartilhamento do console... &gt; <strong className="text-white">Habilitar</strong>. (Se não estiver habilitado)</li>
                                    <li><strong>No PS4:</strong> Vá em Configurações &gt; Gerenciamento da conta &gt; <strong className="text-white">Ativar como seu PS4 principal</strong>. (Se não estiver habilitado)</li>
                                    <li className="text-rose-400 font-bold flex items-center gap-3 mt-3 bg-rose-950/30 p-3.5 rounded-xl border border-rose-500/20"><span className="text-lg">⚠️</span> É aqui também, que no final do seu aluguel, você vai DESABILITAR o compartilhamento.</li>
                                  </ul>
                                </li>
                                <li className="text-emerald-400 font-black mt-6 text-sm bg-emerald-950/40 p-5 rounded-xl border border-emerald-500/40 shadow-inner">
                                  Vá na Biblioteca da conta, coloque o jogo para baixar, volte para o seu perfil pessoal (a sua conta oficial) e divirta-se!
                                </li>
                              </ol>
                            </div>
                          </details>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </details>

              <details className="group bg-gradient-to-r from-amber-900/20 to-zinc-900 rounded-3xl border border-amber-500/30 border-l-4 border-l-amber-500 shadow-2xl shadow-amber-500/10 [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer select-none hover:bg-amber-900/10 transition-colors">
                  <span className="flex items-center gap-3 text-lg font-black text-amber-400 tracking-tight">⏳ Minhas Reservas (Fila de Espera)</span>
                  <span className="transition duration-300 group-open:-rotate-180 text-amber-500 text-lg">▼</span>
                </summary>
                
                <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-amber-500/20 pt-8 animate-fade-in">
                  {minhasReservas.length === 0 ? <p className="text-zinc-500 text-sm font-medium">Você não possui reservas ativas na fila.</p> : (
                    <div className="grid grid-cols-1 gap-6">
                      {minhasReservas.map(item => (
                        <div key={item.reserva_id} className="bg-zinc-950/60 p-6 md:p-8 rounded-3xl border border-amber-500/30 shadow-xl flex flex-col gap-5 hover:border-amber-400/50 transition-colors">
                          <div className="flex flex-col gap-2">
                            <h4 className="text-xl font-black text-white tracking-tight leading-tight">{item.jogo}</h4>
                            <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">
                              Reservado em: {new Date(item.data_solicitacao).toLocaleString()}
                            </span>
                          </div>
                          <div className="flex flex-col gap-3 bg-black/50 p-5 rounded-2xl border border-zinc-800/80 shadow-inner mt-2">
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider w-20">Status</span>
                              <span className="text-amber-400 font-black text-[10px] uppercase tracking-wider bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-500/20 w-max">Aguardando Fila</span>
                            </div>
                            <div className="w-full h-px bg-zinc-800/80 my-1"></div>
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                              <span className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider w-20">Liberação</span>
                              <span className="text-blue-400 font-bold text-sm md:text-base tracking-wide">
                                {item.data_estimada_str}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </details>

              {historicoAlugueis.length > 0 && (
                <details className="group bg-zinc-900/80 rounded-3xl border border-zinc-800 shadow-lg [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                  <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer select-none hover:bg-zinc-800/50 transition-colors">
                    <span className="flex items-center gap-3 text-xs font-bold text-zinc-500 uppercase tracking-wider">🕰️ Últimos 5 Aluguéis</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-zinc-600 text-base">▼</span>
                  </summary>
                  
                  <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-zinc-800/50 pt-6 flex flex-wrap gap-3 animate-fade-in">
                    {historicoAlugueis.map(item => (
                      <span key={item.locacao_id} className="bg-zinc-950 border border-zinc-800 text-zinc-400 px-5 py-2 rounded-xl text-[10px] font-bold tracking-wide uppercase">{item.jogo} <span className="opacity-50 ml-1">({new Date(item.data_fim).toLocaleDateString()})</span></span>
                    ))}
                  </div>
                </details>
              )}

            </div>
          )}

          {abaAtual === 'faq' && (
            <div className="animate-fade-in max-w-4xl mx-auto py-8">
              <div className="text-center mb-14">
                <h2 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-6 tracking-tight">Central de Ajuda</h2>
                <p className="text-sm text-zinc-400 font-medium">Tudo o que você precisa saber para alugar e jogar sem dores de cabeça.</p>
              </div>

              <div className="space-y-5">
                <details className="group bg-zinc-900 border border-zinc-800 rounded-3xl [&_summary::-webkit-details-marker]:hidden shadow-xl hover:-translate-y-1 transition-transform duration-300">
                  <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer text-white hover:text-purple-400 transition-colors">
                    <span className="text-base md:text-lg font-bold tracking-tight">🎮 Como funciona o aluguel no BORA JOGAR!?</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-purple-500 text-lg">▼</span>
                  </summary>
                  <div className="px-6 md:px-8 pb-6 md:pb-8 text-zinc-400 text-xs md:text-sm leading-relaxed border-t border-zinc-800/50 pt-6">
                    É super simples! Você adiciona saldo à sua carteira digital, escolhe o jogo na vitrine, escolhe o número de dias que quer ficar com o jogo (7 ou 14 dias) e clica em <strong className="text-white">"ALUGAR"</strong>. O valor é descontado e os dados da conta (E-mail e Senha) aparecem imediatamente na sua aba <strong className="text-emerald-400">🔑 Meus Acessos</strong>. O aluguel dura 7 ou 14 dias corridos a partir do momento da compra.
                  </div>
                </details>

                <details className="group bg-zinc-900 border border-zinc-800 rounded-3xl [&_summary::-webkit-details-marker]:hidden shadow-xl hover:-translate-y-1 transition-transform duration-300">
                  <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer text-white hover:text-purple-400 transition-colors">
                    <span className="text-base md:text-lg font-bold tracking-tight">🕹️ Como eu coloco a conta alugada no meu PlayStation?</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-purple-500 text-lg">▼</span>
                  </summary>
                  <div className="px-6 md:px-8 pb-6 md:pb-8 text-zinc-400 text-xs md:text-sm leading-relaxed border-t border-zinc-800/50 pt-6">
                    <ol className="list-decimal pl-5 space-y-3 text-zinc-300 font-medium">
                      <li>Ligue o console. Selecione <strong className="text-white">ADICIONAR USUÁRIO</strong> (na tela de boas vindas dos usuários).</li>
                      <li>Do lado esquerdo da tela, selecione <strong className="text-white">VAMOS COMEÇAR</strong>.</li>
                      <li>Aceite os termos e selecione <strong className="text-white">CONFIRMAR</strong>.</li>
                      <li>Na tela com o QR Code, selecione <strong className="text-white">INICIAR SESSÃO MANUALMENTE</strong> (canto esquerdo embaixo).</li>
                      <li>Insira o E-mail e Senha da conta que estão disponíveis acima.</li>
                      <li>Quando o console pedir o código (2FA), clique no botão verde <strong className="text-emerald-400">"Gerar Código de Acesso (2FA)"</strong> aqui no site.</li>
                      <li>Digite o código 2FA (6 dígitos) rapidamente, ele fica ativo por 30 segundos.</li>
                      <li><strong className="text-rose-400">NÃO ATIVE MAIS NADA</strong>. Somente selecione OK.</li>
                      <li>Para jogar na sua conta pessoal e ganhar os troféus, é OBRIGATÓRIO habilitar o compartilhamento:
                      <ul className="list-disc pl-5 mt-3 text-zinc-400 space-y-3 border-l-2 border-zinc-700 ml-1">
                        <li><strong>No PS5:</strong> Vá em Configurações &gt; Usuários e contas &gt; Outros &gt; Compartilhamento do console... &gt; <strong className="text-white">Habilitar</strong>. (Se não estiver habilitado)</li>
                        <li><strong>No PS4:</strong> Vá em Configurações &gt; Gerenciamento da conta &gt; <strong className="text-white">Ativar como seu PS4 principal</strong>. (Se não estiver habilitado)</li>
                        <li className="text-rose-400 font-bold flex items-center gap-3 mt-3 bg-rose-950/30 p-3.5 rounded-xl border border-rose-500/20"><span className="text-lg">⚠️</span> É aqui também, que no final do seu aluguel, você vai DESABILITAR o compartilhamento.</li>
                      </ul>
                      </li>
                      <li className="text-emerald-400 font-black mt-6 text-sm bg-emerald-950/40 p-5 rounded-xl border border-emerald-500/40 shadow-inner">
                        Vá na Biblioteca da conta, coloque o jogo para baixar, volte para o seu perfil pessoal (a sua conta oficial) e divirta-se!
                      </li>
                    </ol>
                  </div>
                </details>

                <details className="group bg-zinc-900 border border-zinc-800 rounded-3xl [&_summary::-webkit-details-marker]:hidden shadow-xl hover:-translate-y-1 transition-transform duration-300">
                  <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer text-white hover:text-purple-400 transition-colors">
                    <span className="text-base md:text-lg font-bold tracking-tight">🔐 O videogame pediu um código de verificação (2FA). O que eu faço?</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-purple-500 text-lg">▼</span>
                  </summary>
                  <div className="px-6 md:px-8 pb-6 md:pb-8 text-zinc-400 text-xs md:text-sm leading-relaxed border-t border-zinc-800/50 pt-6">
                    A segurança vem em primeiro lugar! Na aba <strong className="text-emerald-400">🔑 Meus Acessos</strong>, embaixo das informações da conta (Login e Senha), existe um botão verde chamado <strong className="text-white">"GERAR CÓDIGO DE ACESSO (2FA)"</strong>.<br/><br/>
                    Basta clicar nele que um código de 6 dígitos vai aparecer na sua tela. Digite esse código rapidamente no seu PlayStation (ele muda a cada 30 segundos). Você não precisa mandar mensagem pro suporte, o sistema gera o código para você na hora!
                  </div>
                </details>

                <details className="group bg-zinc-900 border border-zinc-800 rounded-3xl [&_summary::-webkit-details-marker]:hidden shadow-xl hover:-translate-y-1 transition-transform duration-300">
                  <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer text-white hover:text-purple-400 transition-colors">
                    <span className="text-base md:text-lg font-bold tracking-tight">🏆 Posso jogar na minha conta pessoal e ganhar os troféus?</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-purple-500 text-lg">▼</span>
                  </summary>
                  <div className="px-6 md:px-8 pb-6 md:pb-8 text-zinc-400 text-xs md:text-sm leading-relaxed border-t border-zinc-800/50 pt-6">
                    <strong className="text-white">Sim, com certeza!</strong> Para isso, logo após fazer o login com a conta alugada no console:
                    <ul className="list-disc pl-5 mt-4 space-y-3 font-medium text-zinc-300">
                      <li><strong>No PS5:</strong> Vá em Configurações &gt; Usuários e Contas &gt; Outros &gt; <em>Compartilhamento do console e jogo offline</em> e <strong className="text-emerald-400">habilite</strong>.</li>
                      <li><strong>No PS4:</strong> Vá em Configurações &gt; Gerenciamento da conta &gt; <em>Ativar como seu PS4 principal</em> e <strong className="text-emerald-400">habilite</strong>.</li>
                    </ul>
                    <div className="mt-4">Depois disso, inicie o download do jogo, troque para a sua conta pessoal (a sua oficial) e jogue normalmente. Os saves e troféus ficarão nela!</div>
                  </div>
                </details>

                <details className="group bg-zinc-900 border border-zinc-800 rounded-3xl [&_summary::-webkit-details-marker]:hidden shadow-xl hover:-translate-y-1 transition-transform duration-300">
                  <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer text-white hover:text-purple-400 transition-colors">
                    <span className="text-base md:text-lg font-bold tracking-tight">⏳ E se o jogo que eu quero estiver "Alugado"?</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-purple-500 text-lg">▼</span>
                  </summary>
                  <div className="px-6 md:px-8 pb-6 md:pb-8 text-zinc-400 text-xs md:text-sm leading-relaxed border-t border-zinc-800/50 pt-6">
                    Não se preocupe, você pode garantir a sua vaga! Clique no botão <strong className="text-amber-400">"RESERVAR"</strong> (7 ou 14 dias). O valor do jogo será investido e você verá uma data de <em>Previsão de Liberação</em> em "Meus Acessos". <br/><br/>
                    Nosso sistema inteligente repassa a conta automaticamente para você no exato segundo em que o aluguel do cliente anterior terminar.
                  </div>
                </details>

                <details className="group bg-zinc-900 border border-zinc-800 rounded-3xl [&_summary::-webkit-details-marker]:hidden shadow-xl hover:-translate-y-1 transition-transform duration-300">
                  <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer text-emerald-400 hover:text-emerald-300 transition-colors">
                    <span className="text-base md:text-lg font-bold tracking-tight">♻️ Posso devolver um jogo antes do prazo e receber cashback?</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-emerald-500 text-lg">▼</span>
                  </summary>
                  <div className="px-6 md:px-8 pb-6 md:pb-8 text-zinc-300 text-xs md:text-sm leading-relaxed border-t border-emerald-500/30 pt-6">
                    Nós possuímos um sistema de <strong className="text-white">Devolução Dinâmica</strong>! Essa opção fica ativa automaticamente apenas quando o jogo que você alugou está com <strong className="text-rose-400">alta demanda</strong> (ou seja, quando existem outras pessoas na fila de espera aguardando para jogar).<br/><br/>
                    Se este for o caso, um botão verde <strong className="text-emerald-400">"♻️ Devolver"</strong> aparecerá ao lado do seu jogo na aba <em>Meus Acessos</em>. Ao fazer a devolução antecipada para agilizar a fila, você ganha uma recompensa: <strong className="text-emerald-400">R$ {configSistema.valor_por_dia.toFixed(2)} de cashback por cada 24 horas (1 dia completo)</strong> que ainda restavam no seu prazo!<br/><br/>
                    O valor cai direto na sua carteira digital assim que a nossa equipe verificar que a conta foi devidamente desativada do seu console.
                  </div>
                </details>

                <details className="group bg-rose-950/20 border border-rose-500/30 rounded-3xl [&_summary::-webkit-details-marker]:hidden shadow-xl hover:-translate-y-1 transition-transform duration-300">
                  <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer text-rose-400 hover:text-rose-300 transition-colors">
                    <span className="text-base md:text-lg font-bold tracking-tight">🚨 O que acontece se eu esquecer de desativar a conta do meu videogame?</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-rose-500 text-lg">▼</span>
                  </summary>
                  <div className="px-6 md:px-8 pb-6 md:pb-8 text-zinc-300 text-xs md:text-sm leading-relaxed border-t border-rose-500/30 pt-6">
                    Essa é a nossa regra mais rigorosa! Se o seu tempo acabar e você deixar a conta ativada como "Principal" no seu console, isso bloqueia a conta e impede que o próximo cliente da fila jogue. Quando isso acontece, nós solicitamos à Sony que faça a desabilitação. Isso pode causar banimento!<br/><br/>
                    Neste caso, nosso sistema aplica uma <strong className="text-rose-400">Multa Administrativa Automática de R$ 50,00</strong> direto na sua carteira digital. Se você não tiver saldo, sua conta ficará negativada e bloqueada para alugar jogos. Por isso, sempre desabilite a conta como "Principal" no seu console quando seu aluguel acabar.<br/><br/>
                    Se tiver alguma dúvida sobre como desabilitar a conta como "Principal" no seu console, consulte o tutorial que fica disponível junto com as informações da conta ou entre em contato conosco e te ajudaremos. É simples e rápido!
                  </div>
                </details>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PÁGINA: TERMOS DE USO                                                     */}
          {/* ========================================================================= */}
          {abaAtual === 'termos' && (
            <div className="animate-fade-in max-w-4xl mx-auto py-8">
              <div className="mb-10 border-b border-zinc-800 pb-8">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Termos de Uso</h2>
                <p className="text-sm text-zinc-400 font-medium">Última atualização: Abril de 2026</p>
              </div>

              <div className="space-y-8 text-zinc-300 text-sm md:text-base leading-relaxed">
                
                <section>
                  <h3 className="text-xl font-bold text-blue-400 mb-3 tracking-tight">1. Objeto e Natureza do Serviço</h3>
                  <p>A BORA JOGAR! oferece o serviço de locação de licenças de jogos digitais em contas secundárias para os consoles PlayStation 4 e PlayStation 5. O usuário adquire o direito de acessar a conta fornecida, baixar o jogo e jogá-lo em seu perfil pessoal durante o período contratado (7 ou 14 dias).</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-blue-400 mb-3 tracking-tight">2. Regras de Instalação e Uso</h3>
                  <ul className="list-disc pl-5 space-y-2 text-zinc-400">
                    <li>É expressamente <strong className="text-rose-400">PROIBIDO</strong> entrar na conta fornecida utilizando a opção "Jogar como Convidado".</li>
                    <li>O usuário compromete-se a <strong className="text-white">NÃO ALTERAR</strong> nenhum dado da conta fornecida, incluindo (mas não se limitando a): E-mail, Senha, ID Online, Avatar ou configurações de segurança (2FA). Qualquer tentativa de alteração será registrada pelo sistema da Sony e resultará no banimento permanente do usuário em nossa plataforma e acionamento das medidas legais cabíveis.</li>
                    <li>O usuário está autorizado a ativar o "Compartilhamento do Console e Jogo Offline" (PS5) ou "Ativar como PS4 Principal" (PS4) para jogar em sua conta pessoal e conquistar seus próprios troféus.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-rose-400 mb-3 tracking-tight">3. Devolução Obrigatória e Multa por Atraso</h3>
                  <p>Ao término do período de locação, o usuário perde o direito de acesso ao jogo. É <strong>obrigação exclusiva do usuário</strong> acessar as configurações do seu console e <strong className="text-rose-400">DESATIVAR</strong> o Compartilhamento de Console (PS5) ou a conta como Principal (PS4) antes de excluir o usuário do videogame.</p>
                  <div className="bg-rose-950/20 border border-rose-500/30 p-4 rounded-xl mt-4">
                    <strong className="text-rose-400 block mb-1">Cláusula de Multa Administrativa:</strong>
                    <p className="text-sm text-zinc-400">A não desativação da conta prende a licença no console do usuário, impedindo que o próximo cliente da fila jogue. Caso isso ocorra, o sistema aplicará uma <strong className="text-white">Multa Administrativa Automática de R$ 50,00</strong>. O saldo do usuário ficará negativo e a conta suspensa até a regularização do débito e liberação da licença.</p>
                  </div>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-emerald-400 mb-3 tracking-tight">4. Sistema de Devolução Dinâmica (Cashback)</h3>
                  <p>Caso o jogo alugado possua fila de espera, o botão "Devolver" ficará ativo no painel do usuário. Ao optar pela devolução antecipada para agilizar a fila, o usuário receberá um reembolso em créditos na carteira digital (Cashback) de acordo com os dias inteiros não utilizados, conforme tabela vigente no site no momento da devolução.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-blue-400 mb-3 tracking-tight">5. Fila de Espera (Reservas)</h3>
                  <p>Ao reservar um jogo indisponível, o valor integral é retido da carteira do usuário. O sistema transferirá as credenciais de acesso automaticamente no exato momento em que a locação do usuário anterior for encerrada. O prazo de 7 ou 14 dias só começa a contar a partir do momento em que a conta é liberada no painel.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-blue-400 mb-3 tracking-tight">6. Infrações e Banimentos da Sony</h3>
                  <p>A BORA JOGAR! não se responsabiliza por banimentos sofridos no console do usuário devido à quebra dos Termos de Serviço da PlayStation Network. Caso o usuário utilize softwares de trapaça (hacks/exploits) ou conduta tóxica que resulte no banimento da nossa conta fornecida, o usuário será cobrado judicialmente pelo valor integral de compra do jogo perdido.</p>
                </section>

              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* PÁGINA: POLÍTICA DE PRIVACIDADE                                           */}
          {/* ========================================================================= */}
          {abaAtual === 'privacidade' && (
            <div className="animate-fade-in max-w-4xl mx-auto py-8">
              <div className="mb-10 border-b border-zinc-800 pb-8">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">Política de Privacidade</h2>
                <p className="text-sm text-zinc-400 font-medium">Última atualização: Abril de 2026</p>
              </div>

              <div className="space-y-8 text-zinc-300 text-sm md:text-base leading-relaxed">
                
                <section>
                  <p className="text-zinc-400">A sua privacidade é nossa prioridade. Esta política descreve como a BORA JOGAR! coleta, utiliza e protege os seus dados pessoais ao utilizar nossa plataforma, em total conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-emerald-400 mb-3 tracking-tight">1. Dados que Coletamos</h3>
                  <p>Para o funcionamento da plataforma e liberação das locações, coletamos as seguintes informações no momento do seu cadastro:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-400">
                    <li>Nome Completo</li>
                    <li>Endereço de E-mail</li>
                    <li>Número de Telefone (WhatsApp)</li>
                    <li>Senha (armazenada de forma criptografada e inacessível até mesmo para nossos administradores).</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-emerald-400 mb-3 tracking-tight">2. Como Utilizamos seus Dados</h3>
                  <p>As informações coletadas são estritamente utilizadas para:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-zinc-400">
                    <li>Criar e gerenciar sua carteira digital dentro da plataforma.</li>
                    <li>Enviar credenciais de acesso aos jogos alugados.</li>
                    <li>Notificar via e-mail ou WhatsApp quando a fila de espera do seu jogo favorito andar.</li>
                    <li>Fornecer suporte técnico e prevenir fraudes ou apropriação indevida das contas da locadora.</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-emerald-400 mb-3 tracking-tight">3. Proteção e Pagamentos</h3>
                  <p>A BORA JOGAR! <strong className="text-white">NÃO armazena</strong> dados bancários, números de cartão de crédito ou chaves PIX de suas contas pessoais. Todo o processamento financeiro é realizado em ambiente blindado e seguro através da instituição de pagamento parceira oficial (Asaas).</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-emerald-400 mb-3 tracking-tight">4. Compartilhamento de Dados</h3>
                  <p>Nós não vendemos, alugamos ou repassamos seus dados pessoais para terceiros ou agências de publicidade sob nenhuma hipótese. Seus dados são mantidos em servidores seguros e acessados apenas pelo sistema automatizado para garantir o seu aluguel.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-emerald-400 mb-3 tracking-tight">5. Seus Direitos</h3>
                  <p>Você tem o direito de solicitar a exclusão da sua conta e de todos os seus dados de nossos servidores a qualquer momento. A exclusão será processada em até 72 horas, desde que não existam locações ativas, pendências de devolução no console ou saldos negativos (multas) em aberto.</p>
                </section>

              </div>
            </div>
          )}

          {abaAtual === 'admin' && usuarioLogado.is_admin && (
            <div className="animate-fade-in mt-2 max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight mb-8">Administração do Sistema</h2>
              {/* 📊 BLOCOS ESTATISTICAS DO SISTEMA */}
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div className="bg-gradient-to-br from-emerald-900/40 to-zinc-900 border border-emerald-500/30 p-8 rounded-3xl shadow-xl shadow-emerald-500/10 relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute -right-4 -top-4 text-8xl opacity-5">💰</div>
                  <h4 className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-3">Faturamento Total</h4>
                  <span className="text-3xl md:text-4xl font-black text-emerald-400 tracking-tighter">R$ {estatisticasAdmin.faturamento.toFixed(2)}</span>
                </div>
                <div className="bg-gradient-to-br from-blue-900/40 to-zinc-900 border border-blue-500/30 p-8 rounded-3xl shadow-xl shadow-blue-500/10 relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute -right-4 -top-4 text-8xl opacity-5">👥</div>
                  <h4 className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-3">Clientes Cadastrados</h4>
                  <span className="text-3xl md:text-4xl font-black text-blue-400 tracking-tighter">{estatisticasAdmin.total_clientes}</span>
                </div>
                <div className="bg-gradient-to-br from-amber-900/40 to-zinc-900 border border-amber-500/30 p-8 rounded-3xl shadow-xl shadow-amber-500/10 relative overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                  <div className="absolute -right-4 -top-4 text-8xl opacity-5">🎮</div>
                  <h4 className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest mb-3">Locações Ativas</h4>
                  <span className="text-3xl md:text-4xl font-black text-amber-400 tracking-tighter">{estatisticasAdmin.locacoes_ativas}</span>
                </div>
              </section>

              <div className="flex flex-col gap-8 mb-10">
                  {/* 🖼️ BLOCO CONFIGURAÇÕES DA VITRINE E BANNERS */}
                  <details className="group bg-zinc-900/80 rounded-3xl border border-zinc-800 border-l-4 border-l-orange-500 shadow-2xl shadow-orange-500/10 [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                      <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer hover:bg-orange-900/10 transition-colors select-none relative">
                      <span className="flex items-center gap-3 relative z-10 text-lg font-black text-orange-400 tracking-tight">🖼️ Configurações da Vitrine e Banners</span>
                      <span className="transition duration-300 group-open:-rotate-180 text-orange-500 relative z-10 text-lg">▼</span>
                      </summary>
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-zinc-800/50 pt-8">
                          
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-5">
                              <div>
                              <h4 className="text-white font-bold text-base tracking-tight">📣 Hero Alert (Faixa de Anúncio)</h4>
                              <p className="text-xs text-zinc-400 mt-1 font-medium">Faixa colorida que aparece abaixo dos banners principais.</p>
                              </div>
                              <button onClick={toggleAnuncio} className={`px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all shadow-lg w-full sm:w-auto ${configSistema.anuncio_ativo ? 'bg-orange-600 text-white shadow-orange-600/20' : 'bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700'}`}>
                              {configSistema.anuncio_ativo ? '✅ FAIXA LIGADA' : '❌ FAIXA DESLIGADA'}
                              </button>
                          </div>
                          <textarea placeholder="Ex: PROMOÇÃO DE FIM DE SEMANA! Recarregue R$ 50..." value={configSistema.mensagem_anuncio} onChange={(e) => setConfigSistema({...configSistema, mensagem_anuncio: e.target.value})} className={`${adminInputClass} resize-none h-16 bg-zinc-950 border-zinc-700 focus:ring-orange-500 text-sm`} />

                          <div className="mt-8 border-t border-zinc-800/50 pt-6">
                            <h4 className="text-white font-bold text-base tracking-tight">🖼️ Banners do Carrossel (Imagens)</h4>
                            <p className="text-xs text-zinc-400 mt-1 mb-4 font-medium">Cole as URLs das imagens que irão ficar trocando no topo do site. <strong className="text-emerald-400">Separe cada URL com uma vírgula.</strong></p>
                            <textarea placeholder="https://imagem1.jpg, https://imagem2.jpg..." value={configSistema.banners_url || ''} onChange={(e) => setConfigSistema({...configSistema, banners_url: e.target.value})} className={`${adminInputClass} resize-none h-24 bg-zinc-950 border-zinc-700 focus:ring-orange-500 text-sm`} />
                          </div>

                          <div className="flex justify-end mt-6">
                              <button onClick={salvarConfiguracoesGlobais} className="bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-colors text-xs">
                              💾 Salvar Configurações
                              </button>
                          </div>
                      </div>
                  </details>

                  {/* 📊 BLOCO GESTÃO DA ENQUETE */}
                  <details className="group bg-gradient-to-r from-fuchsia-900/20 to-zinc-900 rounded-3xl border border-fuchsia-500/30 shadow-2xl shadow-fuchsia-500/10 border-l-4 border-l-fuchsia-500 [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                      <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer hover:bg-fuchsia-900/10 transition-colors select-none relative">
                      <span className="flex items-center gap-3 relative z-10 text-lg font-black text-fuchsia-400 tracking-tight">📊 Gestão da Enquete</span>
                      <span className="transition duration-300 group-open:-rotate-180 text-fuchsia-500 relative z-10 text-lg">▼</span>
                      </summary>
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-fuchsia-500/20 pt-8">
                          
                          <div className="flex flex-col lg:flex-row gap-8">
                              <form onSubmit={adicionarOpcaoEnquete} className="flex flex-col gap-4 flex-1">
                                  <h4 className="text-white font-bold text-sm tracking-tight mb-2">Adicionar Opção (Máx. Recomendado: 5)</h4>
                                  <input type="text" placeholder="Título do Jogo" value={novaOpcaoEnqueteTitulo} onChange={e => setNovaOpcaoEnqueteTitulo(e.target.value)} className={adminInputClass} required />
                                  <input type="url" placeholder="URL da Capa" value={novaOpcaoEnqueteImagem} onChange={e => setNovaOpcaoEnqueteImagem(e.target.value)} className={adminInputClass} required />
                                  <button type="submit" className="py-3.5 bg-fuchsia-600 hover:bg-fuchsia-500 font-bold uppercase tracking-wider rounded-xl text-xs text-white transition-colors shadow-lg shadow-fuchsia-500/20 mt-2">Salvar Opção</button>
                              </form>

                              <div className="flex-1 bg-zinc-950/50 p-5 rounded-2xl border border-zinc-800/80">
                                  <div className="flex justify-between items-center mb-4">
                                      <h4 className="text-zinc-400 font-bold text-xs uppercase tracking-wider">Opções Atuais</h4>
                                      <button onClick={limparEnquete} type="button" className="text-rose-400 hover:text-white bg-rose-900/30 hover:bg-rose-600 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-colors border border-rose-500/30">Limpar Enquete</button>
                                  </div>
                                  <div className="flex flex-col gap-3 overflow-y-auto max-h-[200px] pr-2 custom-scrollbar">
                                      {enqueteOpcoes.length === 0 ? <p className="text-zinc-500 text-xs font-medium">Nenhuma opção cadastrada.</p> : (
                                          enqueteOpcoes.map(op => (
                                              <div key={op.id} className="flex justify-between items-center bg-zinc-900 p-3 rounded-xl border border-zinc-800">
                                                  <div className="flex items-center gap-3">
                                                      <img src={op.url_imagem} className="w-10 h-10 object-cover rounded-lg border border-zinc-700" alt="capa"/>
                                                      <div className="flex flex-col">
                                                          <span className="text-white text-xs font-bold">{op.titulo}</span>
                                                          <span className="text-fuchsia-400 text-[10px] font-black">{op.total_votos} votos</span>
                                                      </div>
                                                  </div>
                                                  <button onClick={() => removerOpcaoEnquete(op.id)} className="text-zinc-500 hover:text-rose-400 text-lg transition-colors" title="Remover">🗑️</button>
                                              </div>
                                          ))
                                      )}
                                  </div>
                              </div>
                          </div>
                      </div>
                  </details>

                  {/* 🎫 BLOCO CUPONS PROMOCIONAIS */}
                  <details className="group bg-gradient-to-r from-purple-900/20 to-zinc-900 rounded-3xl border border-purple-500/30 shadow-2xl shadow-purple-500/10 [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                      <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer hover:bg-purple-900/10 transition-colors select-none relative">
                      <span className="flex items-center gap-3 relative z-10 text-lg font-black text-purple-400 tracking-tight">🎫 Gerenciar Cupons Promocionais</span>
                      <span className="transition duration-300 group-open:-rotate-180 text-purple-500 relative z-10 text-lg">▼</span>
                      </summary>
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-purple-500/20 pt-8">
                          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                              <form onSubmit={cadastrarCupom} className="flex flex-col gap-4 lg:col-span-1">
                              <input type="text" placeholder="Código (Ex: VIP20)" value={novoCupomCodigo} onChange={e => setNovoCupomCodigo(e.target.value.toUpperCase())} className={adminInputClass} required />
                              <div className="flex gap-3">
                                  <select value={novoCupomTipo} onChange={e => setNovoCupomTipo(e.target.value)} className={adminInputClass}>
                                  <option value="PORCENTAGEM">% Porcentagem</option>
                                  <option value="FIXO">R$ Valor Fixo</option>
                                  </select>
                                  <input type="number" step="0.01" placeholder="Valor" value={novoCupomValor} onChange={e => setNovoCupomValor(e.target.value)} className={adminInputClass} required />
                              </div>
                              <button type="submit" className="w-full py-3.5 bg-purple-600 hover:bg-purple-500 font-bold uppercase tracking-wider rounded-xl text-xs text-white transition-colors shadow-lg shadow-purple-500/20 mt-2">Criar Cupom</button>
                              </form>

                              <div className="lg:col-span-2 overflow-y-auto max-h-[200px] pr-3 scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent">
                              {listaCupons.length === 0 ? <p className="text-zinc-500 text-sm font-medium">Nenhum cupom ativo.</p> : (
                                  <table className="w-full text-left text-sm whitespace-nowrap">
                                  <thead><tr className="text-zinc-400 border-b border-purple-500/30"><th className="pb-3 font-bold uppercase tracking-wider text-[10px]">Código</th><th className="pb-3 font-bold uppercase tracking-wider text-[10px]">Tipo</th><th className="pb-3 font-bold uppercase tracking-wider text-[10px]">Bônus</th><th className="pb-3 text-right font-bold uppercase tracking-wider text-[10px]">Ação</th></tr></thead>
                                  <tbody>
                                      {listaCupons.map(c => (
                                      <tr key={c.id} className="border-b border-purple-500/10 hover:bg-purple-900/20 transition-colors">
                                          <td className="py-4 font-black text-white tracking-widest text-sm">{c.codigo}</td>
                                          <td className="py-4 text-zinc-400 text-[10px] font-bold uppercase tracking-wider">{c.tipo}</td>
                                          <td className="py-4 text-emerald-400 font-black text-sm">{c.tipo === 'FIXO' ? `+ R$ ${c.valor.toFixed(2)}` : `+ ${c.valor}%`}</td>
                                          <td className="py-4 text-right"><button onClick={() => removerCupom(c.id)} className="text-rose-400 hover:text-white bg-rose-900/30 px-3 py-1.5 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-colors border border-rose-500/30">Excluir</button></td>
                                      </tr>
                                      ))}
                                  </tbody>
                                  </table>
                              )}
                              </div>
                          </div>
                      </div>
                  </details>
              </div>

              {/* 🚨 BLOCO MANUTENÇÃO DE CONTAS */}
              {contasManutencao.length > 0 && (
                <section className="bg-rose-950/20 border border-rose-500/50 shadow-2xl shadow-rose-500/10 p-8 rounded-3xl mb-10 animate-pulse-slow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-xl font-black text-rose-400 tracking-tight mb-2 flex items-center gap-3">🚨 Atenção: Troca de Senha Necessária</h3>
                      <p className="text-xs md:text-sm text-zinc-300 font-medium">As locações abaixo terminaram. Altere a senha na PSN e informe aqui para liberar a conta.</p>
                    </div>
                  </div>

                  <div className="mb-8 flex flex-col md:flex-row gap-4 bg-rose-950/30 p-4 rounded-2xl border border-rose-500/20 shadow-inner">
                    <input type="text" placeholder="🔍 Buscar por jogo ou último cliente..." value={buscaManutencao} onChange={e => setBuscaManutencao(e.target.value)} className={`${adminInputClass} border-rose-500/30 focus:ring-rose-500 flex-1`} />
                    <div className="flex flex-col gap-1 w-full md:w-auto">
                      <select value={ordenacaoManutencao} onChange={e => setOrdenacaoManutencao(e.target.value)} className="bg-zinc-900 border border-rose-500/30 text-zinc-300 text-sm font-bold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-rose-500 outline-none w-full md:w-56 cursor-pointer hover:border-rose-400 transition-colors h-full">
                        <option value="urgente">⚠️ Mais Urgentes (Cashback)</option>
                        <option value="az_jogo">🎮 Jogo (A-Z)</option>
                      </select>
                    </div>
                  </div>
                  
                  {contasManutencaoFiltradas.length === 0 ? (
                    <p className="text-zinc-500 text-sm font-medium text-center py-8">Nenhuma conta em manutenção no momento.</p>
                  ) : (
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                      {contasManutencaoFiltradas.map(conta => (
                        <div key={conta.conta_psn_id} className="bg-zinc-900 p-6 md:p-8 rounded-3xl border border-rose-500/50 flex flex-col gap-6 shadow-lg">
                          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                            <div className="flex flex-col gap-1.5">
                              <strong className="text-white text-lg font-black tracking-tight">{conta.jogo}</strong>
                              <span className="text-xs font-bold text-zinc-400 tracking-wide">Login: <span className="text-white font-medium select-all">{conta.email_login}</span></span>
                              <span className="text-xs font-bold text-zinc-500 tracking-wide line-through">Senha Velha: <span className="font-mono">{conta.senha_antiga}</span></span>
                              
                              <span className="mt-4 text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20 w-max">
                                Último Cliente: {conta.ultimo_cliente_nome || 'Desconhecido'}
                              </span>

                              {conta.cashback_pendente > 0 && (
                                <span className="mt-3 text-[10px] font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 w-max">
                                  💸 Cashback Pendente: R$ {conta.cashback_pendente.toFixed(2)}
                                </span>
                              )}
                            </div>
                            
                            <div className="flex flex-col gap-3 w-full sm:w-auto">
                              {conta.ultimo_cliente_telefone && (
                                <button onClick={() => cobrarNoWhatsApp(conta.ultimo_cliente_nome, conta.ultimo_cliente_telefone, conta.jogo)} className="bg-emerald-900/40 hover:bg-emerald-600 text-emerald-400 hover:text-white font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl text-[10px] transition-colors border border-emerald-500/30 shadow flex items-center justify-center gap-2">
                                  📱 Cobrar via Whats
                                </button>
                              )}
                              {conta.ultimo_cliente_id && (
                                <button onClick={() => aplicarMultaCliente(conta.ultimo_cliente_id, conta.ultimo_cliente_nome)} className="bg-rose-900/40 hover:bg-rose-600 text-rose-400 hover:text-white font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl text-[10px] transition-colors border border-rose-500/30 shadow flex items-center justify-center gap-2">
                                  🚨 Aplicar Multa
                                </button>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex flex-col sm:flex-row gap-3 mt-2 pt-6 border-t border-rose-900/50">
                            <input type="text" placeholder="Digite a NOVA senha para liberar" value={novasSenhasTemp[conta.conta_psn_id] || ''} onChange={(e) => setNovasSenhasTemp({...novasSenhasTemp, [conta.conta_psn_id]: e.target.value})} className="flex-1 px-5 py-3.5 bg-zinc-950 border border-zinc-800 rounded-2xl text-sm font-bold text-white focus:border-rose-500 outline-none"/>
                            <button onClick={() => confirmarResetSenha(conta.conta_psn_id)} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold uppercase tracking-wider px-6 py-3.5 rounded-2xl text-xs transition-colors shadow-lg shadow-emerald-600/20 whitespace-nowrap">Liberar Jogo</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              )}

              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-10">
                  
                  {/* ➕ BLOCO CADASTRAR NOVO JOGO */}
                  <div className="bg-gradient-to-br from-blue-900/20 to-zinc-900 rounded-3xl border border-blue-500/30 p-8 shadow-2xl shadow-blue-500/10 flex flex-col">
                      <h3 className="text-lg font-black text-blue-400 tracking-tight mb-8 flex items-center gap-3">➕ Cadastrar Novo Jogo</h3>
                      <form onSubmit={cadastrarJogo} className="space-y-4 flex-1 flex flex-col">
                      <div className="flex gap-3">
                          <input type="text" placeholder="Título do jogo" value={novoJogoTitulo} onChange={e => setNovoJogoTitulo(e.target.value)} className={adminInputClass} required />
                          <button type="button" onClick={buscarDadosDoJogo} className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold px-5 rounded-xl text-[10px] uppercase tracking-wider whitespace-nowrap transition-colors shadow-lg shadow-amber-500/20">✨ Buscar</button>
                      </div>
                      
                      <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                            <select value={novoJogoPlataforma} onChange={e => setNovoJogoPlataforma(e.target.value)} className={adminInputClass}>
                            <option value="PS5">PS5</option>
                            <option value="PS4/PS5">PS4/PS5</option>
                            </select>
                        </div>
                        <div className="w-full relative">
                            <label className="absolute -top-2 left-3 bg-zinc-900 px-1 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Lançamento (Pré-venda)</label>
                            <input type="date" value={novoJogoDataLancamento} onChange={e => setNovoJogoDataLancamento(e.target.value)} className={adminInputClass} />
                        </div>
                      </div>

                      <div className="flex gap-3">
                          <input type="text" placeholder="Tempo (ex: 20h)" value={novoJogoTempo} onChange={e => setNovoJogoTempo(e.target.value)} className={adminInputClass} />
                          <input type="number" step="0.1" placeholder="Nota" value={novoJogoNota} onChange={e => setNovoJogoNota(e.target.value)} className={adminInputClass} />
                      </div>
                      <input type="url" placeholder="URL da Capa" value={novoJogoImagem} onChange={e => setNovoJogoImagem(e.target.value)} className={adminInputClass} />
                      <div className="flex gap-3">
                          <input type="number" step="0.01" placeholder="Preço 7 Dias (Ex: 35.00)" value={novoJogoPreco} onChange={e => setNovoJogoPreco(e.target.value)} className={adminInputClass} required />
                          <input type="number" step="0.01" placeholder="Preço 14 Dias (Ex: 60.00)" value={novoJogoPreco14} onChange={e => setNovoJogoPreco14(e.target.value)} className={adminInputClass} />
                      </div>
                      <textarea placeholder="Descrição curta do jogo..." value={novoJogoDescricao} onChange={e => setNovoJogoDescricao(e.target.value)} className={`${adminInputClass} resize-none h-24`} required />
                      <button type="submit" className="w-full mt-auto py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold uppercase tracking-wider rounded-xl text-xs transition-colors shadow-lg shadow-blue-500/20">Salvar no Catálogo</button>
                      </form>
                  </div>

                  {/* 📦 BLOCO ABASTECER ESTOQUE */}
                  <div className="bg-gradient-to-br from-fuchsia-900/20 to-zinc-900 rounded-3xl border border-fuchsia-500/30 p-8 shadow-2xl shadow-fuchsia-500/10 flex flex-col">
                      <h3 className="text-lg font-black text-fuchsia-400 tracking-tight mb-8 flex items-center gap-3">📦 Abastecer Estoque</h3>
                      <input type="text" placeholder="🔍 Filtrar jogo na lista abaixo..." value={buscaEstoque} onChange={e => setBuscaEstoque(e.target.value)} className={`${adminInputClass} mb-4 border-fuchsia-500/30 focus:ring-fuchsia-500`} />
                      <form onSubmit={cadastrarConta} className="space-y-4 flex-1 flex flex-col">
                      <select value={novaContaJogoId} onChange={e => setNovaContaJogoId(e.target.value)} className={adminInputClass} required><option value="">Selecione o Jogo...</option>{jogosEstoqueFiltrados.map(j => <option key={j.id} value={j.id}>{j.titulo}</option>)}</select>
                      <input type="email" placeholder="E-mail da Conta PSN" value={novaContaEmail} onChange={e => setNovaContaEmail(e.target.value)} className={adminInputClass} required />
                      <input type="text" placeholder="Senha da Conta PSN" value={novaContaSenha} onChange={e => setNovaContaSenha(e.target.value)} className={adminInputClass} required />
                      <input type="text" placeholder="Segredo MFA (Opcional - Texto do Autenticador)" value={novaContaMfaSecret} onChange={e => setNovaContaMfaSecret(e.target.value)} className={adminInputClass} />
                      <button type="submit" className="w-full mt-auto py-4 bg-fuchsia-600 hover:bg-fuchsia-500 text-white font-bold uppercase tracking-wider rounded-xl text-xs transition-colors shadow-lg shadow-fuchsia-500/20">Adicionar Conta ao Cofre</button>
                      </form>
                  </div>

              </div>

              <div className="flex flex-col gap-8 mb-10">

                  {/* 🎮 BLOCO CATALOGO DE JOGOS */}
                  <details className="group bg-zinc-900/80 rounded-3xl border border-zinc-800 border-l-4 border-l-blue-500 shadow-2xl shadow-blue-500/10 [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                      <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer hover:bg-blue-900/10 transition-colors select-none">
                      <span className="flex items-center gap-3 text-lg font-black text-blue-400 tracking-tight">🎮 Catálogo de Jogos ({jogos.length})</span>
                      <span className="transition duration-300 group-open:-rotate-180 text-blue-500 text-lg">▼</span>
                      </summary>
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-zinc-800/50 pt-8">
                      <div className="mb-6">
                          <input type="text" placeholder="Pesquisar jogo no catálogo..." value={termoBusca} onChange={e => setTermoBusca(e.target.value)} className={adminInputClass} />
                      </div>
                      
                      <div className="max-h-[600px] overflow-y-auto pr-3 custom-scrollbar">
                          {jogosFiltrados.length === 0 ? <p className="text-zinc-500 text-sm font-medium">Vazio.</p> : (
                          <ul className="space-y-3">
                              {jogosFiltrados.slice(paginaCatalogo * 50, (paginaCatalogo + 1) * 50).map(jogo => (
                              <li key={jogo.id} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-950/50 p-4 md:p-5 rounded-2xl border-l-2 border-blue-500 gap-4 shadow-sm hover:bg-zinc-800/50 transition-colors">
                                  <div className="flex flex-col leading-relaxed gap-1 w-full md:w-auto">
                                  <span className="font-black text-sm text-white tracking-tight truncate max-w-[300px]">{jogo.titulo}</span>
                                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">R$ {jogo.preco_aluguel.toFixed(2)}</span>
                                  {jogo.estoque > 0 ? <span className="text-emerald-400 text-[10px] font-bold uppercase tracking-wider mt-1">✅ {jogo.estoque} Disponível</span> : <span className="text-rose-400 text-[10px] font-bold uppercase tracking-wider mt-1">❌ Alugado</span>}
                                  </div>
                                  
                                  <div className="flex gap-2 w-full md:w-auto justify-end">
                                      <button onClick={() => setModalEdicaoJogo(jogo)} className="text-blue-400 hover:text-white text-[10px] uppercase tracking-wider bg-blue-900/30 hover:bg-blue-600 px-4 py-2 rounded-lg font-bold transition-colors border border-blue-500/30">Editar</button>
                                      <button onClick={() => removerJogo(jogo.id)} className="text-rose-400 hover:text-white text-[10px] uppercase tracking-wider bg-rose-900/30 hover:bg-rose-600 px-4 py-2 rounded-lg font-bold transition-colors border border-rose-500/30">Excluir</button>
                                  </div>
                              </li>
                              ))}
                          </ul>
                          )}
                      </div>

                      <div className="mt-6 flex justify-between items-center bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80">
                          <button onClick={() => setPaginaCatalogo(Math.max(0, paginaCatalogo - 1))} disabled={paginaCatalogo === 0} className="px-5 py-2.5 bg-zinc-800 text-white rounded-xl disabled:opacity-50 hover:bg-zinc-700 text-[10px] uppercase tracking-wider font-bold transition-colors">◀ Anterior</button>
                          <span className="text-zinc-400 text-xs font-bold">Página {paginaCatalogo + 1}</span>
                          <button onClick={() => setPaginaCatalogo(paginaCatalogo + 1)} disabled={(paginaCatalogo + 1) * 50 >= jogosFiltrados.length} className="px-5 py-2.5 bg-zinc-800 text-white rounded-xl disabled:opacity-50 hover:bg-zinc-700 text-[10px] uppercase tracking-wider font-bold transition-colors">Próxima ▶</button>
                      </div>
                      </div>
                  </details>

                  {/* 🔑 BLOCO LOCAÇÕES ATIVAS */}
                  <details className="group bg-zinc-900/80 rounded-3xl border border-zinc-800 border-l-4 border-l-emerald-500 shadow-2xl shadow-emerald-500/10 [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                      <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer hover:bg-emerald-900/10 transition-colors select-none">
                      <span className="flex items-center gap-3 text-lg font-black text-emerald-400 tracking-tight">🔑 Locações Ativas ({locacoesAtivasFiltradas.length})</span>
                      <span className="transition duration-300 group-open:-rotate-180 text-emerald-500 text-lg">▼</span>
                      </summary>
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-zinc-800/50 pt-8">
                      {/* 🚀 BARRA DE BUSCA E FILTRO - LOCAÇÕES ATIVAS */}
                        <div className="mb-6 flex flex-col md:flex-row gap-4 bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80 shadow-inner">
                            <input type="text" placeholder="🔍 Buscar locação por jogo ou cliente..." value={buscaLocacao} onChange={e => setBuscaLocacao(e.target.value)} className={`${adminInputClass} flex-1`} />
                            <select value={ordenacaoLocacoes} onChange={e => setOrdenacaoLocacoes(e.target.value)} className="bg-zinc-900 border border-emerald-500/30 text-zinc-300 text-sm font-bold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-emerald-500 outline-none w-full md:w-56 cursor-pointer hover:border-emerald-400 transition-colors">
                                <option value="expira_breve">⏳ Expira em Breve</option>
                                <option value="recentes">🆕 Mais Recentes</option>
                                <option value="az_jogo">🎮 Jogo (A-Z)</option>
                                <option value="az_cliente">👤 Cliente (A-Z)</option>
                            </select>
                        </div>
                      <div className="max-h-[600px] overflow-y-auto pr-3 custom-scrollbar">
                          {locacoesAtivasFiltradas.length === 0 ? <p className="text-zinc-500 text-sm font-medium">Nenhuma locação ativa.</p> : (
                          <table className="w-full text-left text-sm whitespace-nowrap">
                              <thead>
                              <tr className="text-zinc-500 border-b border-zinc-800">
                                  <th className="pb-3 font-bold uppercase tracking-wider text-[10px]">Cliente</th>
                                  <th className="pb-3 font-bold uppercase tracking-wider text-[10px]">Jogo</th>
                                  <th className="pb-3 font-bold uppercase tracking-wider text-[10px]">Expira</th>
                                  <th className="pb-3 text-right font-bold uppercase tracking-wider text-[10px]">Ações</th>
                              </tr>
                              </thead>
                              <tbody>
                              {locacoesAtivasFiltradas.map(loc => (
                                  <tr key={loc.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                                  <td className="py-4 text-zinc-300 text-xs font-medium">{loc.cliente}</td>
                                  <td className="py-4 font-black text-white text-sm tracking-tight">{loc.jogo}</td>
                                  <td className="py-4 text-amber-400 text-xs font-bold">{new Date(loc.data_fim).toLocaleDateString()}</td>
                                  <td className="py-4">
                                    <div className="flex justify-end gap-2">
                                      <button onClick={() => avisarLiberacao(loc.cliente, loc.jogo)} className="text-emerald-400 hover:text-white text-[10px] uppercase tracking-wider bg-emerald-900/30 hover:bg-emerald-600 px-3 py-1.5 rounded-lg font-bold transition-colors border border-emerald-500/30 shadow flex items-center gap-1.5" title="Avisar Liberação via WhatsApp">
                                        <span className="text-sm">📲</span> Avisar
                                      </button>
                                      <button onClick={() => revogarLocacao(loc.id)} className="text-rose-400 hover:text-white text-[10px] uppercase tracking-wider bg-rose-900/30 hover:bg-rose-600 px-3 py-1.5 rounded-lg font-bold transition-colors border border-rose-500/30 shadow">
                                        Revogar
                                      </button>
                                    </div>
                                  </td>
                                  </tr>
                              ))}
                              </tbody>
                          </table>
                          )}
                      </div>
                      </div>
                  </details>

                  {/* ⏳ BLOCO FILA DE ESPERA GLOBAL */}
                  <details className="group bg-zinc-900/80 rounded-3xl border border-zinc-800 border-l-4 border-l-amber-500 shadow-2xl shadow-amber-500/10 [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                      <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer hover:bg-amber-900/10 transition-colors select-none">
                      <span className="flex items-center gap-3 text-lg font-black text-amber-400 tracking-tight">⏳ Fila de Espera Global ({reservasAdminFiltradas.length})</span>
                      <span className="transition duration-300 group-open:-rotate-180 text-amber-500 text-lg">▼</span>
                      </summary>
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-zinc-800/50 pt-8">
                        <div className="mb-6 flex flex-col md:flex-row gap-4 bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80 shadow-inner">
                            <input type="text" placeholder="🔍 Buscar reserva por jogo ou cliente..." value={buscaReservaAdmin} onChange={e => setBuscaReservaAdmin(e.target.value)} className={`${adminInputClass} flex-1`} />
                            <select value={ordenacaoReservaAdmin} onChange={e => setOrdenacaoReservaAdmin(e.target.value)} className="bg-zinc-900 border border-amber-500/30 text-zinc-300 text-sm font-bold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-amber-500 outline-none w-full md:w-56 cursor-pointer hover:border-amber-400 transition-colors">
                                <option value="antigas">⏳ Mais Antigas</option>
                                <option value="recentes">🆕 Mais Recentes</option>
                                <option value="az_cliente">👤 Cliente (A-Z)</option>
                            </select>
                        </div>
                        <div className="max-h-[600px] overflow-y-auto pr-3 custom-scrollbar">
                            {reservasAdminFiltradas.length === 0 ? <p className="text-zinc-500 text-sm font-medium">Nenhuma reserva pendente.</p> : (
                                <table className="w-full text-left text-sm whitespace-nowrap">
                                    <thead>
                                        <tr className="text-zinc-500 border-b border-zinc-800">
                                            <th className="pb-3 font-bold uppercase tracking-wider text-[10px]">Cliente</th>
                                            <th className="pb-3 font-bold uppercase tracking-wider text-[10px]">Jogo</th>
                                            <th className="pb-3 font-bold uppercase tracking-wider text-[10px]">Data da Reserva</th>
                                            <th className="pb-3 text-right font-bold uppercase tracking-wider text-[10px]">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservasAdminFiltradas.map(reserva => (
                                            <tr key={reserva.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30 transition-colors">
                                                <td className="py-4 text-zinc-300 text-xs font-medium">{reserva.cliente}</td>
                                                <td className="py-4 font-black text-white text-sm tracking-tight">{reserva.jogo}</td>
                                                <td className="py-4 text-amber-400 text-xs font-bold">{new Date(reserva.data_solicitacao).toLocaleString()}</td>
                                                <td className="py-4 text-right">
                                                    <button onClick={() => cancelarReservaAdmin(reserva.id, reserva.cliente, reserva.jogo)} className="text-rose-400 hover:text-white text-[10px] uppercase tracking-wider bg-rose-900/30 hover:bg-rose-600 px-3 py-1.5 rounded-lg font-bold transition-colors border border-rose-500/30 shadow">
                                                        Cancelar e Estornar
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                      </div>
                  </details>

                  {/* 👥 BLOCO BASE DE CLIENTES */}
                  <details className="group bg-zinc-900/80 rounded-3xl border border-zinc-800 border-l-4 border-l-purple-500 shadow-2xl shadow-purple-500/10 [&_summary::-webkit-details-marker]:hidden overflow-hidden">
                      <summary className="flex items-center justify-between p-6 md:p-8 cursor-pointer hover:bg-purple-900/10 transition-colors select-none">
                      <span className="flex items-center gap-3 text-lg font-black text-purple-400 tracking-tight">👥 Base de Clientes ({todosUsuarios.length})</span>
                      <span className="transition duration-300 group-open:-rotate-180 text-purple-500 text-lg">▼</span>
                      </summary>
                      <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-zinc-800/50 pt-8">
                      
                      {/* 🚀 BARRA DE BUSCA E FILTROS UNIFICADA */}
                      <div className="mb-6 flex flex-col lg:flex-row gap-4 bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80 shadow-inner items-center">
                          <input 
                            type="text" 
                            placeholder="🔍 Buscar cliente por nome ou e-mail..." 
                            value={buscaCliente} 
                            onChange={e => {setBuscaCliente(e.target.value); setPaginaClientes(0);}} 
                            className={`${adminInputClass} flex-1 w-full`} 
                          />
                          
                          <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                              <select 
                                value={ordenacaoClientes} 
                                onChange={e => {setOrdenacaoClientes(e.target.value); setPaginaClientes(0);}} 
                                className="bg-zinc-900 border border-purple-500/30 text-zinc-300 text-sm font-bold rounded-xl px-3 py-2.5 focus:ring-2 focus:ring-purple-500 outline-none w-full sm:w-48 cursor-pointer hover:border-purple-400 transition-colors"
                              >
                                <option value="recentes">⏰ Mais Recentes</option>
                                <option value="antigos">🕰️ Mais Antigos</option>
                                <option value="maior_saldo">💰 Maior Saldo</option>
                                <option value="menor_saldo">📉 Menor Saldo</option>
                                <option value="az">🔤 Ordem (A-Z)</option>
                                <option value="za">🔠 Ordem (Z-A)</option>
                              </select>

                              <div className="flex bg-zinc-900 rounded-xl p-1 border border-zinc-700/50 shadow-inner w-full sm:w-auto">
                                <button onClick={() => {setFiltroSaldoClientes('todos'); setPaginaClientes(0);}} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all ${filtroSaldoClientes === 'todos' ? 'bg-purple-600 text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>Todos</button>
                                <button onClick={() => {setFiltroSaldoClientes('positivo'); setPaginaClientes(0);}} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all ${filtroSaldoClientes === 'positivo' ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>Positivos</button>
                                <button onClick={() => {setFiltroSaldoClientes('negativo'); setPaginaClientes(0);}} className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-[10px] uppercase tracking-wider font-bold transition-all ${filtroSaldoClientes === 'negativo' ? 'bg-rose-600 text-white shadow-md' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>Negativados</button>
                              </div>
                          </div>
                      </div>

                      <div className="max-h-[600px] overflow-y-auto pr-3 custom-scrollbar">
                          {clientesFiltrados.length === 0 ? <p className="text-zinc-500 text-sm font-medium">Vazio.</p> : (
                          <ul className="space-y-4">
                              {clientesFiltrados.slice(paginaClientes * 50, (paginaClientes + 1) * 50).map(u => (
                              <li key={u.id} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-950/50 p-4 md:p-5 rounded-2xl border border-zinc-800/50 border-l-2 border-l-purple-500 shadow-sm hover:bg-zinc-800/50 transition-colors gap-4">
                                  <div className="flex flex-col gap-1.5">
                                    <span className="text-sm font-black text-white tracking-tight">
                                        {u.nome} {u.is_admin && <span className="ml-2 text-[8px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-md uppercase tracking-wider">Admin</span>}
                                    </span>
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                                        Saldo: <strong className={`text-xs tracking-normal ml-1 ${u.saldo < 0 ? 'text-rose-400' : 'text-emerald-400'}`}>R$ {parseFloat(u.saldo).toFixed(2)}</strong>
                                    </span>
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                                        E-mail: <span className="text-zinc-300 ml-1 truncate">{u.email}</span>
                                    </span>
                                  </div>
                                  
                                  {!u.is_admin && (
                                  <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end mt-2 md:mt-0">
                                      {u.telefone && (
                                        <a 
                                          href={`whatsapp://send?phone=${u.telefone.replace(/\D/g, '').startsWith('55') ? u.telefone.replace(/\D/g, '') : '55' + u.telefone.replace(/\D/g, '')}`} 
                                          target="_blank" 
                                          rel="noopener noreferrer" 
                                          className="text-emerald-400 hover:text-white text-[10px] uppercase tracking-wider bg-emerald-900/30 hover:bg-emerald-600 px-3 py-1.5 rounded-lg font-bold transition-colors border border-emerald-500/30 flex items-center gap-1"
                                        >
                                          📱 Whats
                                        </a>
                                      )}
                                      <button onClick={() => setModalEdicaoCliente(u)} className="text-blue-400 hover:text-white text-[10px] uppercase tracking-wider bg-blue-900/30 hover:bg-blue-600 px-3 py-1.5 rounded-lg font-bold transition-colors border border-blue-500/30 flex items-center gap-1">
                                        ✏️ Editar
                                      </button>
                                      <button onClick={() => removerUsuario(u.id)} className="text-rose-400 hover:text-white text-[10px] uppercase tracking-wider bg-rose-900/30 hover:bg-rose-600 px-3 py-1.5 rounded-lg font-bold transition-colors border border-rose-500/30 flex items-center gap-1">
                                        🗑️ Excluir
                                      </button>
                                  </div>
                                  )}
                              </li>
                              ))}
                          </ul>
                          )}
                      </div>

                      <div className="mt-6 flex justify-between items-center bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80">
                          <button onClick={() => setPaginaClientes(Math.max(0, paginaClientes - 1))} disabled={paginaClientes === 0} className="px-5 py-2.5 bg-zinc-800 text-white rounded-xl disabled:opacity-50 hover:bg-zinc-700 text-[10px] uppercase tracking-wider font-bold transition-colors">◀ Anterior</button>
                          <span className="text-zinc-400 text-xs font-bold">Página {paginaClientes + 1}</span>
                          <button onClick={() => setPaginaClientes(paginaClientes + 1)} disabled={(paginaClientes + 1) * 50 >= clientesFiltrados.length} className="px-5 py-2.5 bg-zinc-800 text-white rounded-xl disabled:opacity-50 hover:bg-zinc-700 text-[10px] uppercase tracking-wider font-bold transition-colors">Próxima ▶</button>
                      </div>

                      </div>
                  </details>
              </div>
            </div>
          )}

          {usuarioLogado && (
            <a
              href={`https://wa.me/${NUMERO_WHATSAPP_SUPORTE}?text=${encodeURIComponent("Olá! Estou no site BORA JOGAR! e preciso de ajuda com a minha conta.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="fixed bottom-6 right-6 z-50 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full p-4 shadow-xl shadow-emerald-500/30 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
              title="Falar com o Suporte"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path d="M12.031 0C5.385 0 .003 5.383.003 12.029c0 2.126.554 4.195 1.606 6.012L0 24l6.115-1.595c1.745.967 3.738 1.477 5.912 1.477 6.648 0 12.03-5.383 12.03-12.028S18.679 0 12.031 0zm-1.026 22.02c-1.803 0-3.568-.485-5.116-1.401l-.367-.217-3.799.992.997-3.705-.238-.378c-.998-1.583-1.523-3.411-1.523-5.281 0-5.618 4.568-10.188 10.19-10.188 5.62 0 10.189 4.57 10.189 10.188 0 5.617-4.569 10.187-10.189 10.187zm5.589-7.616c-.306-.153-1.815-.892-2.095-.994-.28-.102-.485-.153-.689.153-.204.306-.791.994-.969 1.199-.179.204-.357.23-.663.076-.306-.153-1.295-.477-2.468-1.517-.913-.809-1.53-1.808-1.708-2.115-.179-.306-.019-.472.134-.625.138-.138.306-.357.459-.536.153-.178.204-.306.306-.51.102-.204.051-.383-.025-.536-.077-.153-.689-1.658-.944-2.27-.247-.597-.497-.515-.689-.525-.179-.01-.383-.01-.587-.01-.204 0-.536.076-.816.408-.28.332-1.071 1.046-1.071 2.551s1.097 2.96 1.25 3.163c.153.204 2.158 3.296 5.23 4.622.73.316 1.301.505 1.745.648.734.234 1.403.2 1.928.122.587-.087 1.815-.74 2.07-1.454.255-.714.255-1.326.179-1.454-.077-.127-.28-.204-.587-.357z"/>
              </svg>
            </a>
          )}

        </main>

        <footer className="bg-zinc-900 border-t border-zinc-800 pt-16 pb-8 mt-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              
              <div className="col-span-1 md:col-span-2">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tighter mb-4 block">BORA JOGAR!</span>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-8 font-medium">
                  Sua locadora de jogos digitais next-gen. Alugue os maiores lançamentos de PlayStation de forma automática, rápida e sem sair de casa.
                </p>
                <div className="flex gap-4">
                  <a href="https://www.instagram.com/locadoraborajogar/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-pink-500 hover:bg-pink-500/10 transition-all shadow-lg text-lg" title="Siga nosso Instagram">
                    📸
                  </a>
                  <a href={`https://wa.me/${NUMERO_WHATSAPP_SUPORTE}`} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-emerald-500 hover:bg-emerald-500/10 transition-all shadow-lg text-lg" title="Fale no WhatsApp">
                    💬
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-[10px]">Acesso Rápido</h4>
                <ul className="space-y-4 text-xs text-zinc-400 font-medium">
                  <li><button onClick={() => setAbaAtual('vitrine')} className="hover:text-blue-400 transition-colors">Catálogo de Jogos</button></li>
                  <li><button onClick={() => setAbaAtual('faq')} className="hover:text-purple-400 transition-colors">Como Funciona (FAQ)</button></li>
                  <li><button onClick={() => setAbaAtual('termos')} className="hover:text-white transition-colors">Termos de Uso</button></li>
                  <li><button onClick={() => setAbaAtual('privacidade')} className="hover:text-white transition-colors">Política de Privacidade</button></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-6 tracking-wider uppercase text-[10px]">Segurança</h4>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80 shadow-inner">
                    <span className="text-2xl drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">🔒</span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Certificado SSL</span>
                      <span className="text-xs text-zinc-300 font-bold">Site Seguro 256-bits</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 bg-zinc-950 p-4 rounded-2xl border border-zinc-800/80 shadow-inner">
                    <span className="text-2xl drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">⚡</span>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Gateway Oficial</span>
                      <span className="text-xs text-zinc-300 font-bold">Powered by Asaas</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-zinc-800/50 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-500 font-bold tracking-wide uppercase">
              <p>© 2026 Locadora Bora Jogar. Todos os direitos reservados.</p>
              <p>CNPJ: 51.666.811/0001-67 • Curitiba, PR</p> 
            </div>
          </div>
        </footer>

      </>
      )}
    </div>
  )
}

export default App