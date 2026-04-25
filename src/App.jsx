// ==============================================================================
// BORA JOGAR! - FRONTEND (React)
// ==============================================================================
// Ambiente de Staging ativado com sucesso!

import { useState, useEffect } from 'react';

function App() {
  const NUMERO_WHATSAPP_SUPORTE = '5541995948532';
  const JOGOS_POR_PAGINA = 12;

  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const usuarioSalvo = localStorage.getItem('usuario_locadora');
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null;
  });

  const [abaAtual, setAbaAtual] = useState('vitrine');
  const [modoLogin, setModoLogin] = useState(true);
  const [toast, setToast] = useState({
    visivel: false,
    mensagem: '',
    tipo: 'sucesso',
  });
  const [modalConfirmacao, setModalConfirmacao] = useState({
    visivel: false,
    tipo: '',
    jogoId: null,
    jogoTitulo: '',
    preco7: 0,
    preco14: 0,
    diasEscolhidos: 7,
  });
  const [modalDescricao, setModalDescricao] = useState(null);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);

  const [formEmail, setFormEmail] = useState('');
  const [formSenha, setFormSenha] = useState('');
  const [cadNome, setCadNome] = useState('');
  const [cadEmail, setCadEmail] = useState('');
  const [cadSenha, setCadSenha] = useState('');
  const [cadTelefone, setCadTelefone] = useState('');
  const [cadCodigoConvite, setCadCodigoConvite] = useState('');

  const [cadSenhaConfirmacao, setCadSenhaConfirmacao] = useState('');
  const [mudarSenhaNovaConfirmacao, setMudarSenhaNovaConfirmacao] = useState('');

  const [verSenhaLogin, setVerSenhaLogin] = useState(false);
  const [verSenhaCad, setVerSenhaCad] = useState(false);
  const [verSenhaCadConf, setVerSenhaCadConf] = useState(false);
  const [verSenhaAtual, setVerSenhaAtual] = useState(false);
  const [verSenhaNova, setVerSenhaNova] = useState(false);
  const [verSenhaNovaConf, setVerSenhaNovaConf] = useState(false);

  const [modoEsqueciSenha, setModoEsqueciSenha] = useState(false);
  const [esqueciEmail, setEsqueciEmail] = useState('');
  const [mudarSenhaAtual, setMudarSenhaAtual] = useState('');
  const [mudarSenhaNova, setMudarSenhaNova] = useState('');

  const [jogos, setJogos] = useState([]);
  const [carregandoJogos, setCarregandoJogos] = useState(true);
  const [meusAlugueis, setMeusAlugueis] = useState([]);
  const [minhasReservas, setMinhasReservas] = useState([]);
  const [extrato, setExtrato] = useState([]);
  const [notificacoes, setNotificacoes] = useState([]);

  const [enqueteOpcoes, setEnqueteOpcoes] = useState([]);
  const [meuVoto, setMeuVoto] = useState(null);
  const [novaOpcaoEnqueteTitulo, setNovaOpcaoEnqueteTitulo] = useState('');
  const [novaOpcaoEnqueteImagem, setNovaOpcaoEnqueteImagem] = useState('');

  const [configSistema, setConfigSistema] = useState({
    devolucao_dinamica: false,
    valor_por_dia: 2.0,
    anuncio_ativo: false,
    mensagem_anuncio: '',
  });
  const [estatisticasAdmin, setEstatisticasAdmin] = useState({
    faturamento: 0,
    total_clientes: 0,
    locacoes_ativas: 0,
  });
  const [contasManutencao, setContasManutencao] = useState([]);
  const [novasSenhasTemp, setNovasSenhasTemp] = useState({});
  const [codigosGerados2FA, setCodigosGerados2FA] = useState({});

  const [novoJogoTitulo, setNovoJogoTitulo] = useState('');
  const [novoJogoPlataforma, setNovoJogoPlataforma] = useState('PS5');
  const [novoJogoPreco, setNovoJogoPreco] = useState('');
  const [novoJogoPreco14, setNovoJogoPreco14] = useState('');
  const [novoJogoDescricao, setNovoJogoDescricao] = useState('');
  const [novoJogoImagem, setNovoJogoImagem] = useState('');
  const [novoJogoTempo, setNovoJogoTempo] = useState('');
  const [novoJogoNota, setNovoJogoNota] = useState('');
  const [novoJogoDataLancamento, setNovoJogoDataLancamento] = useState('');

  const [novaContaJogoId, setNovaContaJogoId] = useState('');
  const [novaContaEmail, setNovaContaEmail] = useState('');
  const [novaContaSenha, setNovaContaSenha] = useState('');
  const [novaContaMfaSecret, setNovaContaMfaSecret] = useState('');

  const [paginaCatalogo, setPaginaCatalogo] = useState(0);
  const [paginaClientes, setPaginaClientes] = useState(0);

  const [indiceBanner, setIndiceBanner] = useState(0);

  const [modalEdicaoJogo, setModalEdicaoJogo] = useState(null);
  const [modalEdicaoCliente, setModalEdicaoCliente] = useState(null);

  const [termoBusca, setTermoBusca] = useState('');
  const [buscaEstoque, setBuscaEstoque] = useState('');
  const [buscaLocacao, setBuscaLocacao] = useState('');
  const [buscaCliente, setBuscaCliente] = useState('');
  const [ordenacaoClientes, setOrdenacaoClientes] = useState('recentes');
  const [filtroSaldoClientes, setFiltroSaldoClientes] = useState('todos');

  const [buscaManutencao, setBuscaManutencao] = useState('');
  const [ordenacaoLocacoes, setOrdenacaoLocacoes] = useState('expira_breve');
  const [ordenacaoManutencao, setOrdenacaoManutencao] = useState('urgente');
  const [todasReservas, setTodasReservas] = useState([]);
  const [buscaReservaAdmin, setBuscaReservaAdmin] = useState('');
  const [ordenacaoReservaAdmin, setOrdenacaoReservaAdmin] = useState('antigas');

  const [todasLocacoes, setTodasLocacoes] = useState([]);
  const [todosUsuarios, setTodosUsuarios] = useState([]);

  const [valorRecarga, setValorRecarga] = useState('30');
  const [cupomRecarga, setCupomRecarga] = useState('');
  const [cpfRecarga, setCpfRecarga] = useState('');
  const [listaCupons, setListaCupons] = useState([]);
  const [novoCupomCodigo, setNovoCupomCodigo] = useState('');
  const [novoCupomTipo, setNovoCupomTipo] = useState('PORCENTAGEM');
  const [novoCupomValor, setNovoCupomValor] = useState('');

  const [filtroStatusCatalogo, setFiltroStatusCatalogo] = useState('todos');
  const [periodoFiltroEstatisticas, setPeriodoFiltroEstatisticas] = useState('mes');

  const [pixPendente, setPixPendente] = useState(null);

  const [paginaAtual, setPaginaAtual] = useState(1);
  const [filtroPlataforma, setFiltroPlataforma] = useState('TODAS');
  const [filtroDisponibilidade, setFiltroDisponibilidade] = useState('TODOS');

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token_locadora');
    return {
      'Content-Type': 'application/json',
      Authorization: token ? `Bearer ${token}` : '',
    };
  };

  const mostrarToast = (mensagem, tipo = 'sucesso') => {
    setToast({ visivel: true, mensagem, tipo });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visivel: false }));
    }, 3500);
  };

  const solicitarGeracaoPix = (e) => {
    e.preventDefault();
    const valorReal = parseFloat(valorRecarga);
    if (isNaN(valorReal) || valorReal < 30) {
      mostrarToast('O valor mínimo para recarga é de R$ 30,00', 'erro');
      return;
    }

    const cpfLimpo = cpfRecarga.replace(/\D/g, '');
    if (cpfLimpo.length !== 11) {
      mostrarToast('Por favor, digite um CPF válido com 11 números.', 'erro');
      return;
    }

    mostrarToast('Gerando código PIX seguro...', 'aviso');

    fetch('https://borajogar-api.onrender.com/recarga/gerar-pix', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        utilizador_id: usuarioLogado.id,
        valor: valorReal,
        cupom: cupomRecarga,
        cpf: cpfLimpo,
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        setPixPendente({
          payment_id: data.payment_id,
          qr_code: data.qr_code,
          copia_cola: data.copia_cola,
        });
      } else {
        mostrarToast(data.detail, 'erro');
      }
    });
  };

  useEffect(() => {
    let intervalId;
    if (pixPendente) {
      intervalId = setInterval(() => {
        fetch(`https://borajogar-api.onrender.com/recarga/status/${pixPendente.payment_id}`)
          .then((res) => res.json())
          .then((data) => {
            if (data.status === 'PAGO') {
              mostrarToast('✅ Pagamento Confirmado! Saldo liberado.', 'sucesso');

              if (window.fbq) {
                window.fbq('track', 'Purchase', {
                  value: parseFloat(valorRecarga),
                  currency: 'BRL',
                });
              }

              if (typeof window.gtag === 'function') {
                window.gtag('event', 'conversion', {
                  send_to: 'AW-18093761831/3yJqCMGM9pwcEKfK47ND',
                  value: parseFloat(valorRecarga),
                  currency: 'BRL',
                  transaction_id: pixPendente.payment_id,
                });
              }

              setPixPendente(null);
              setCupomRecarga('');
              setValorRecarga('30');
              carregarDados();
            }
          })
          .catch(() => console.log('Aguardando verificação...'));
      }, 5000);
    }
    return () => clearInterval(intervalId);
  }, [pixPendente]);

  useEffect(() => {
    const urls = configSistema.banners_url
      ? configSistema.banners_url
          .split(',')
          .map((u) => u.trim())
          .filter((u) => u)
      : [];
    if (urls.length <= 1) return;

    const intervalo = setInterval(() => {
      setIndiceBanner((prev) => (prev + 1) % urls.length);
    }, 8000);

    return () => clearInterval(intervalo);
  }, [configSistema.banners_url]);

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

  const alterarMinhaSenha = (e) => {
    e.preventDefault();

    if (mudarSenhaNova !== mudarSenhaNovaConfirmacao) {
      mostrarToast('A nova senha e a confirmação não coincidem.', 'erro');
      return;
    }

    const regexSenha = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regexSenha.test(mudarSenhaNova)) {
      mostrarToast(
        'A nova senha deve ter no mínimo 8 caracteres, 1 letra maiúscula, 1 número e 1 caractere especial (Ex: @, #, !).',
        'erro',
      );
      return;
    }

    fetch('https://borajogar-api.onrender.com/mudar-senha', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        utilizador_id: usuarioLogado.id,
        senha_atual: mudarSenhaAtual,
        nova_senha: mudarSenhaNova,
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          mostrarToast(data.mensagem, 'sucesso');
          setMudarSenhaAtual('');
          setMudarSenhaNova('');
          setMudarSenhaNovaConfirmacao('');
        } else {
          mostrarToast(data.detail, 'erro');
        }
      })
      .catch(() => mostrarToast('Erro de conexão.', 'erro'));
  };

  const abrirConfirmacao = (
    tipo,
    jogoId,
    jogoTitulo,
    preco7,
    preco14,
    diasEscolhidosInicial = 7,
  ) => {
    if (!usuarioLogado) {
      mostrarToast('Faça login ou crie uma conta grátis para alugar jogos!', 'aviso');
      setModoLogin(true);
      setModoEsqueciSenha(false);
      setAbaAtual('login');
      window.scrollTo(0, 0);
      return;
    }

    const precoAlvo = diasEscolhidosInicial === 14 ? preco14 : preco7;
    if (usuarioLogado.saldo < precoAlvo) {
      mostrarToast(
        `Saldo insuficiente para ${diasEscolhidosInicial} dias!\nColoque créditos em "Meus Acessos"!`,
        'erro',
      );
      return;
    }
    if (usuarioLogado.saldo < 0) {
      mostrarToast(`Você está negativado!`, 'erro');
      return;
    }
    setModalConfirmacao({
      visivel: true,
      tipo,
      jogoId,
      jogoTitulo,
      preco7,
      preco14,
      diasEscolhidos: diasEscolhidosInicial,
    });
  };

  const confirmarTransacao = () => {
    const precoFinal =
      modalConfirmacao.diasEscolhidos === 7 ? modalConfirmacao.preco7 : modalConfirmacao.preco14;

    if (usuarioLogado.saldo < precoFinal) {
      mostrarToast('Saldo insuficiente para esta opção de dias!', 'erro');
      return;
    }

    if (modalConfirmacao.tipo === 'aluguel') {
      executarAluguel(modalConfirmacao.jogoId, precoFinal, modalConfirmacao.diasEscolhidos);
    } else {
      executarReserva(modalConfirmacao.jogoId, precoFinal, modalConfirmacao.diasEscolhidos);
    }

    setModalConfirmacao({
      visivel: false,
      tipo: '',
      jogoId: null,
      jogoTitulo: '',
      preco7: 0,
      preco14: 0,
      diasEscolhidos: 7,
    });
  };

  const executarAluguel = (jogoId, precoJogo, dias) => {
    fetch('https://borajogar-api.onrender.com/locacoes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        utilizador_id: usuarioLogado.id,
        jogo_id: jogoId,
        dias_aluguel: dias,
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        mostrarToast(data.mensagem, 'sucesso');
        setUsuarioLogado({
          ...usuarioLogado,
          saldo: usuarioLogado.saldo - precoJogo,
        });
        carregarDados();
      } else {
        mostrarToast(data.detail, 'erro');
      }
    });
  };

  const executarReserva = (jogoId, precoJogo, dias) => {
    fetch('https://borajogar-api.onrender.com/reservas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        utilizador_id: usuarioLogado.id,
        jogo_id: jogoId,
        dias_aluguel: dias,
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        mostrarToast(data.mensagem, 'sucesso');
        setUsuarioLogado({
          ...usuarioLogado,
          saldo: usuarioLogado.saldo - precoJogo,
        });
        carregarDados();
      } else {
        mostrarToast(data.detail, 'erro');
      }
    });
  };

  const devolverAntecipado = (locacaoId, dataFim) => {
    const horasRestantes = (new Date(dataFim) - new Date()) / (1000 * 60 * 60);
    const diasRestantes = Math.floor(horasRestantes / 24);
    let msg = 'Atenção: Tem certeza que deseja devolver este jogo agora e encerrar seu acesso?';
    if (diasRestantes > 0) {
      msg += `\n\n🎁 Você receberá um cashback de R$ ${(diasRestantes * configSistema.valor_por_dia).toFixed(2)} direto na sua carteira assim que o Admin verificar sua conta!`;
    } else {
      msg += '\n\n⚠️ Faltam menos de 24h para o fim do prazo, não haverá cashback.';
    }
    if (window.confirm(msg)) {
      fetch('https://borajogar-api.onrender.com/devolver', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          locacao_id: locacaoId,
          utilizador_id: usuarioLogado.id,
        }),
      }).then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          mostrarToast(data.mensagem, 'sucesso');
          carregarDados();
        } else {
          mostrarToast(data.detail, 'erro');
        }
      });
    }
  };

  const gerarCodigo2FA = async (locacaoId) => {
    try {
      const res = await fetch(
        `https://borajogar-api.onrender.com/gerar-2fa/${locacaoId}/${usuarioLogado.id}`,
      );
      const data = await res.json();
      if (res.ok) {
        setCodigosGerados2FA((prev) => ({ ...prev, [locacaoId]: data.codigo }));
        mostrarToast('Código gerado! Digite rápido.', 'aviso');
        setTimeout(() => {
          setCodigosGerados2FA((prev) => {
            const novo = { ...prev };
            delete novo[locacaoId];
            return novo;
          });
        }, 30000);
      } else {
        mostrarToast(data.detail, 'erro');
      }
    } catch (e) {
      mostrarToast('Erro de conexão.', 'erro');
    }
  };

  const buscarDadosDoJogo = async () => {
    if (!novoJogoTitulo) {
      mostrarToast('Digite o título para buscar!', 'aviso');
      return;
    }
    const RAWG_API_KEY = '8638e63fc8cf45459e0fb1cf9db3de42';
    try {
      mostrarToast('Procurando jogo no banco de dados...', 'aviso');
      const resBusca = await fetch(
        `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(novoJogoTitulo)}&page_size=1`,
      );
      const dadosBusca = await resBusca.json();
      if (dadosBusca.results && dadosBusca.results.length > 0) {
        const jogoEncontrado = dadosBusca.results[0];
        setNovoJogoImagem(jogoEncontrado.background_image || '');

        if (jogoEncontrado.released) {
          setNovoJogoDataLancamento(jogoEncontrado.released);
        }

        const resDetalhes = await fetch(
          `https://api.rawg.io/api/games/${jogoEncontrado.id}?key=${RAWG_API_KEY}`,
        );
        const dadosDetalhes = await resDetalhes.json();
        if (dadosDetalhes.playtime) setNovoJogoTempo(`${dadosDetalhes.playtime}h`);
        else setNovoJogoTempo('');
        if (dadosDetalhes.rating) setNovoJogoNota(dadosDetalhes.rating);
        else setNovoJogoNota('0');

        if (dadosDetalhes.description_raw) {
          const descricaoIngles = dadosDetalhes.description_raw;
          try {
            const urlTradutor = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(descricaoIngles)}`;
            const resTraducao = await fetch(urlTradutor);
            const dadosTraducao = await resTraducao.json();
            const descricaoPortugues = dadosTraducao[0].map((item) => item[0]).join('');
            setNovoJogoDescricao(descricaoPortugues);
          } catch (erroTraducao) {
            setNovoJogoDescricao(descricaoIngles);
            mostrarToast('Capa importada.', 'aviso');
            return;
          }
        }
        mostrarToast(`Dados importados com sucesso!`, 'sucesso');
      } else {
        mostrarToast('Jogo não encontrado.', 'erro');
      }
    } catch (erro) {
      mostrarToast('Erro ao conectar com RAWG.', 'erro');
    }
  };

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

        if (window.fbq) {
          window.fbq('track', 'CompleteRegistration');
        }

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
      } else {
        mostrarToast(data.detail, 'erro');
      }
    });
  };

  const sair = () => {
    setUsuarioLogado(null);
    setAbaAtual('vitrine');
    localStorage.removeItem('usuario_locadora');
    localStorage.removeItem('token_locadora');
  };

  const votarEnquete = (opcaoId) => {
    if (!usuarioLogado) {
      mostrarToast('Você precisa criar uma conta grátis ou fazer login para votar!', 'aviso');
      setModoLogin(false);
      setModoEsqueciSenha(false);
      setAbaAtual('login');
      window.scrollTo(0, 0);
      return;
    }
    fetch('https://borajogar-api.onrender.com/enquete/votar', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        utilizador_id: usuarioLogado.id,
        opcao_id: opcaoId,
      }),
    }).then(async (res) => {
      if (res.ok) {
        mostrarToast('Voto registrado com sucesso! Obrigado.', 'sucesso');
        setMeuVoto(opcaoId);
        carregarDados();
      } else {
        const data = await res.json();
        mostrarToast(data.detail, 'erro');
      }
    });
  };

  const adicionarOpcaoEnquete = (e) => {
    e.preventDefault();
    fetch('https://borajogar-api.onrender.com/admin/enquete', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        titulo: novaOpcaoEnqueteTitulo,
        url_imagem: novaOpcaoEnqueteImagem,
      }),
    }).then((res) => {
      if (res.ok) {
        mostrarToast('Opção adicionada à enquete!', 'sucesso');
        setNovaOpcaoEnqueteTitulo('');
        setNovaOpcaoEnqueteImagem('');
        carregarDados();
      } else {
        mostrarToast('Erro ao adicionar.', 'erro');
      }
    });
  };

  const removerOpcaoEnquete = (id) => {
    if (window.confirm('Remover esta opção da enquete?')) {
      fetch(`https://borajogar-api.onrender.com/admin/enquete/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }).then((res) => {
        if (res.ok) carregarDados();
      });
    }
  };

  const limparEnquete = () => {
    if (
      window.confirm(
        'ATENÇÃO: Isso apagará TODOS os jogos da enquete e zerará TODOS os votos. Tem certeza?',
      )
    ) {
      fetch('https://borajogar-api.onrender.com/admin/enquete', {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }).then((res) => {
        if (res.ok) carregarDados();
      });
    }
  };

  const carregarDados = () => {
    // 1. Vitrine em tempo real (Sem cache)
    fetch('https://borajogar-api.onrender.com/jogos', { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) {
          const erroText = await res.text();
          mostrarToast(`⚠️ Erro no Servidor: ${erroText}`, 'erro');
          return [];
        }
        return res.json();
      })
      .then((dados) => {
        setJogos(Array.isArray(dados) ? dados : []);
        setCarregandoJogos(false);
      })
      .catch((err) => {
        mostrarToast('Servidor conectando ou sem internet. Dê um F5.', 'aviso');
        setCarregandoJogos(false);
      });

    // 2. Configurações em tempo real (Sem cache)
    fetch('https://borajogar-api.onrender.com/configuracoes', { cache: 'no-store' })
      .then((res) => (res.ok ? res.json() : {}))
      .then((dados) => setConfigSistema(dados));

    let urlEnquete = 'https://borajogar-api.onrender.com/enquete';
    if (usuarioLogado && usuarioLogado.id) urlEnquete += `?usuario_id=${usuarioLogado.id}`;
    fetch(urlEnquete)
      .then((res) => (res.ok ? res.json() : { opcoes: [] }))
      .then((dados) => {
        setEnqueteOpcoes(dados.opcoes || []);
        if (dados.voto_usuario) setMeuVoto(dados.voto_usuario);
      });

    if (!usuarioLogado) return;

    if (usuarioLogado.is_admin) {
      fetch('https://borajogar-api.onrender.com/admin/locacoes', {
        headers: getAuthHeaders(),
      })
        .then((res) => (res.ok ? res.json() : []))
        .then((dados) => setTodasLocacoes(Array.isArray(dados) ? dados : []));
      fetch('https://borajogar-api.onrender.com/admin/reservas', {
        headers: getAuthHeaders(),
      })
        .then((res) => (res.ok ? res.json() : []))
        .then((dados) => setTodasReservas(Array.isArray(dados) ? dados : []));
      fetch(
        `https://borajogar-api.onrender.com/admin/estatisticas?periodo=${periodoFiltroEstatisticas}`,
        { headers: getAuthHeaders() },
      )
        .then((res) =>
          res.ok ? res.json() : { faturamento: 0, total_clientes: 0, locacoes_ativas: 0 },
        )
        .then((dados) => setEstatisticasAdmin(dados));
      fetch('https://borajogar-api.onrender.com/usuarios', {
        headers: getAuthHeaders(),
      })
        .then((res) => (res.ok ? res.json() : []))
        .then((dados) => setTodosUsuarios(Array.isArray(dados) ? dados : []));
      fetch('https://borajogar-api.onrender.com/admin/manutencao', {
        headers: getAuthHeaders(),
      })
        .then((res) => (res.ok ? res.json() : []))
        .then((dados) => setContasManutencao(Array.isArray(dados) ? dados : []));
      fetch('https://borajogar-api.onrender.com/admin/cupons', {
        headers: getAuthHeaders(),
      })
        .then((res) => (res.ok ? res.json() : []))
        .then((dados) => setListaCupons(Array.isArray(dados) ? dados : []));
    }

    fetch(`https://borajogar-api.onrender.com/meus-alugueis/${usuarioLogado.id}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((dados) => setMeusAlugueis(Array.isArray(dados) ? dados : []));
    fetch(`https://borajogar-api.onrender.com/minhas-reservas/${usuarioLogado.id}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((dados) => setMinhasReservas(Array.isArray(dados) ? dados : []));
    fetch(`https://borajogar-api.onrender.com/extrato/${usuarioLogado.id}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((dados) => setExtrato(Array.isArray(dados) ? dados : []));
    fetch(`https://borajogar-api.onrender.com/notificacoes/${usuarioLogado.id}`)
      .then((res) => (res.ok ? res.json() : []))
      .then((dados) => setNotificacoes(Array.isArray(dados) ? dados : []));

    fetch(`https://borajogar-api.onrender.com/usuarios/${usuarioLogado.id}/saldo`)
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data && data.saldo !== undefined) {
          const saldoReal = parseFloat(data.saldo);
          setUsuarioLogado((prev) => ({ ...prev, saldo: saldoReal }));

          const userStorage = JSON.parse(localStorage.getItem('usuarioBoraJogar'));
          if (userStorage) {
            userStorage.saldo = saldoReal;
            localStorage.setItem('usuarioBoraJogar', JSON.stringify(userStorage));
          }
        }
      })
      .catch((err) => console.log('Aguardando backend...'));
  };

  const manterReserva = (notificacaoId) => {
    fetch('https://borajogar-api.onrender.com/notificacoes/ler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notificacao_id: notificacaoId }),
    }).then(() => {
      mostrarToast('Perfeito! Acompanhe a nova data em Minhas Reservas.', 'sucesso');
      carregarDados();
    });
  };

  const cancelarReservaComEstorno = (reservaId, notificacaoId) => {
    if (
      !window.confirm(
        'Tem certeza que deseja cancelar esta reserva e receber o crédito de volta na carteira?',
      )
    )
      return;
    fetch('https://borajogar-api.onrender.com/reservas/cancelar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        reserva_id: reservaId,
        utilizador_id: usuarioLogado.id,
        notificacao_id: notificacaoId,
      }),
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        mostrarToast(data.mensagem, 'sucesso');
        carregarDados();
      } else {
        mostrarToast(data.detail, 'erro');
      }
    });
  };

  useEffect(() => {
    carregarDados();
  }, [usuarioLogado?.id]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [abaAtual, paginaAtual]);

  const salvarConfiguracoesDireto = (novaConfig, msgSucesso) => {
    fetch('https://borajogar-api.onrender.com/admin/configuracoes', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(novaConfig),
    }).then((res) => {
      if (res.ok) {
        mostrarToast(msgSucesso, 'sucesso');
      } else {
        mostrarToast('Erro ao salvar.', 'erro');
      }
    });
  };

  const toggleAnuncio = () => {
    const novaConfig = {
      ...configSistema,
      anuncio_ativo: !configSistema.anuncio_ativo,
    };
    setConfigSistema(novaConfig);
    salvarConfiguracoesDireto(
      novaConfig,
      novaConfig.anuncio_ativo ? '✅ Banner Ligado!' : '❌ Banner Desligado!',
    );
  };

  const salvarConfiguracoesGlobais = () => {
    salvarConfiguracoesDireto(configSistema, '💾 Texto do Anúncio Salvo!');
  };

  const cadastrarJogo = (e) => {
    e.preventDefault();
    fetch('https://borajogar-api.onrender.com/jogos', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        titulo: novoJogoTitulo,
        plataforma: novoJogoPlataforma,
        preco_aluguel: parseFloat(novoJogoPreco),
        preco_aluguel_14: parseFloat(novoJogoPreco14) || 0.0,
        descricao: novoJogoDescricao,
        url_imagem: novoJogoImagem,
        tempo_jogo: novoJogoTempo,
        nota: parseFloat(novoJogoNota) || 0,
        data_lancamento: novoJogoDataLancamento || null,
      }),
    }).then((res) => {
      if (res.ok) {
        mostrarToast('Jogo cadastrado!', 'sucesso');
        carregarDados();
        setNovoJogoTitulo('');
        setNovoJogoPreco('');
        setNovoJogoPreco14('');
        setNovoJogoDescricao('');
        setNovoJogoImagem('');
        setNovoJogoTempo('');
        setNovoJogoNota('');
        setNovoJogoDataLancamento('');
      } else {
        mostrarToast('Erro ao cadastrar.', 'erro');
      }
    });
  };

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
        data_lancamento: modalEdicaoJogo.data_lancamento || null,
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          mostrarToast('Jogo atualizado com sucesso!', 'sucesso');
          setModalEdicaoJogo(null);
          carregarDados();
        } else {
          const data = await res.json();
          mostrarToast(data.detail || 'Erro ao atualizar jogo.', 'erro');
        }
      })
      .catch(() => mostrarToast('Erro de conexão.', 'erro'));
  };

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
        motivo_ajuste: modalEdicaoCliente.motivo_ajuste || 'Ajuste Administrativo',
      }),
    })
      .then(async (res) => {
        if (res.ok) {
          mostrarToast('Cliente atualizado com sucesso!', 'sucesso');
          setModalEdicaoCliente(null);
          carregarDados();
        } else {
          const data = await res.json();
          mostrarToast(data.detail || 'Erro ao atualizar cliente.', 'erro');
        }
      })
      .catch(() => mostrarToast('Erro de conexão.', 'erro'));
  };

  const cadastrarConta = (e) => {
    e.preventDefault();
    fetch('https://borajogar-api.onrender.com/contas', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        jogo_id: parseInt(novaContaJogoId),
        email_login: novaContaEmail,
        senha_login: novaContaSenha,
        mfa_secret: novaContaMfaSecret,
      }),
    }).then(async (res) => {
      if (res.ok) {
        mostrarToast('Conta adicionada ao estoque!', 'sucesso');
        setNovaContaEmail('');
        setNovaContaSenha('');
        setNovaContaMfaSecret('');
        carregarDados();
      } else {
        const data = await res.json();
        mostrarToast(data.detail, 'erro');
      }
    });
  };

  const cadastrarCupom = (e) => {
    e.preventDefault();
    fetch('https://borajogar-api.onrender.com/admin/cupons', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        codigo: novoCupomCodigo,
        tipo: novoCupomTipo,
        valor: parseFloat(novoCupomValor),
      }),
    }).then(async (res) => {
      if (res.ok) {
        mostrarToast('Cupom criado!', 'sucesso');
        setNovoCupomCodigo('');
        setNovoCupomValor('');
        carregarDados();
      } else {
        const data = await res.json();
        mostrarToast(data.detail, 'erro');
      }
    });
  };

  const removerCupom = (id) => {
    if (window.confirm('Apagar este cupom?'))
      fetch(`https://borajogar-api.onrender.com/admin/cupons/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }).then((res) => {
        if (res.ok) carregarDados();
      });
  };
  const removerJogo = (id) => {
    if (window.confirm('Apagar este jogo?'))
      fetch(`https://borajogar-api.onrender.com/jogos/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }).then((res) => {
        if (res.ok) {
          carregarDados();
          mostrarToast('Jogo removido.', 'sucesso');
        }
      });
  };
  const removerUsuario = (id) => {
    if (window.confirm('Remover cliente?'))
      fetch(`https://borajogar-api.onrender.com/usuarios/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      }).then((res) => {
        if (res.ok) {
          carregarDados();
          mostrarToast('Cliente removido.', 'sucesso');
        }
      });
  };

  const confirmarResetSenha = (contaId) => {
    const senha = novasSenhasTemp[contaId];
    if (!senha) {
      mostrarToast('Digite a nova senha antes de liberar a conta!', 'aviso');
      return;
    }
    fetch('https://borajogar-api.onrender.com/admin/reset-senha', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({ conta_psn_id: contaId, nova_senha: senha }),
    }).then(async (res) => {
      const data = await res.json();
      if (res.ok) {
        mostrarToast(data.mensagem, 'sucesso');
        carregarDados();
      } else {
        mostrarToast(data.detail, 'erro');
      }
    });
  };

  const aplicarMultaCliente = (idUsuario, nomeUsuario) => {
    if (!idUsuario) return;
    if (
      window.confirm(
        `Deseja aplicar uma multa de R$ 50,00 em ${nomeUsuario} por não desativar o console? O saldo dele ficará negativo e o cashback será cancelado.`,
      )
    ) {
      fetch('https://borajogar-api.onrender.com/admin/multar', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ utilizador_id: idUsuario, valor: 50.0 }),
      }).then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          mostrarToast(`Multa aplicada em ${nomeUsuario}.`, 'sucesso');
          carregarDados();
        } else {
          mostrarToast(data.detail, 'erro');
        }
      });
    }
  };

  const revogarLocacao = (locacaoId) => {
    if (
      window.confirm(
        '🚨 ATENÇÃO: Tem certeza que deseja REVOGAR este aluguel imediatamente? A conta irá para a tela de Manutenção para você trocar a senha.',
      )
    ) {
      fetch(`https://borajogar-api.onrender.com/admin/locacoes/${locacaoId}/revogar`, {
        method: 'POST',
        headers: getAuthHeaders(),
      })
        .then(async (res) => {
          const data = await res.json();
          if (res.ok) {
            mostrarToast(data.mensagem, 'sucesso');
            carregarDados();
          } else {
            mostrarToast(data.detail, 'erro');
          }
        })
        .catch(() => mostrarToast('Erro de conexão.', 'erro'));
    }
  };

  const cobrarNoWhatsApp = (nome, telefone, jogo) => {
    if (!telefone) return;
    let numeroLimpo = telefone.replace(/\D/g, '');
    if (!numeroLimpo.startsWith('55')) numeroLimpo = '55' + numeroLimpo;
    const mensagem = `Olá, ${nome}! Aqui é da locadora *BORA JOGAR!* 🎮\n\nSeu tempo com o jogo *${jogo}* terminou, mas notamos que a conta ainda está ativada como "Principal" no seu console.\n\n⚠️ Concedemos um *prazo de tolerância de 1 hora* para você entrar na conta e desativar. Caso não seja feito, o sistema aplicará uma multa automática de R$ 50,00 e sua carteira será bloqueada.\n\nComo fazer a desativação:\n\nNo PS5: Vá em Configurações > Usuários e Contas > Outros > Compartilhamento do console e jogo offline e desative.\n\nNo PS4: Vá em Configurações > Gerenciamento da conta > Ativar como seu PS4 principal e desative.\n\nMe avise aqui assim que desativar!`;
    const url = `https://wa.me/${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const avisarLiberacao = (nomeCliente, jogoNome) => {
    const clienteObj = todosUsuarios.find((u) => u.nome === nomeCliente);
    if (!clienteObj || !clienteObj.telefone) {
      mostrarToast('Telefone do cliente não encontrado.', 'erro');
      return;
    }
    let numeroLimpo = clienteObj.telefone.replace(/\D/g, '');
    if (!numeroLimpo.startsWith('55')) numeroLimpo = '55' + numeroLimpo;
    const mensagem = `Fala, ${nomeCliente}! A sua vez na fila chegou e o seu acesso para o jogo *${jogoNome}* já está liberado! 🎮\n\nAcesse seu painel na locadora (aba Meus Acessos) para pegar o e-mail, a senha e gerar o código de acesso.\n\nBora Jogar! 🚀`;
    window.open(`https://wa.me/${numeroLimpo}?text=${encodeURIComponent(mensagem)}`, '_blank');
  };

  const lidarComFiltroPlataforma = (plat) => {
    setFiltroPlataforma(plat);
    setPaginaAtual(1);
  };
  const lidarComFiltroDisp = (disp) => {
    setFiltroDisponibilidade(disp);
    setPaginaAtual(1);
  };
  const lidarComBusca = (e) => {
    setTermoBusca(e.target.value);
    setPaginaAtual(1);
  };

  const hojeGlobal = new Date();
  hojeGlobal.setHours(0, 0, 0, 0);

  // 1. O React apenas filtra (busca, plataforma, disponibilidade),
  // mas MANTÉM a ordem perfeita que veio do Backend.
  const filtradosBase = jogos
    .filter((jogo) => jogo.titulo.toLowerCase().includes(termoBusca.toLowerCase()))
    .filter((jogo) => {
      if (filtroPlataforma === 'TODAS') return true;
      if (filtroPlataforma === 'PS5')
        return jogo.plataforma === 'PS5' || jogo.plataforma === 'PS4/PS5';
      if (filtroPlataforma === 'PS4/PS5') return jogo.plataforma === 'PS4/PS5';
      return jogo.plataforma === filtroPlataforma;
    })
    .filter((jogo) => {
      if (filtroDisponibilidade === 'TODOS') return true;
      if (filtroDisponibilidade === 'DISPONIVEL') {
        // Se for Pré-venda (prioridade 1), sempre mostra
        if (jogo.prioridade_vitrine === 1) return true;
        // Se não, só mostra se tiver estoque
        return jogo.estoque > 0;
      }
      return true;
    });

  // 2. Como o array já está ordenado, basta fatiar para a paginação! Adeus código complexo!
  const totalPaginas = Math.ceil(filtradosBase.length / JOGOS_POR_PAGINA);
  const indiceUltimoJogo = paginaAtual * JOGOS_POR_PAGINA;
  const indicePrimeiroJogo = indiceUltimoJogo - JOGOS_POR_PAGINA;

  const jogosDaPagina = filtradosBase.slice(indicePrimeiroJogo, indiceUltimoJogo);
  const jogosFiltrados = filtradosBase; // Usado para o contador de "Mostrando X jogos"

  const jogosEstoqueFiltrados = jogos.filter((jogo) =>
    jogo.titulo.toLowerCase().includes(buscaEstoque.toLowerCase()),
  );

  const locacoesAtivasFiltradas = todasLocacoes
    .filter((loc) => loc.status === 'ATIVA')
    .filter(
      (loc) =>
        loc.jogo.toLowerCase().includes(buscaLocacao.toLowerCase()) ||
        loc.cliente.toLowerCase().includes(buscaLocacao.toLowerCase()),
    )
    .sort((a, b) => {
      if (ordenacaoLocacoes === 'expira_breve') return new Date(a.data_fim) - new Date(b.data_fim);
      if (ordenacaoLocacoes === 'expira_longe') return new Date(b.data_fim) - new Date(a.data_fim);
      if (ordenacaoLocacoes === 'az_cliente') return a.cliente.localeCompare(b.cliente);
      if (ordenacaoLocacoes === 'az_jogo') return a.jogo.localeCompare(b.jogo);
      return 0;
    });

  const reservasAdminFiltradas = todasReservas
    .filter(
      (res) =>
        res.jogo.toLowerCase().includes(buscaReservaAdmin.toLowerCase()) ||
        res.cliente.toLowerCase().includes(buscaReservaAdmin.toLowerCase()),
    )
    .sort((a, b) => {
      if (ordenacaoReservaAdmin === 'antigas')
        return new Date(a.data_solicitacao) - new Date(b.data_solicitacao);
      if (ordenacaoReservaAdmin === 'recentes')
        return new Date(b.data_solicitacao) - new Date(a.data_solicitacao);
      if (ordenacaoReservaAdmin === 'az_cliente') return a.cliente.localeCompare(b.cliente);
      return 0;
    });

  const cancelarReservaAdmin = (reservaId, nomeCliente, tituloJogo) => {
    if (
      window.confirm(
        `Tem certeza que deseja CANCELAR a reserva de ${tituloJogo} do cliente ${nomeCliente}? O valor será devolvido à carteira dele.`,
      )
    ) {
      fetch(`https://borajogar-api.onrender.com/admin/reservas/${reservaId}/cancelar`, {
        method: 'POST',
        headers: getAuthHeaders(),
      }).then(async (res) => {
        const data = await res.json();
        if (res.ok) {
          mostrarToast(data.mensagem, 'sucesso');
          carregarDados();
        } else {
          mostrarToast(data.detail, 'erro');
        }
      });
    }
  };

  const contasManutencaoFiltradas = contasManutencao
    .filter(
      (c) =>
        c.jogo.toLowerCase().includes(buscaManutencao.toLowerCase()) ||
        (c.ultimo_cliente_nome &&
          c.ultimo_cliente_nome.toLowerCase().includes(buscaManutencao.toLowerCase())),
    )
    .sort((a, b) => {
      if (ordenacaoManutencao === 'urgente')
        return (b.cashback_pendente || 0) - (a.cashback_pendente || 0);
      if (ordenacaoManutencao === 'az_jogo') return a.jogo.localeCompare(b.jogo);
      return 0;
    });

  const clientesFiltrados = todosUsuarios
    .filter(
      (u) =>
        u.nome.toLowerCase().includes(buscaCliente.toLowerCase()) ||
        u.email.toLowerCase().includes(buscaCliente.toLowerCase()),
    )
    .filter((u) => {
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

  const jogosCatalogoAdminFiltrados = jogos
    .filter((j) => j.titulo.toLowerCase().includes(termoBusca.toLowerCase()))
    .filter((j) => {
      if (filtroStatusCatalogo === 'todos') return true;
      if (filtroStatusCatalogo === 'disponiveis') return j.estoque > 0;
      if (filtroStatusCatalogo === 'alugados') return j.estoque === 0;
      if (filtroStatusCatalogo === 'lancamentos') return j.prioridade_vitrine === 2; // Agora usa o banco de dados!
      return true;
    });

  const alugueisAtivos = meusAlugueis.filter((item) => item.status === 'ATIVA');
  const todosAlugueisExpirados = meusAlugueis.filter((item) => item.status === 'EXPIRADA');

  const totalAlugueis = todosAlugueisExpirados.length;
  const historicoAlugueis = todosAlugueisExpirados.slice(0, 5);

  const obterRankInfo = (qtd) => {
    if (qtd >= 50)
      return {
        nome: 'Super VIP',
        cor: 'bg-fuchsia-900/40 text-fuchsia-400 border-fuchsia-500/50',
        icon: '👑',
      };
    if (qtd >= 30)
      return {
        nome: 'VIP',
        cor: 'bg-rose-900/40 text-rose-400 border-rose-500/50',
        icon: '💎',
      };
    if (qtd >= 20)
      return {
        nome: 'Especial',
        cor: 'bg-amber-900/40 text-amber-400 border-amber-500/50',
        icon: '⭐',
      };
    if (qtd >= 10)
      return {
        nome: 'Veterano',
        cor: 'bg-purple-900/40 text-purple-400 border-purple-500/50',
        icon: '🏆',
      };
    if (qtd >= 1)
      return {
        nome: 'Membro',
        cor: 'bg-blue-900/40 text-blue-400 border-blue-500/50',
        icon: '🛡️',
      };
    return {
      nome: 'Novato',
      cor: 'bg-zinc-800 text-zinc-500 border-zinc-700',
      icon: '🌱',
    };
  };
  const meuRank = obterRankInfo(totalAlugueis);

  const inputClass =
    'w-full p-3 bg-zinc-900 border border-zinc-700 text-sm font-medium text-white rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all placeholder-zinc-500';
  const subtitleCyberClass =
    'text-[11px] font-mono-tech font-bold text-center mb-10 tracking-[0.2em] uppercase bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent animate-neon-flicker block select-none';
  const navBtnClass = 'text-sm font-bold px-4 py-2 rounded-xl transition-all duration-300';
  const adminInputClass =
    'w-full px-4 py-2.5 text-sm font-medium bg-zinc-950 border border-zinc-800 text-white rounded-xl focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all placeholder-zinc-600';

  const bannerUrls = configSistema.banners_url
    ? configSistema.banners_url
        .split(',')
        .map((u) => u.trim())
        .filter((u) => u)
    : [];
  const currentBanner =
    bannerUrls.length > 0
      ? bannerUrls[indiceBanner]
      : 'https://cinesiageek.com.br/wp-content/uploads/2024/09/playstation5.jpeg';

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-zinc-950 pb-10 font-sans text-zinc-300 antialiased">
      {toast.visivel && (
        <div
          className={`animate-fade-in fixed right-6 top-6 z-[150] flex max-w-sm items-center gap-3 rounded-xl border px-5 py-4 shadow-2xl transition-all duration-300 ${
            toast.tipo === 'sucesso'
              ? 'border-emerald-500/50 bg-emerald-950/90 text-emerald-100'
              : toast.tipo === 'erro'
                ? 'border-rose-500/50 bg-rose-950/90 text-rose-100'
                : 'border-amber-500/50 bg-amber-950/90 text-amber-100'
          } backdrop-blur-md`}
        >
          <span className="text-xl">
            {toast.tipo === 'sucesso' ? '✅' : toast.tipo === 'erro' ? '❌' : '⚠️'}
          </span>
          <p className="whitespace-pre-line text-sm font-medium leading-relaxed">
            {toast.mensagem}
          </p>
        </div>
      )}

      {/* ========================================================================= */}
      {/* NOVO MODAL DE EDIÇÃO DE JOGOS (ADMIN)                                     */}
      {/* ========================================================================= */}
      {modalEdicaoJogo && (
        <div className="animate-fade-in fixed inset-0 z-[250] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="custom-scrollbar max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-zinc-900 p-6 shadow-2xl shadow-blue-500/10 md:p-8">
            <h3 className="mb-6 flex items-center gap-3 text-xl font-black tracking-tight text-blue-400">
              ✏️ Editar Jogo
            </h3>
            <form onSubmit={salvarEdicaoJogo} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Título do Jogo
                </label>
                <input
                  type="text"
                  value={modalEdicaoJogo.titulo}
                  onChange={(e) =>
                    setModalEdicaoJogo({
                      ...modalEdicaoJogo,
                      titulo: e.target.value,
                    })
                  }
                  className={adminInputClass}
                  required
                />
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                <div className="w-full">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Plataforma
                  </label>
                  <select
                    value={modalEdicaoJogo.plataforma}
                    onChange={(e) =>
                      setModalEdicaoJogo({
                        ...modalEdicaoJogo,
                        plataforma: e.target.value,
                      })
                    }
                    className={adminInputClass}
                  >
                    <option value="PS5">PS5</option>
                    <option value="PS4/PS5">PS4/PS5</option>
                  </select>
                </div>
                <div className="w-full">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Data Lançamento (Pré-venda)
                  </label>
                  <input
                    type="date"
                    value={modalEdicaoJogo.data_lancamento || ''}
                    onChange={(e) =>
                      setModalEdicaoJogo({
                        ...modalEdicaoJogo,
                        data_lancamento: e.target.value,
                      })
                    }
                    className={adminInputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                <div className="w-full">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Tempo (Ex: 20h)
                  </label>
                  <input
                    type="text"
                    value={modalEdicaoJogo.tempo_jogo}
                    onChange={(e) =>
                      setModalEdicaoJogo({
                        ...modalEdicaoJogo,
                        tempo_jogo: e.target.value,
                      })
                    }
                    className={adminInputClass}
                  />
                </div>
                <div className="w-full">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Nota (Ex: 4.8)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={modalEdicaoJogo.nota}
                    onChange={(e) =>
                      setModalEdicaoJogo({
                        ...modalEdicaoJogo,
                        nota: e.target.value,
                      })
                    }
                    className={adminInputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                <div className="relative w-full">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Preço 7 Dias (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={modalEdicaoJogo.preco_aluguel}
                    onChange={(e) =>
                      setModalEdicaoJogo({
                        ...modalEdicaoJogo,
                        preco_aluguel: e.target.value,
                      })
                    }
                    className={adminInputClass}
                    required
                  />
                </div>
                <div className="relative w-full">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Preço 14 Dias (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={modalEdicaoJogo.preco_aluguel_14}
                    onChange={(e) =>
                      setModalEdicaoJogo({
                        ...modalEdicaoJogo,
                        preco_aluguel_14: e.target.value,
                      })
                    }
                    className={adminInputClass}
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                  URL da Imagem (Capa)
                </label>
                <input
                  type="url"
                  value={modalEdicaoJogo.url_imagem}
                  onChange={(e) =>
                    setModalEdicaoJogo({
                      ...modalEdicaoJogo,
                      url_imagem: e.target.value,
                    })
                  }
                  className={adminInputClass}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Descrição do Jogo
                </label>
                <textarea
                  value={modalEdicaoJogo.descricao}
                  onChange={(e) =>
                    setModalEdicaoJogo({
                      ...modalEdicaoJogo,
                      descricao: e.target.value,
                    })
                  }
                  className={`${adminInputClass} h-24 resize-none`}
                  required
                />
              </div>

              <div className="mt-4 flex gap-3 border-t border-zinc-800 pt-4">
                <button
                  type="button"
                  onClick={() => setModalEdicaoJogo(null)}
                  className="flex-1 rounded-xl bg-zinc-800 py-3 text-xs font-bold uppercase tracking-wide text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-blue-600 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-500"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* NOVO MODAL DE EDIÇÃO DE CLIENTES (ADMIN)                                  */}
      {/* ========================================================================= */}
      {modalEdicaoCliente && (
        <div className="animate-fade-in fixed inset-0 z-[250] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="custom-scrollbar max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-zinc-900 p-6 shadow-2xl shadow-purple-500/10 md:p-8">
            <h3 className="mb-6 flex items-center gap-3 text-xl font-black tracking-tight text-purple-400">
              ✏️ Editar Cliente
            </h3>
            <form onSubmit={salvarEdicaoCliente} className="flex flex-col gap-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                  Nome do Cliente
                </label>
                <input
                  type="text"
                  value={modalEdicaoCliente.nome}
                  onChange={(e) =>
                    setModalEdicaoCliente({
                      ...modalEdicaoCliente,
                      nome: e.target.value,
                    })
                  }
                  className={adminInputClass}
                  required
                />
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                <div className="w-full">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    E-mail
                  </label>
                  <input
                    type="email"
                    value={modalEdicaoCliente.email}
                    onChange={(e) =>
                      setModalEdicaoCliente({
                        ...modalEdicaoCliente,
                        email: e.target.value,
                      })
                    }
                    className={adminInputClass}
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    WhatsApp
                  </label>
                  <input
                    type="text"
                    value={modalEdicaoCliente.telefone || ''}
                    onChange={(e) =>
                      setModalEdicaoCliente({
                        ...modalEdicaoCliente,
                        telefone: e.target.value,
                      })
                    }
                    className={adminInputClass}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-4 md:flex-row">
                <div className="w-full">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Saldo na Carteira (R$)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    value={modalEdicaoCliente.saldo}
                    onChange={(e) =>
                      setModalEdicaoCliente({
                        ...modalEdicaoCliente,
                        saldo: e.target.value,
                      })
                    }
                    className={adminInputClass}
                    required
                  />
                </div>

                <div className="w-full">
                  <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-zinc-500">
                    Motivo (Aparecerá no Extrato)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Bônus, Correção..."
                    value={modalEdicaoCliente.motivo_ajuste || ''}
                    onChange={(e) =>
                      setModalEdicaoCliente({
                        ...modalEdicaoCliente,
                        motivo_ajuste: e.target.value,
                      })
                    }
                    className={adminInputClass}
                  />
                </div>
              </div>

              <div className="mt-4 flex gap-3 border-t border-zinc-800 pt-4">
                <button
                  type="button"
                  onClick={() => setModalEdicaoCliente(null)}
                  className="flex-1 rounded-xl bg-zinc-800 py-3 text-xs font-bold uppercase tracking-wide text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-xl bg-purple-600 py-3 text-xs font-bold uppercase tracking-wide text-white shadow-lg shadow-purple-600/20 transition-all hover:bg-purple-500"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {modalConfirmacao.visivel && (
        <div className="animate-fade-in fixed inset-0 z-[200] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-3xl border border-zinc-700 bg-zinc-900 p-8 shadow-2xl">
            <h3 className="mb-2 text-xl font-black tracking-tight text-white">
              {modalConfirmacao.tipo === 'aluguel'
                ? '🎮 Confirmar Aluguel'
                : '⏳ Confirmar Reserva'}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-zinc-400">
              Você está prestes a {modalConfirmacao.tipo === 'aluguel' ? 'alugar' : 'reservar'}{' '}
              <strong className="text-white">{modalConfirmacao.jogoTitulo}</strong> por{' '}
              <strong className="text-blue-400">{modalConfirmacao.diasEscolhidos} Dias</strong>.
            </p>

            {(() => {
              const precoAtual =
                modalConfirmacao.diasEscolhidos === 7
                  ? modalConfirmacao.preco7
                  : modalConfirmacao.preco14;
              const temSaldo = usuarioLogado.saldo >= precoAtual;

              return (
                <>
                  <div className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-950 p-5 shadow-inner">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Período:
                      </span>
                      <span className="text-sm font-black text-white">
                        {modalConfirmacao.diasEscolhidos} Dias
                      </span>
                    </div>
                    <div className="mb-3 h-px w-full bg-zinc-800/50"></div>
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Valor a descontar:
                      </span>
                      <span className="text-sm font-black text-rose-400">
                        - R$ {precoAtual.toFixed(2)}
                      </span>
                    </div>
                    <div className="mb-3 h-px w-full bg-zinc-800/50"></div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                        Saldo após compra:
                      </span>
                      <span
                        className={`text-base font-black ${temSaldo ? 'text-emerald-400' : 'animate-pulse text-rose-500'}`}
                      >
                        R$ {(usuarioLogado.saldo - precoAtual).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() =>
                        setModalConfirmacao({
                          visivel: false,
                          tipo: '',
                          jogoId: null,
                          jogoTitulo: '',
                          preco7: 0,
                          preco14: 0,
                          diasEscolhidos: 7,
                        })
                      }
                      className="flex-1 rounded-xl bg-zinc-800 py-3 text-xs font-bold uppercase tracking-wide text-zinc-300 transition-colors hover:bg-zinc-700 hover:text-white"
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={confirmarTransacao}
                      disabled={!temSaldo}
                      className={`flex-1 rounded-xl py-3 text-xs font-bold uppercase tracking-wide text-white shadow-lg transition-all ${!temSaldo ? 'cursor-not-allowed bg-zinc-600 opacity-50' : modalConfirmacao.tipo === 'aluguel' ? 'bg-blue-600 shadow-blue-600/20 hover:bg-blue-500' : 'bg-amber-600 shadow-amber-600/20 hover:bg-amber-500'}`}
                    >
                      {temSaldo ? 'Confirmar' : 'Sem Saldo'}
                    </button>
                  </div>
                </>
              );
            })()}
          </div>
        </div>
      )}

      {/* MODAL DE SINOPSE DO JOGO */}
      {modalDescricao && (
        <div
          className="animate-fade-in fixed inset-0 z-[250] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={() => setModalDescricao(null)}
        >
          <div
            className="relative w-full max-w-lg rounded-3xl border border-zinc-700 bg-zinc-900 p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalDescricao(null)}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
            >
              ✕
            </button>
            <h3 className="mb-4 pr-8 text-xl font-black leading-tight tracking-tight text-white">
              {modalDescricao.titulo}
            </h3>
            <div className="custom-scrollbar max-h-[60vh] overflow-y-auto pr-2">
              <p className="whitespace-pre-wrap text-sm font-medium leading-relaxed text-zinc-300">
                {modalDescricao.descricao}
              </p>
            </div>
            <div className="mt-6 border-t border-zinc-800 pt-4">
              <button
                onClick={() => setModalDescricao(null)}
                className="w-full rounded-xl bg-zinc-800 py-3.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-zinc-700"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {abaAtual === 'login' && !usuarioLogado && modoLogin && !modoEsqueciSenha ? (
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
      ) : abaAtual === 'login' && !usuarioLogado && !modoLogin && !modoEsqueciSenha ? (
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
                  Ao clicar em "Finalizar Cadastro", você confirma que é maior de idade e declara
                  que leu, compreendeu e concorda integralmente com os nossos{' '}
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
      ) : abaAtual === 'login' && !usuarioLogado && modoEsqueciSenha ? (
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
      ) : (
        <>
          <nav className="fixed left-0 top-0 z-50 w-full border-b border-zinc-800 bg-zinc-900/90 shadow-lg backdrop-blur-md">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                  <span
                    className="cursor-pointer bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-xl font-black tracking-tighter text-transparent"
                    onClick={() => setAbaAtual('vitrine')}
                  >
                    BORA JOGAR!
                  </span>

                  <div className="hidden space-x-2 md:flex">
                    <button
                      onClick={() => setAbaAtual('vitrine')}
                      className={`${navBtnClass} ${abaAtual === 'vitrine' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                    >
                      🎮 Loja
                    </button>
                    <button
                      onClick={() => setAbaAtual('faq')}
                      className={`${navBtnClass} ${abaAtual === 'faq' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                    >
                      📖 Como Funciona
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {!usuarioLogado ? (
                    <button
                      onClick={() => {
                        setAbaAtual('login');
                        setModoLogin(true);
                        setModoEsqueciSenha(false);
                      }}
                      className="rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-blue-500"
                    >
                      Entrar
                    </button>
                  ) : (
                    <>
                      <div className="mr-2 hidden items-center space-x-2 border-r border-zinc-800 pr-4 md:flex">
                        <button
                          onClick={() => setAbaAtual('dashboard')}
                          className={`${navBtnClass} ${abaAtual === 'dashboard' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                        >
                          🔑 Meus Acessos
                        </button>

                        {usuarioLogado.is_admin && (
                          <button
                            onClick={() => setAbaAtual('admin')}
                            className={`${navBtnClass} ${abaAtual === 'admin' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                          >
                            ⚙️ Painel Admin
                          </button>
                        )}
                      </div>

                      <div className="hidden items-center gap-3 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-2 shadow-inner md:flex">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                          Saldo
                        </span>
                        <span
                          className={`text-sm font-black ${usuarioLogado.saldo < 0 ? 'animate-pulse text-rose-500' : 'text-emerald-400'}`}
                        >
                          R$ {(usuarioLogado.saldo || 0).toFixed(2)}
                        </span>
                      </div>

                      <button
                        onClick={() => {
                          setAbaAtual('dashboard');
                          window.scrollTo(0, 0);
                        }}
                        className="group relative hidden h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 transition-all hover:border-orange-500/50 hover:bg-orange-500/10 md:flex"
                      >
                        <span
                          className={`text-lg transition-all ${notificacoes.length > 0 ? 'grayscale-0' : 'grayscale group-hover:grayscale-0'}`}
                        >
                          🔔
                        </span>
                        {notificacoes.length > 0 && (
                          <span className="absolute -right-1 -top-1 flex h-3 w-3">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex h-3 w-3 rounded-full border border-zinc-900 bg-orange-500"></span>
                          </span>
                        )}
                      </button>

                      <span className="hidden text-xs text-zinc-400 md:block">
                        Olá, <strong className="text-white">{usuarioLogado.nome}</strong>
                      </span>
                      <button
                        onClick={sair}
                        className="hidden rounded-xl bg-zinc-800 px-4 py-2 text-xs font-bold uppercase tracking-wider text-zinc-300 transition-colors hover:bg-rose-600 hover:text-white md:block"
                      >
                        Sair
                      </button>

                      <button
                        onClick={() => setMenuMobileAberto(!menuMobileAberto)}
                        className="rounded-lg p-2 text-zinc-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 md:hidden"
                      >
                        <svg
                          className="h-7 w-7"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          {menuMobileAberto ? (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          ) : (
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4 6h16M4 12h16M4 18h16"
                            />
                          )}
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

            {menuMobileAberto && usuarioLogado && (
              <div className="animate-fade-in absolute left-0 top-16 flex w-full flex-col border-b border-zinc-800 bg-zinc-900 shadow-2xl md:hidden">
                <div className="flex items-center justify-between border-b border-zinc-800/50 bg-zinc-950/50 p-5">
                  <span className="text-sm text-zinc-400">
                    Olá,{' '}
                    <strong className="inline-block max-w-[120px] truncate align-bottom text-white">
                      {usuarioLogado.nome}
                    </strong>
                  </span>
                  <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 shadow-inner">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Saldo
                    </span>
                    <span
                      className={`text-sm font-black ${usuarioLogado.saldo < 0 ? 'animate-pulse text-rose-500' : 'text-emerald-400'}`}
                    >
                      R$ {(usuarioLogado.saldo || 0).toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col gap-3 p-5">
                  <button
                    onClick={() => {
                      setAbaAtual('vitrine');
                      setMenuMobileAberto(false);
                    }}
                    className={`rounded-xl p-4 text-left text-sm font-bold uppercase tracking-wider shadow-md transition-all ${abaAtual === 'vitrine' ? 'bg-blue-600 text-white shadow-blue-600/20' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'}`}
                  >
                    🎮 Loja
                  </button>
                  <button
                    onClick={() => {
                      setAbaAtual('dashboard');
                      setMenuMobileAberto(false);
                    }}
                    className={`rounded-xl p-4 text-left text-sm font-bold uppercase tracking-wider shadow-md transition-all ${abaAtual === 'dashboard' ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'}`}
                  >
                    🔑 Meus Acessos
                  </button>
                  <button
                    onClick={() => {
                      setAbaAtual('faq');
                      setMenuMobileAberto(false);
                    }}
                    className={`rounded-xl p-4 text-left text-sm font-bold uppercase tracking-wider shadow-md transition-all ${abaAtual === 'faq' ? 'bg-purple-600 text-white shadow-purple-600/20' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'}`}
                  >
                    📖 Como Funciona
                  </button>

                  {usuarioLogado.is_admin && (
                    <button
                      onClick={() => {
                        setAbaAtual('admin');
                        setMenuMobileAberto(false);
                      }}
                      className={`rounded-xl p-4 text-left text-sm font-bold uppercase tracking-wider shadow-md transition-all ${abaAtual === 'admin' ? 'bg-rose-600 text-white shadow-rose-600/20' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'}`}
                    >
                      ⚙️ Painel Admin
                    </button>
                  )}

                  <button
                    onClick={() => {
                      sair();
                      setMenuMobileAberto(false);
                    }}
                    className="mt-4 rounded-xl border border-rose-500/30 bg-rose-900/30 p-4 text-center text-sm font-bold uppercase tracking-wider text-rose-400 shadow-lg transition-all hover:bg-rose-600 hover:text-white"
                  >
                    Sair da Conta
                  </button>
                </div>
              </div>
            )}
          </nav>

          <main className="mx-auto max-w-7xl px-4 pb-12 pt-24 md:px-8 md:pt-28">
            {abaAtual === 'vitrine' && (
              <div className="animate-fade-in pb-12">
                {/* =========================================================
                    1. ZONA DE ATRAÇÃO: HERO BANNER PRINCIPAL (GLASSM.)
                ========================================================== */}
                <div
                  className="relative mb-8 flex min-h-[480px] w-full items-center overflow-hidden rounded-3xl border border-zinc-800 shadow-2xl transition-all duration-700 md:min-h-[600px]"
                  style={{
                    backgroundImage: `url('${currentBanner}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-black/20 md:bg-gradient-to-r md:from-zinc-950/90 md:via-zinc-950/40 md:to-transparent"></div>

                  <div className="relative z-10 w-full px-8 pb-20 md:px-14 md:pb-32">
                    <span className="mb-6 inline-block rounded-full border border-blue-500/30 bg-blue-500/20 px-4 py-1.5 font-mono-tech text-[10px] font-bold uppercase tracking-widest text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      Catálogo Atualizado
                    </span>
                    <h1 className="mb-6 max-w-2xl animate-neon-flicker bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text font-mono-tech text-3xl font-bold uppercase leading-tight tracking-tighter text-transparent md:text-5xl lg:text-6xl">
                      A sua Próxima <br /> Aventura Começa Aqui!
                    </h1>
                    <p className="max-w-xl text-sm font-medium leading-relaxed text-zinc-300 md:text-lg">
                      Alugue os maiores lançamentos e os melhores exclusivos. Receba seu acesso
                      instantaneamente e comece a jogar sem sair de casa.
                    </p>
                  </div>

                  {/* 📣 FAIXA DE ANÚNCIO: ESTILO GLASSMORPHISM (TRANSPARENTE) */}
                  {configSistema.anuncio_ativo && configSistema.mensagem_anuncio && (
                    <div className="absolute bottom-0 left-0 z-30 w-full border-t border-white/10 bg-black/30 py-6 backdrop-blur-md md:py-8">
                      <div className="flex items-center justify-center gap-4 px-6 text-center">
                        <span className="animate-pulse text-xl drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] md:text-2xl">
                          📣
                        </span>
                        <h2 className="bg-gradient-to-r from-orange-500 via-pink-500 to-fuchsia-500 bg-clip-text text-sm font-black uppercase tracking-widest text-transparent md:text-xl lg:text-2xl">
                          {configSistema.mensagem_anuncio}
                        </h2>
                        <span className="animate-pulse text-xl drop-shadow-[0_0_10px_rgba(217,70,239,0.8)] md:text-2xl">
                          🔥
                        </span>
                      </div>
                    </div>
                  )}

                  {bannerUrls.length > 1 && (
                    <div
                      className={`absolute left-1/2 z-20 flex -translate-x-1/2 gap-2 transition-all duration-500 ${configSistema.anuncio_ativo ? 'bottom-24 md:bottom-28' : 'bottom-6'}`}
                    >
                      {bannerUrls.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setIndiceBanner(idx)}
                          className={`h-1.5 rounded-full transition-all duration-300 ${idx === indiceBanner ? 'w-8 bg-blue-500' : 'w-2 bg-white/40 hover:bg-white/70'}`}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* =========================================================
                    2. ZONA DE AVISOS: CHOQUE DE REALIDADE (NEON)
                ========================================================== */}
                <div className="group relative mb-8 w-full overflow-hidden border-y border-zinc-800/50 bg-zinc-950">
                  <div className="absolute inset-0 -translate-x-1/4 scale-150 transform rounded-full bg-red-950/30 opacity-40 blur-3xl"></div>
                  <div className="absolute inset-0 translate-x-1/4 scale-150 transform rounded-full bg-cyan-950/30 opacity-40 blur-3xl"></div>
                  <div className="relative z-10 mx-auto max-w-7xl px-4 py-6 md:py-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-4 md:gap-0 md:divide-x md:divide-zinc-800">
                      <div className="flex flex-col px-4 md:items-center md:pl-0 md:pr-6 md:text-center">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="text-red-500">
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              ></path>
                            </svg>
                          </span>
                          <h3 className="text-sm font-black uppercase tracking-wider text-red-500">
                            A VERDADE SOBRE "MÍDIA VITALÍCIA"
                          </h3>
                        </div>
                        <p className="text-xs leading-relaxed text-zinc-300">
                          Vendem a mesma conta para{' '}
                          <strong className="text-white">vários consoles ao mesmo tempo</strong>.
                        </p>
                      </div>
                      <div className="flex flex-col px-4 md:items-center md:px-6 md:text-center">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="text-red-500">
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                              ></path>
                            </svg>
                          </span>
                          <h3 className="text-sm font-black uppercase tracking-wider text-red-500">
                            RISCO EXTREMO DE BANIMENTO
                          </h3>
                        </div>
                        <p className="text-xs leading-relaxed text-zinc-300">
                          Sony detecta e{' '}
                          <strong className="text-white">
                            bane seu PlayStation permanentemente
                          </strong>
                          . Você perde tudo.
                        </p>
                      </div>
                      <div className="mt-2 flex flex-col border-t border-zinc-800 px-4 pt-4 md:mt-0 md:items-center md:border-t-0 md:px-6 md:pt-0 md:text-center">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="text-cyan-400 transition-all group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                              ></path>
                            </svg>
                          </span>
                          <h3 className="text-sm font-black uppercase tracking-wider text-cyan-400">
                            PADRÃO BORA JOGAR!: EXCLUSIVO
                          </h3>
                        </div>
                        <p className="text-xs leading-relaxed text-zinc-300">
                          A conta é <strong className="text-white">SÓ SUA</strong> durante o
                          aluguel. Jogue online, sem cair.
                        </p>
                      </div>
                      <div className="mt-2 flex flex-col border-t border-zinc-800 px-4 pt-4 md:mt-0 md:items-center md:border-t-0 md:pl-6 md:pr-0 md:pt-0 md:text-center">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="text-cyan-400 transition-all group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)]">
                            <svg
                              className="h-6 w-6"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2.5"
                                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M12 16v1m0-1V8"
                              ></path>
                            </svg>
                          </span>
                          <h3 className="text-sm font-black uppercase tracking-wider text-cyan-400">
                            INTELIGÊNCIA FINANCEIRA
                          </h3>
                        </div>
                        <p className="text-xs leading-relaxed text-zinc-300">
                          Pague <strong className="text-white">apenas R$ 40</strong>, zere
                          lançamentos e parta para o próximo jogo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =========================================================
                    🚀 3. NOVA POSIÇÃO: ENQUETE DE LANÇAMENTOS
                ========================================================== */}
                {enqueteOpcoes.length > 0 && (
                  <div className="animate-fade-in relative mb-12 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 shadow-xl md:p-8">
                    <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-fuchsia-500 to-blue-500"></div>
                    <h3 className="mb-2 text-xl font-black uppercase tracking-tight text-white md:text-2xl">
                      Próximas Adições: Você Decide!
                    </h3>
                    <p className="mb-6 text-sm font-medium text-zinc-400">
                      Vote no jogo que você mais quer ver no catálogo e ajude a BORA JOGAR! a
                      crescer.
                    </p>

                    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                      {enqueteOpcoes.map((opcao) => {
                        const isSelected = meuVoto === opcao.id;
                        return (
                          <div
                            key={opcao.id}
                            onClick={() => votarEnquete(opcao.id)}
                            className={`group relative h-40 cursor-pointer overflow-hidden rounded-2xl transition-all duration-300 md:h-48 ${isSelected ? 'z-10 scale-105 border-2 border-fuchsia-500 shadow-[0_0_20px_rgba(217,70,239,0.5)]' : 'border-2 border-transparent opacity-80 hover:border-zinc-600 hover:opacity-100'}`}
                          >
                            <img
                              src={opcao.url_imagem}
                              alt={opcao.titulo}
                              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/90 via-black/30 to-transparent p-3">
                              <span className="text-xs font-black leading-tight tracking-tight text-white drop-shadow-md md:text-sm">
                                {opcao.titulo}
                              </span>
                            </div>
                            {isSelected && (
                              <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border border-white/20 bg-fuchsia-500 text-white shadow-lg">
                                <svg
                                  className="h-4 w-4"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="3"
                                    d="M5 13l4 4L19 7"
                                  ></path>
                                </svg>
                              </div>
                            )}
                            {usuarioLogado?.is_admin && (
                              <div className="absolute left-2 top-2 rounded-lg border border-zinc-700 bg-black/80 px-2 py-1 text-[10px] font-black text-fuchsia-400 backdrop-blur-md">
                                {opcao.total_votos} votos
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* =========================================================
                    4. ZONA DE AÇÃO: BARRA DE COMANDO DA VITRINE
                ========================================================== */}
                <div className="mb-8 flex flex-col justify-between gap-4 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-4 shadow-lg backdrop-blur-sm lg:flex-row lg:items-center">
                  <div className="text-center text-xs font-bold uppercase tracking-wider text-zinc-400 lg:text-left">
                    Mostrando{' '}
                    <span className="text-white">
                      {!carregandoJogos ? jogosFiltrados.length : 0}
                    </span>{' '}
                    jogo(s) encontrado(s)
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="relative w-full sm:w-64">
                      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                        <span className="opacity-60">🎮</span>
                      </div>
                      <input
                        type="text"
                        placeholder="Buscar jogo..."
                        value={termoBusca}
                        onChange={lidarComBusca}
                        className="w-full rounded-xl border border-zinc-700/50 bg-zinc-950 py-2.5 pl-12 pr-4 text-sm font-medium text-white placeholder-zinc-500 transition-all focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>

                    <div className="flex flex-wrap gap-3">
                      <div className="scrollbar-hide flex overflow-x-auto rounded-xl border border-zinc-700/50 bg-zinc-950 p-1">
                        <button
                          onClick={() => lidarComFiltroPlataforma('TODAS')}
                          className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${filtroPlataforma === 'TODAS' ? 'bg-blue-600 text-white shadow' : 'text-zinc-500 hover:text-white'}`}
                        >
                          Todas
                        </button>
                        <button
                          onClick={() => lidarComFiltroPlataforma('PS5')}
                          className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${filtroPlataforma === 'PS5' ? 'bg-blue-600 text-white shadow' : 'text-zinc-500 hover:text-white'}`}
                        >
                          PS5
                        </button>
                        <button
                          onClick={() => lidarComFiltroPlataforma('PS4/PS5')}
                          className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${filtroPlataforma === 'PS4/PS5' ? 'bg-blue-600 text-white shadow' : 'text-zinc-500 hover:text-white'}`}
                        >
                          PS4/PS5
                        </button>
                      </div>

                      <div className="flex rounded-xl border border-zinc-700/50 bg-zinc-950 p-1">
                        <button
                          onClick={() => lidarComFiltroDisp('TODOS')}
                          className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${filtroDisponibilidade === 'TODOS' ? 'bg-emerald-600 text-white shadow' : 'text-zinc-500 hover:text-white'}`}
                        >
                          Todos
                        </button>
                        <button
                          onClick={() => lidarComFiltroDisp('DISPONIVEL')}
                          className={`whitespace-nowrap rounded-lg px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all ${filtroDisponibilidade === 'DISPONIVEL' ? 'bg-emerald-600 text-white shadow' : 'text-zinc-500 hover:text-white'}`}
                        >
                          Disponíveis
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* =========================================================
                    5. ZONA DE CONSUMO: VITRINE E PAGINAÇÃO
                ========================================================== */}
                {carregandoJogos && (
                  <div className="animate-fade-in mb-8 flex flex-col items-center justify-center rounded-3xl border border-zinc-800 bg-zinc-900/50 py-20 text-center shadow-xl">
                    <div className="mb-6 h-16 w-16 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"></div>
                    <h3 className="mb-2 text-2xl font-black tracking-tight text-white">
                      Acordando os Servidores...
                    </h3>
                    <p className="max-w-md text-sm font-medium leading-relaxed text-zinc-400">
                      Nosso sistema está estabelecendo uma conexão segura com o banco de dados. Isso
                      pode levar até 50 segundos. Segura aí!
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                  {jogosDaPagina.map((jogo) => {
                    // Graças ao backend inteligente, tudo ficou absurdamente simples:
                    const isEmBreve = jogo.prioridade_vitrine === 1;
                    const isLancamento = jogo.prioridade_vitrine === 2;

                    const dataLanc = jogo.data_lancamento
                      ? new Date(jogo.data_lancamento + 'T00:00:00')
                      : null;

                    const dataFormatada = dataLanc
                      ? dataLanc.toLocaleDateString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                        })
                      : '';
                    const tituloLimpo = jogo.titulo;

                    const ehJogoVIP = isEmBreve;
                    const isVeterano = usuarioLogado
                      ? usuarioLogado.is_admin || totalAlugueis >= 1
                      : false;
                    const bloqueadoParaUsuario = ehJogoVIP && usuarioLogado && !isVeterano;

                    const minhaReservaAtiva = minhasReservas.find(
                      (res) => res.jogo === tituloLimpo,
                    );

                    let dataVagaGlobal = isEmBreve ? new Date(dataLanc) : new Date();

                    if (jogo.proxima_devolucao) {
                      const pd = new Date(jogo.proxima_devolucao);
                      if (pd > dataVagaGlobal) dataVagaGlobal = pd;
                    }

                    const diasFilaEsperaMs = (jogo.fila_dias_espera || 0) * 24 * 60 * 60 * 1000;
                    const dataFinalExata = new Date(dataVagaGlobal.getTime() + diasFilaEsperaMs);
                    const dataVagaGlobalStr = dataFinalExata.toLocaleDateString('pt-BR');

                    return (
                      <div
                        key={jogo.id}
                        className={`rounded-3xl border bg-zinc-900 ${bloqueadoParaUsuario ? 'border-zinc-800/50 opacity-90 grayscale-[20%]' : 'border-zinc-800'} group flex flex-col overflow-hidden shadow-xl transition-all duration-300 hover:-translate-y-2 hover:border-blue-500/50`}
                      >
                        <div className="relative h-56 w-full overflow-hidden bg-zinc-800">
                          {jogo.url_imagem ? (
                            <img
                              src={jogo.url_imagem}
                              alt={tituloLimpo}
                              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center bg-zinc-800/80">
                              <span className="text-5xl opacity-50">🎮</span>
                            </div>
                          )}

                          <div className="pointer-events-none absolute left-4 right-4 top-4 flex items-start justify-between">
                            <div className="flex flex-col items-start gap-2">
                              <span className="rounded-lg border border-zinc-700/50 bg-zinc-950/80 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-lg backdrop-blur-md">
                                {jogo.plataforma}
                              </span>
                              {jogo.nota > 0 && (
                                <span className="flex items-center gap-1 rounded-lg border border-zinc-700/50 bg-zinc-950/80 px-3 py-1.5 text-[10px] font-bold uppercase text-amber-400 shadow-lg backdrop-blur-md">
                                  ⭐ {jogo.nota}
                                </span>
                              )}
                              {jogo.tempo_jogo && jogo.tempo_jogo !== '0h' && (
                                <span className="flex items-center gap-1 rounded-lg border border-zinc-700/50 bg-zinc-950/80 px-3 py-1.5 text-[10px] font-bold uppercase text-zinc-300 shadow-lg backdrop-blur-md">
                                  ⏱️ ~{jogo.tempo_jogo}
                                </span>
                              )}
                            </div>

                            <div className="flex flex-col items-end">
                              {jogo.estoque > 0 && !isEmBreve ? (
                                <span className="flex items-center gap-1.5 rounded-lg border border-emerald-400/50 bg-emerald-500/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-lg backdrop-blur-md [text-shadow:1px_1px_0px_black,-1px_-1px_0px_black,1px_-1px_0px_black,-1px_1px_0px_black]">
                                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white"></span>
                                  DISPONÍVEL
                                </span>
                              ) : isEmBreve ? (
                                <span className="rounded-lg border border-purple-500/50 bg-purple-600/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-lg backdrop-blur-md [text-shadow:1px_1px_0px_black,-1px_-1px_0px_black,1px_-1px_0px_black,-1px_1px_0px_black]">
                                  LANÇAMENTO {dataFormatada && `(${dataFormatada})`}
                                </span>
                              ) : (
                                <span className="rounded-lg border border-rose-500/50 bg-rose-600/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white shadow-lg backdrop-blur-md [text-shadow:1px_1px_0px_black,-1px_-1px_0px_black,1px_-1px_0px_black,-1px_1px_0px_black]">
                                  ALUGADO
                                </span>
                              )}
                            </div>
                          </div>

                          {isLancamento && !isEmBreve && (
                            <div className="absolute bottom-4 left-4 z-20">
                              <span className="flex items-center gap-1.5 rounded-xl border border-fuchsia-400 bg-fuchsia-600/90 px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_0_15px_rgba(192,38,211,0.8)] backdrop-blur-md">
                                <span className="animate-pulse">🔥</span> Lançamento
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-1 flex-col p-6">
                          <h3 className="mb-2 text-lg font-black leading-tight tracking-tight text-white transition-colors group-hover:text-blue-400">
                            {tituloLimpo}
                          </h3>
                          <div className="mb-6">
                            <p
                              className="line-clamp-4 text-xs font-medium leading-relaxed text-zinc-400"
                              title={jogo.descricao}
                            >
                              {jogo.descricao}
                            </p>
                            <button
                              onClick={() => setModalDescricao(jogo)}
                              className="mt-2 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-400 transition-colors hover:text-blue-300"
                            >
                              Ler sinopse completa <span className="text-lg leading-none">›</span>
                            </button>
                          </div>

                          <div className="mt-auto">
                            {(jogo.estoque === 0 || isEmBreve) && (
                              <div className="mb-4 rounded-xl border border-zinc-800/80 bg-zinc-950 p-4 shadow-inner">
                                <div className="mb-2 flex items-center justify-between">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                    👥 Fila de espera:
                                  </span>
                                  <span className="text-xs font-black text-amber-400">
                                    {jogo.tamanho_fila || 0} pessoa(s)
                                  </span>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                    ⏳ Próxima Vaga em:
                                  </span>
                                  <span className="text-xs font-black text-blue-400">
                                    {dataVagaGlobalStr}
                                  </span>
                                </div>
                              </div>
                            )}

                            <div className="mt-3 flex w-full gap-3">
                              {minhaReservaAtiva ? (
                                <div className="group relative flex h-[76px] flex-1 flex-col items-center justify-center overflow-hidden rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-3 shadow-[0_0_15px_rgba(16,185,129,0.15)] transition-all">
                                  <div className="absolute left-0 top-0 h-1 w-full bg-gradient-to-r from-emerald-500 to-cyan-500"></div>
                                  <span className="mb-1 flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-emerald-500">
                                    ✅ Já Reservado
                                  </span>
                                  <strong className="text-center text-sm font-black tracking-tight text-white">
                                    Sua vez em:{' '}
                                    <span className="text-emerald-400">
                                      {minhaReservaAtiva.data_estimada_str}
                                    </span>
                                  </strong>
                                </div>
                              ) : bloqueadoParaUsuario ? (
                                <button
                                  onClick={() =>
                                    mostrarToast(
                                      '🚨 Acesso Restrito! Este lançamento é exclusivo para clientes com Rank Membro ou superior. Complete pelo menos 1 aluguel para desbloquear.',
                                      'aviso',
                                    )
                                  }
                                  className="group/lock flex h-[76px] flex-1 flex-col items-center justify-center rounded-xl border border-rose-500/20 bg-zinc-950/80 p-3 shadow-inner transition-all hover:bg-rose-950/30"
                                >
                                  <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-zinc-500 transition-colors group-hover/lock:text-rose-400">
                                    Acesso Restrito
                                  </span>
                                  <strong className="flex items-center gap-2 text-sm font-black uppercase tracking-tight text-rose-500">
                                    🔒 Requer Rank
                                  </strong>
                                </button>
                              ) : (
                                <>
                                  <button
                                    onClick={() =>
                                      abrirConfirmacao(
                                        jogo.estoque > 0 && !isEmBreve ? 'aluguel' : 'reserva',
                                        jogo.id,
                                        tituloLimpo,
                                        jogo.preco_aluguel,
                                        jogo.preco_aluguel_14 || 0,
                                        7,
                                      )
                                    }
                                    className={`group flex h-[76px] flex-1 flex-col items-center justify-center rounded-xl border p-2.5 transition-all ${
                                      jogo.estoque > 0 && !isEmBreve
                                        ? 'border-blue-500 bg-blue-600/90 shadow-[0_0_15px_rgba(59,130,246,0.4)] hover:bg-blue-500'
                                        : 'border-amber-400 bg-amber-500/90 shadow-[0_0_15px_rgba(245,158,11,0.5)] hover:bg-amber-400'
                                    }`}
                                  >
                                    <span className="text-[10px] font-black uppercase tracking-wider text-white/90 transition-colors [text-shadow:1px_1px_0px_black,-1px_-1px_0px_black,1px_-1px_0px_black,-1px_1px_0px_black] group-hover:text-white">
                                      {jogo.estoque > 0 && !isEmBreve ? 'Alugar' : 'Reservar'} 7
                                      Dias
                                    </span>
                                    <strong className="mt-0.5 text-lg font-black tracking-tight text-white [text-shadow:1px_1px_0px_black,-1px_-1px_0px_black,1px_-1px_0px_black,-1px_1px_0px_black]">
                                      R$ {jogo.preco_aluguel.toFixed(2)}
                                    </strong>
                                  </button>

                                  {jogo.preco_aluguel_14 > 0 && (
                                    <button
                                      onClick={() =>
                                        abrirConfirmacao(
                                          jogo.estoque > 0 && !isEmBreve ? 'aluguel' : 'reserva',
                                          jogo.id,
                                          tituloLimpo,
                                          jogo.preco_aluguel,
                                          jogo.preco_aluguel_14,
                                          14,
                                        )
                                      }
                                      className={`group relative flex h-[76px] flex-1 flex-col items-center justify-center rounded-xl border p-2.5 transition-all ${
                                        jogo.estoque > 0 && !isEmBreve
                                          ? 'border-cyan-400 bg-cyan-600/90 shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:bg-cyan-500'
                                          : 'border-orange-400 bg-orange-500/80 shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:bg-orange-400'
                                      }`}
                                    >
                                      <span
                                        className={`absolute -top-3 right-2 z-10 rounded-full border bg-zinc-950 px-2 py-0.5 text-[9px] font-black uppercase tracking-wider shadow-lg ${jogo.estoque > 0 && !isEmBreve ? 'border-cyan-500/50 text-cyan-400' : 'border-orange-500/50 text-orange-400'}`}
                                      >
                                        PROMO
                                      </span>
                                      <span className="text-[10px] font-black uppercase tracking-wider text-white/90 transition-colors [text-shadow:1px_1px_0px_black,-1px_-1px_0px_black,1px_-1px_0px_black,-1px_1px_0px_black] group-hover:text-white">
                                        {jogo.estoque > 0 && !isEmBreve ? 'Alugar' : 'Reservar'} 14
                                        Dias
                                      </span>
                                      <strong className="mt-0.5 text-lg font-black tracking-tight text-white [text-shadow:1px_1px_0px_black,-1px_-1px_0px_black,1px_-1px_0px_black,-1px_1px_0px_black]">
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
                  <div className="mb-12 mt-16 flex items-center justify-center gap-3">
                    <button
                      onClick={() => setPaginaAtual((prev) => Math.max(prev - 1, 1))}
                      disabled={paginaAtual === 1}
                      className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Anterior
                    </button>
                    {[...Array(totalPaginas)].map((_, index) => {
                      const numeroDaPagina = index + 1;
                      return (
                        <button
                          key={numeroDaPagina}
                          onClick={() => setPaginaAtual(numeroDaPagina)}
                          className={`h-10 w-10 rounded-xl text-sm font-black transition-all ${paginaAtual === numeroDaPagina ? 'border border-blue-500 bg-blue-600 text-white shadow-lg shadow-blue-500/30' : 'border border-zinc-800 bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                        >
                          {numeroDaPagina}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setPaginaAtual((prev) => Math.min(prev + 1, totalPaginas))}
                      disabled={paginaAtual === totalPaginas}
                      className="rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-400 transition-all hover:bg-zinc-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Próximo
                    </button>
                  </div>
                )}
              </div>
            )}

            {abaAtual === 'dashboard' && (
              <div className="animate-fade-in mx-auto max-w-5xl space-y-8">
                <div className="relative flex flex-col items-center gap-6 overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-900/20 via-zinc-900 to-zinc-900 p-6 shadow-2xl md:flex-row md:p-8">
                  <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-purple-600/10 blur-3xl"></div>

                  <div className="relative">
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-2xl border-2 border-purple-500/50 bg-zinc-950 p-1 shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                      <img
                        src={`https://api.dicebear.com/7.x/bottts/svg?seed=${usuarioLogado.nome}&colors=purple,green,orange`}
                        alt="Avatar"
                        className="h-full w-full object-cover"
                      />
                    </div>
                    {historicoAlugueis.length > 0 && (
                      <div className="absolute -bottom-3 -right-3 rounded-full bg-zinc-950 p-1">
                        <div className="flex h-6 w-6 items-center justify-center rounded-full border border-emerald-300 bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                          <span className="text-[10px]">✨</span>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="z-10 flex-1 text-center md:text-left">
                    <h2 className="mb-2 text-2xl font-black leading-none tracking-tight text-white md:text-3xl">
                      {usuarioLogado.nome}
                    </h2>
                    <p className="mb-4 font-mono-tech text-sm text-zinc-400">
                      {usuarioLogado.email}
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-3 md:justify-start">
                      <span className="flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-1.5 text-[10px] font-black uppercase tracking-wider text-white">
                        🎮 {totalAlugueis} Locações
                      </span>
                      <span
                        className={`${meuRank.cor} flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[10px] font-black uppercase tracking-widest shadow-[0_0_10px_rgba(255,255,255,0.05)]`}
                      >
                        {meuRank.icon} Rank: {meuRank.nome}
                      </span>
                    </div>
                  </div>
                </div>

                {notificacoes.map((notif) => (
                  <div
                    key={notif.id}
                    className="animate-fade-in relative mb-4 flex flex-col gap-4 overflow-hidden rounded-3xl border border-orange-500/40 bg-orange-950/30 p-6 shadow-[0_0_20px_rgba(249,115,22,0.1)] md:p-8"
                  >
                    <div className="absolute left-0 top-0 h-full w-1 bg-orange-500"></div>
                    <div className="flex items-start gap-4">
                      <span className="animate-bounce text-3xl">⚠️</span>
                      <div>
                        <h3 className="mb-1 text-lg font-black uppercase tracking-tight text-orange-400">
                          Atualização na sua Reserva
                        </h3>
                        <p className="text-sm font-medium leading-relaxed text-zinc-300">
                          {notif.mensagem}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 flex flex-col gap-3 pl-0 sm:flex-row sm:pl-12">
                      <button
                        onClick={() => manterReserva(notif.id)}
                        className="flex-1 rounded-xl bg-orange-600 px-6 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-orange-600/20 transition-colors hover:bg-orange-500"
                      >
                        👍 Entendi, manter reserva
                      </button>
                      <button
                        onClick={() => cancelarReservaComEstorno(notif.reserva_id, notif.id)}
                        className="flex-1 rounded-xl border border-zinc-700 bg-zinc-900 px-6 py-3 text-xs font-bold uppercase tracking-wider text-zinc-300 transition-colors hover:bg-zinc-800"
                      >
                        💸 Cancelar e Estornar Crédito
                      </button>
                    </div>
                  </div>
                ))}

                <div className="mb-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
                  <section className="relative flex h-auto flex-col overflow-hidden rounded-3xl border border-cyan-500/30 bg-gradient-to-br from-cyan-900/20 to-zinc-900 p-6 shadow-2xl shadow-cyan-500/10 transition-transform duration-300 hover:-translate-y-1 md:p-8 lg:h-[540px]">
                    <div className="pointer-events-none absolute -right-8 -top-8 text-9xl opacity-5">
                      💸
                    </div>
                    <h3 className="mb-2 flex items-center gap-2 text-lg font-black tracking-tight text-cyan-400">
                      💰 Adicionar Saldo via PIX
                    </h3>
                    <p className="mb-4 text-xs leading-relaxed text-zinc-400">
                      Recarregue sua carteira instantaneamente para alugar jogos sem filas.
                    </p>

                    {pixPendente ? (
                      <div className="animate-fade-in z-10 mb-auto mt-auto flex flex-col items-center justify-center rounded-2xl border border-cyan-500/30 bg-zinc-950 p-6 shadow-inner">
                        <img
                          src={`data:image/png;base64,${pixPendente.qr_code}`}
                          alt="QR Code PIX"
                          className="mb-4 h-40 w-40 rounded-xl border border-zinc-800 bg-white p-2 shadow-lg"
                        />
                        <p className="mb-4 text-center text-[11px] font-medium leading-relaxed text-zinc-400">
                          Escaneie o QR Code ou copie o código abaixo.{' '}
                          <strong className="mt-1 block animate-pulse text-xs font-bold text-cyan-400">
                            Aguardando pagamento...
                          </strong>
                        </p>

                        <div className="flex w-full gap-2">
                          <button
                            onClick={() => {
                              navigator.clipboard.writeText(pixPendente.copia_cola);
                              mostrarToast('PIX Copiado!', 'sucesso');
                            }}
                            className="flex-1 rounded-xl border border-zinc-700 bg-zinc-800 py-3 text-[10px] font-bold uppercase tracking-wide text-white transition-colors hover:bg-zinc-700"
                          >
                            📋 Copiar Código
                          </button>
                          <button
                            onClick={() => setPixPendente(null)}
                            className="rounded-xl border border-rose-500/30 bg-rose-900/30 px-4 text-[10px] font-bold uppercase tracking-wide text-rose-400 transition-colors hover:bg-rose-900/80"
                          >
                            Cancelar
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form
                        onSubmit={solicitarGeracaoPix}
                        className="relative z-10 mt-auto flex flex-col gap-3"
                      >
                        <div>
                          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Valor da Recarga (R$)
                          </label>
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base font-black text-zinc-400">
                              R$
                            </span>
                            <input
                              type="number"
                              min="30"
                              step="1"
                              value={valorRecarga}
                              onChange={(e) => setValorRecarga(e.target.value)}
                              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3 pl-12 pr-4 text-base font-black text-white outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                              required
                            />
                          </div>
                        </div>

                        <div>
                          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Seu CPF (Exigência do Banco Central)
                          </label>
                          <input
                            type="text"
                            placeholder="Apenas números..."
                            value={cpfRecarga}
                            onChange={(e) => setCpfRecarga(e.target.value)}
                            maxLength="14"
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-bold text-white placeholder-zinc-600 outline-none transition-all focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500"
                            required
                          />
                        </div>

                        <div>
                          <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Cupom Promocional
                          </label>
                          <input
                            type="text"
                            placeholder="Ex: BORA20"
                            value={cupomRecarga}
                            onChange={(e) => setCupomRecarga(e.target.value.toUpperCase())}
                            className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm font-bold uppercase text-white placeholder-zinc-600 outline-none transition-all placeholder:normal-case focus:border-purple-500 focus:ring-2 focus:ring-purple-500"
                          />
                        </div>

                        <button
                          type="submit"
                          className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-600 px-6 py-3.5 text-xs font-black uppercase tracking-wider text-white shadow-lg shadow-cyan-600/20 transition-all hover:bg-cyan-500"
                        >
                          <span>Gerar PIX</span> <span className="text-base">⚡</span>
                        </button>

                        <div className="mt-3 flex flex-col items-center gap-1 border-t border-zinc-800/50 pt-3 opacity-80">
                          <div className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest text-zinc-400">
                            <span>🔒 Pagamento 100% Seguro</span>
                            <span className="text-zinc-700">•</span>
                            <span>🪙 PIX</span>
                          </div>
                          <div className="flex items-center gap-1 text-center text-[9px] font-medium text-zinc-500">
                            Processado por{' '}
                            <strong className="text-white">Asaas Instituição de Pagamento</strong>
                          </div>
                        </div>
                      </form>
                    )}
                  </section>

                  <section className="flex h-[400px] flex-col rounded-3xl border border-zinc-700/30 bg-gradient-to-br from-zinc-800/20 to-zinc-900 p-8 shadow-2xl transition-transform duration-300 hover:-translate-y-1 lg:h-[540px]">
                    <h3 className="mb-8 flex items-center gap-2 text-lg font-black tracking-tight text-white">
                      🧾 Extrato da Conta
                    </h3>
                    {extrato.length === 0 ? (
                      <div className="flex flex-1 flex-col items-center justify-center text-zinc-500">
                        <span className="mb-4 text-5xl opacity-30">💳</span>
                        <p className="text-xs font-medium">Nenhuma transação encontrada.</p>
                      </div>
                    ) : (
                      <div className="scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent flex-1 space-y-4 overflow-y-auto pr-3">
                        {extrato.map((t, i) => (
                          <div
                            key={i}
                            className="flex items-center justify-between rounded-2xl border border-zinc-800/50 bg-zinc-950/50 p-5 transition-colors hover:border-zinc-700"
                          >
                            <div className="min-w-0 pr-4">
                              <p
                                className="truncate text-xs font-bold text-zinc-200 md:text-sm"
                                title={t.descricao}
                              >
                                {t.descricao}
                              </p>
                              <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                {new Date(t.data_transacao).toLocaleString()}
                              </p>
                            </div>
                            <span
                              className={`shrink-0 text-base font-black tracking-tight md:text-lg ${t.tipo === 'ENTRADA' ? 'text-emerald-400' : 'text-rose-400'}`}
                            >
                              {t.tipo === 'ENTRADA' ? '+' : '-'} R$ {parseFloat(t.valor).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                </div>

                <details className="group overflow-hidden rounded-3xl border border-rose-500/30 bg-gradient-to-r from-rose-900/20 to-zinc-900 shadow-2xl shadow-rose-500/10 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="relative flex cursor-pointer select-none items-center justify-between p-6 font-bold text-white transition-colors hover:bg-rose-900/10 md:p-8">
                    <span className="relative z-10 flex items-center gap-3 text-lg font-black tracking-tight text-rose-400">
                      🔐 Segurança da Conta
                    </span>
                    <span className="relative z-10 text-lg text-rose-500 transition duration-300 group-open:-rotate-180">
                      ▼
                    </span>
                    <div className="pointer-events-none absolute -right-8 -top-8 text-9xl opacity-5 transition-transform duration-500 group-open:scale-110">
                      🔐
                    </div>
                  </summary>

                  <div className="animate-fade-in relative z-10 border-t border-rose-500/20 px-6 pb-6 pt-8 md:px-8 md:pb-8">
                    <p className="mb-8 max-w-2xl text-xs leading-relaxed text-zinc-400">
                      Mantenha sua conta segura alterando sua senha regularmente ou troque a senha
                      temporária que enviamos por e-mail.
                    </p>
                    <form
                      onSubmit={alterarMinhaSenha}
                      className="flex max-w-4xl flex-col items-end gap-5"
                    >
                      <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
                        <div className="relative w-full">
                          <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Senha Atual (Provisória)
                          </label>
                          <div className="relative">
                            <input
                              type={verSenhaAtual ? 'text' : 'password'}
                              placeholder="Sua senha atual"
                              value={mudarSenhaAtual}
                              onChange={(e) => setMudarSenhaAtual(e.target.value)}
                              className={`${adminInputClass} pr-12`}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setVerSenhaAtual(!verSenhaAtual)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-white"
                            >
                              {verSenhaAtual ? '🙈' : '👁️'}
                            </button>
                          </div>
                        </div>
                        <div className="relative w-full">
                          <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Nova Senha
                          </label>
                          <div className="relative">
                            <input
                              type={verSenhaNova ? 'text' : 'password'}
                              placeholder="Sua nova senha"
                              value={mudarSenhaNova}
                              onChange={(e) => setMudarSenhaNova(e.target.value)}
                              className={`${adminInputClass} pr-12`}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setVerSenhaNova(!verSenhaNova)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-white"
                            >
                              {verSenhaNova ? '🙈' : '👁️'}
                            </button>
                          </div>
                        </div>
                        <div className="relative w-full">
                          <label className="mb-2 block text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Confirme a Nova Senha
                          </label>
                          <div className="relative">
                            <input
                              type={verSenhaNovaConf ? 'text' : 'password'}
                              placeholder="Confirme a senha"
                              value={mudarSenhaNovaConfirmacao}
                              onChange={(e) => setMudarSenhaNovaConfirmacao(e.target.value)}
                              className={`${adminInputClass} pr-12`}
                              required
                            />
                            <button
                              type="button"
                              onClick={() => setVerSenhaNovaConf(!verSenhaNovaConf)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-white"
                            >
                              {verSenhaNovaConf ? '🙈' : '👁️'}
                            </button>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="mt-2 w-full whitespace-nowrap rounded-2xl border border-rose-500/50 bg-rose-600 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-rose-600/20 transition-colors hover:bg-rose-500 sm:w-auto"
                      >
                        Atualizar Senha
                      </button>
                    </form>
                  </div>
                </details>

                {usuarioLogado && usuarioLogado.codigo_indicacao && (
                  <details className="group overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/20 shadow-2xl shadow-purple-500/10 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="relative flex cursor-pointer select-none items-center justify-between p-6 transition-colors hover:bg-purple-900/10 md:p-8">
                      <span className="relative z-10 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-lg font-black tracking-tight text-transparent">
                        🎁 Indique um Amigo e Ganhe Bônus!
                      </span>
                      <span className="relative z-10 text-lg text-purple-400 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                      <div className="pointer-events-none absolute -right-10 -top-10 text-9xl opacity-5 transition-transform duration-700 group-open:scale-110">
                        🎁
                      </div>
                    </summary>

                    <div className="animate-fade-in relative z-10 border-t border-purple-500/20 px-6 pb-6 pt-8 md:px-8 md:pb-8">
                      <p className="mb-8 max-w-3xl text-xs leading-relaxed text-zinc-300">
                        Mande o seu código para um amigo. Quando ele criar uma conta nova e fizer a{' '}
                        <strong className="text-emerald-400">primeira recarga</strong>, nós daremos{' '}
                        <strong>10% do valor</strong> da recarga dele de presente para você gastar
                        em jogos!
                      </p>
                      <div className="flex flex-col items-center gap-5 sm:flex-row">
                        <div className="flex w-full items-center justify-center gap-5 rounded-2xl border border-zinc-800 bg-zinc-950 px-8 py-3.5 shadow-inner sm:w-auto">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Seu Código:
                          </span>
                          <span className="select-all text-2xl font-black tracking-widest text-white">
                            {usuarioLogado.codigo_indicacao}
                          </span>
                        </div>
                        <button
                          onClick={() => {
                            navigator.clipboard.writeText(usuarioLogado.codigo_indicacao);
                            mostrarToast('Código copiado! Envie para seus amigos.', 'sucesso');
                          }}
                          className="w-full rounded-2xl bg-purple-600 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-600/20 transition-colors hover:bg-purple-500 sm:w-auto"
                        >
                          📋 Copiar Código
                        </button>
                      </div>
                    </div>
                  </details>
                )}

                <details
                  className="group overflow-hidden rounded-3xl border border-l-4 border-emerald-500/30 border-l-emerald-500 bg-gradient-to-r from-emerald-900/20 to-zinc-900 shadow-2xl shadow-emerald-500/10 [&_summary::-webkit-details-marker]:hidden"
                  open
                >
                  <summary className="flex cursor-pointer select-none items-center justify-between p-6 transition-colors hover:bg-emerald-900/10 md:p-8">
                    <span className="flex items-center gap-3 text-lg font-black tracking-tight text-emerald-400">
                      🔑 Chaves de Acesso Ativas
                    </span>
                    <span className="text-lg text-emerald-500 transition duration-300 group-open:-rotate-180">
                      ▼
                    </span>
                  </summary>

                  <div className="animate-fade-in border-t border-emerald-500/20 px-6 pb-6 pt-8 md:px-8 md:pb-8">
                    {alugueisAtivos.length > 0 && (
                      <div className="mb-8 flex items-start gap-4 rounded-2xl border border-rose-500/50 bg-rose-950/40 p-5 shadow-inner">
                        <span className="animate-pulse text-2xl">🚨</span>
                        <div>
                          <h4 className="mb-2 text-xs font-bold uppercase tracking-wider text-rose-400">
                            Evite Bloqueio e Multa de R$ 50,00
                          </h4>
                          <p className="text-xs font-medium leading-relaxed text-zinc-300">
                            É <strong>obrigatório</strong> desativar o "Compartilhamento de Console"
                            ou "PS4 Principal" na sua conta ANTES do tempo de aluguel expirar. O
                            descumprimento gera uma multa automática e deixa seu saldo negativo.
                          </p>
                        </div>
                      </div>
                    )}

                    {alugueisAtivos.length === 0 ? (
                      <p className="text-sm font-medium text-zinc-500">
                        Nenhum jogo ativo no momento.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        {alugueisAtivos.map((item) => (
                          <div
                            key={item.locacao_id}
                            className="flex flex-col gap-6 rounded-3xl border border-emerald-500/30 bg-zinc-950/60 p-6 shadow-xl transition-colors hover:border-emerald-400/50 md:p-8"
                          >
                            <h4 className="text-xl font-black leading-tight tracking-tight text-white">
                              {item.jogo}
                            </h4>
                            <div className="flex flex-col gap-3 rounded-2xl border border-zinc-800/80 bg-black/50 p-5 shadow-inner">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                                <span className="w-14 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                  Login
                                </span>
                                <span className="select-all break-all text-sm font-bold tracking-wide text-emerald-400 md:text-base">
                                  {item.email_login}
                                </span>
                              </div>
                              <div className="my-1 h-px w-full bg-zinc-800/80"></div>
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                                <span className="w-14 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                  Senha
                                </span>
                                <span className="inline-block w-max select-all rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1 font-mono text-sm font-bold tracking-widest text-zinc-200 md:text-base">
                                  {item.senha_login}
                                </span>
                              </div>
                            </div>

                            <div className="w-full">
                              {codigosGerados2FA[item.locacao_id] ? (
                                <div className="select-all rounded-2xl border border-emerald-500/50 bg-zinc-950 py-4 text-center font-mono text-2xl font-black tracking-widest text-emerald-400 shadow-inner">
                                  {codigosGerados2FA[item.locacao_id]}
                                </div>
                              ) : (
                                <button
                                  onClick={() => gerarCodigo2FA(item.locacao_id)}
                                  className="flex w-full items-center justify-center gap-3 rounded-2xl border border-emerald-400 bg-emerald-600 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all hover:bg-emerald-500 hover:shadow-[0_0_25px_rgba(16,185,129,0.6)]"
                                >
                                  🔐 Gerar Código de Acesso (2FA)
                                </button>
                              )}
                            </div>

                            <div className="mt-2 flex flex-col items-center justify-between gap-4 sm:flex-row">
                              <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-amber-400 sm:w-auto">
                                <span>⏳ Expira:</span>
                                <span className="text-xs font-black">
                                  {new Date(item.data_fim).toLocaleString()}
                                </span>
                              </div>
                              {(() => {
                                const jogoDetalhes = jogos.find((j) => j.titulo === item.jogo);
                                const temFila = jogoDetalhes && jogoDetalhes.tamanho_fila > 0;
                                if (temFila) {
                                  return (
                                    <button
                                      onClick={() =>
                                        devolverAntecipado(item.locacao_id, item.data_fim)
                                      }
                                      className="animate-fade-in flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-900/40 px-8 py-3.5 text-xs font-bold uppercase tracking-wider text-emerald-400 shadow-lg transition-all hover:bg-emerald-600 hover:text-white sm:w-auto"
                                    >
                                      ♻️ Devolver (Cashback Ativo)
                                    </button>
                                  );
                                }
                                return null;
                              })()}
                            </div>

                            <details className="group/tut mt-6 overflow-hidden rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-900/30 to-zinc-900 shadow-[0_0_20px_rgba(16,185,129,0.2)] transition-all duration-300 hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] [&_summary::-webkit-details-marker]:hidden">
                              <summary className="flex cursor-pointer select-none items-center justify-between p-5 text-xs font-black uppercase tracking-wider text-emerald-400 transition-colors hover:bg-emerald-900/30 md:text-sm">
                                <span className="animate-pulse-slow flex items-center gap-2">
                                  📖 PASSO A PASSO DE COMO ENTRAR NA CONTA E JOGAR (PS4/PS5)
                                </span>
                                <span className="transition duration-300 group-open/tut:-rotate-180">
                                  ▼
                                </span>
                              </summary>
                              <div className="space-y-5 border-t border-emerald-500/30 bg-black/60 p-5 text-xs text-zinc-300 md:p-8">
                                <p className="mb-4 flex items-center gap-3 border-b border-rose-500/30 pb-4 text-sm font-black uppercase tracking-wider text-rose-400">
                                  <span className="animate-pulse text-xl">⚠️</span> ATENÇÃO: NUNCA
                                  ENTRE COMO CONVIDADO!
                                </p>
                                <ol className="list-decimal space-y-4 pl-6 font-medium leading-relaxed">
                                  <li>
                                    Ligue o console. Selecione{' '}
                                    <strong className="text-white">ADICIONAR USUÁRIO</strong> (na
                                    tela de boas vindas dos usuários).
                                  </li>
                                  <li>
                                    Do lado esquerdo da tela, selecione{' '}
                                    <strong className="text-white">VAMOS COMEÇAR</strong>.
                                  </li>
                                  <li>
                                    Aceite os termos e selecione{' '}
                                    <strong className="text-white">CONFIRMAR</strong>.
                                  </li>
                                  <li>
                                    Na tela com o QR Code, selecione{' '}
                                    <strong className="text-white">
                                      INICIAR SESSÃO MANUALMENTE
                                    </strong>{' '}
                                    (canto esquerdo embaixo).
                                  </li>
                                  <li>
                                    Insira o E-mail e Senha da conta que estão disponíveis acima.
                                  </li>
                                  <li>
                                    Quando o console pedir o código (2FA), clique no botão verde{' '}
                                    <strong className="text-emerald-400">
                                      "Gerar Código de Acesso (2FA)"
                                    </strong>{' '}
                                    aqui no site.
                                  </li>
                                  <li>
                                    Digite o código 2FA (6 dígitos) rapidamente, ele fica ativo por
                                    30 segundos.
                                  </li>
                                  <li>
                                    <strong className="text-rose-400">NÃO ATIVE MAIS NADA</strong>.
                                    Somente selecione OK.
                                  </li>
                                  <li>
                                    Para jogar na sua conta pessoal e ganhar os troféus, é
                                    OBRIGATÓRIO habilitar o compartilhamento:
                                    <ul className="ml-1 mt-3 list-disc space-y-3 border-l-2 border-zinc-700 pl-5 text-zinc-400">
                                      <li>
                                        <strong>No PS5:</strong> Vá em Configurações &gt; Usuários e
                                        contas &gt; Outros &gt; Compartilhamento do console... &gt;{' '}
                                        <strong className="text-white">Habilitar</strong>. (Se não
                                        estiver habilitado)
                                      </li>
                                      <li>
                                        <strong>No PS4:</strong> Vá em Configurações &gt;
                                        Gerenciamento da conta &gt;{' '}
                                        <strong className="text-white">
                                          Ativar como seu PS4 principal
                                        </strong>
                                        . (Se não estiver habilitado)
                                      </li>
                                      <li className="mt-3 flex items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-950/30 p-3.5 font-bold text-rose-400">
                                        <span className="text-lg">⚠️</span> É aqui também, que no
                                        final do seu aluguel, você vai DESABILITAR o
                                        compartilhamento.
                                      </li>
                                    </ul>
                                  </li>
                                  <li className="mt-6 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-5 text-sm font-black text-emerald-400 shadow-inner">
                                    Vá na Biblioteca da conta, coloque o jogo para baixar, volte
                                    para o seu perfil pessoal (a sua conta oficial) e divirta-se!
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

                <details className="group overflow-hidden rounded-3xl border border-l-4 border-zinc-800 border-l-amber-500 bg-zinc-900/80 shadow-2xl shadow-amber-500/10 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="flex cursor-pointer select-none items-center justify-between p-6 transition-colors hover:bg-amber-900/10 md:p-8">
                    <span className="flex items-center gap-3 text-lg font-black tracking-tight text-amber-400">
                      ⏳ Minhas Reservas (Fila de Espera)
                    </span>
                    <span className="text-lg text-amber-500 transition duration-300 group-open:-rotate-180">
                      ▼
                    </span>
                  </summary>

                  <div className="animate-fade-in border-t border-amber-500/20 px-6 pb-6 pt-8 md:px-8 md:pb-8">
                    {minhasReservas.length === 0 ? (
                      <p className="text-sm font-medium text-zinc-500">
                        Você não possui reservas ativas na fila.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        {minhasReservas.map((item) => (
                          <div
                            key={item.reserva_id}
                            className="flex flex-col gap-5 rounded-3xl border border-amber-500/30 bg-zinc-950/60 p-6 shadow-xl transition-colors hover:border-amber-400/50 md:p-8"
                          >
                            <div className="flex flex-col gap-2">
                              <h4 className="text-xl font-black leading-tight tracking-tight text-white">
                                {item.jogo}
                              </h4>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                Reservado em: {new Date(item.data_solicitacao).toLocaleString()}
                              </span>
                            </div>
                            <div className="mt-2 flex flex-col gap-3 rounded-2xl border border-zinc-800/80 bg-black/50 p-5 shadow-inner">
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                                <span className="w-20 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                  Status
                                </span>
                                <span className="w-max rounded-lg border border-amber-500/20 bg-amber-400/10 px-3 py-1 text-[10px] font-black uppercase tracking-wider text-amber-400">
                                  Aguardando Fila
                                </span>
                              </div>
                              <div className="my-1 h-px w-full bg-zinc-800/80"></div>
                              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
                                <span className="w-20 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                  Liberação
                                </span>
                                <span className="text-sm font-bold tracking-wide text-blue-400 md:text-base">
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
                  <details className="group overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-900/80 shadow-lg [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer select-none items-center justify-between p-6 transition-colors hover:bg-zinc-800/50 md:p-8">
                      <span className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-zinc-500">
                        🕰️ Últimos 5 Aluguéis
                      </span>
                      <span className="text-base text-zinc-600 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>

                    <div className="animate-fade-in flex flex-wrap gap-3 border-t border-zinc-800/50 px-6 pb-6 pt-6 md:px-8 md:pb-8">
                      {historicoAlugueis.map((item) => (
                        <span
                          key={item.locacao_id}
                          className="rounded-xl border border-zinc-800 bg-zinc-950 px-5 py-2 text-[10px] font-bold uppercase tracking-wide text-zinc-400"
                        >
                          {item.jogo}{' '}
                          <span className="ml-1 opacity-50">
                            ({new Date(item.data_fim).toLocaleDateString()})
                          </span>
                        </span>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            )}

            {abaAtual === 'faq' && (
              <div className="animate-fade-in mx-auto max-w-4xl py-8">
                <div className="mb-14 text-center">
                  <h2 className="mb-6 bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-3xl font-black tracking-tight text-transparent md:text-4xl">
                    Central de Ajuda
                  </h2>
                  <p className="text-sm font-medium text-zinc-400">
                    Tudo o que você precisa saber para alugar e jogar sem dores de cabeça.
                  </p>
                </div>

                <div className="space-y-5">
                  <details className="group rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition-transform duration-300 hover:-translate-y-1 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-6 text-white transition-colors hover:text-purple-400 md:p-8">
                      <span className="text-base font-bold tracking-tight md:text-lg">
                        🎮 Como funciona o aluguel no BORA JOGAR!?
                      </span>
                      <span className="text-lg text-purple-500 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-zinc-800/50 px-6 pb-6 pt-6 text-xs leading-relaxed text-zinc-400 md:px-8 md:pb-8 md:text-sm">
                      É super simples! Você adiciona saldo à sua carteira digital, escolhe o jogo na
                      vitrine, escolhe o número de dias que quer ficar com o jogo (7 ou 14 dias) e
                      clica em <strong className="text-white">"ALUGAR"</strong>. O valor é
                      descontado e os dados da conta (E-mail e Senha) aparecem imediatamente na sua
                      aba <strong className="text-emerald-400">🔑 MEUS ACESSOS</strong>. O aluguel
                      dura 7 ou 14 dias corridos a partir do momento da compra.
                    </div>
                  </details>

                  <details className="group rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition-transform duration-300 hover:-translate-y-1 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-6 text-white transition-colors hover:text-purple-400 md:p-8">
                      <span className="text-base font-bold tracking-tight md:text-lg">
                        🏅 Como funciona o Sistema de Ranks e a Prioridade VIP?
                      </span>
                      <span className="text-lg text-purple-500 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-zinc-800/50 px-6 pb-6 pt-6 text-xs leading-relaxed text-zinc-400 md:px-8 md:pb-8 md:text-sm">
                      Aqui no <strong>BORA JOGAR!</strong>, a sua fidelidade se transforma em
                      vantagens reais. Toda vez que você conclui um aluguel com sucesso, o seu nível
                      sobe. Quanto maior o seu Rank, mais benefícios você tem.
                      <div className="my-6 grid grid-cols-2 gap-3 md:grid-cols-3">
                        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-zinc-800 bg-zinc-950 p-3">
                          <span className="text-xl">🌱</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Novato
                          </span>
                          <span className="text-[10px] font-medium text-zinc-300">0 Locações</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-blue-900/50 bg-blue-950/20 p-3 shadow-[0_0_10px_rgba(59,130,246,0.05)]">
                          <span className="text-xl">🛡️</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">
                            Membro
                          </span>
                          <span className="text-[10px] font-medium text-zinc-300">1+ Locações</span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-purple-900/50 bg-purple-950/20 p-3 shadow-[0_0_10px_rgba(168,85,247,0.05)]">
                          <span className="text-xl">🏆</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                            Veterano
                          </span>
                          <span className="text-[10px] font-medium text-zinc-300">
                            10+ Locações
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-amber-900/50 bg-amber-950/20 p-3 shadow-[0_0_10px_rgba(245,158,11,0.05)]">
                          <span className="text-xl">⭐</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                            Especial
                          </span>
                          <span className="text-[10px] font-medium text-zinc-300">
                            20+ Locações
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-rose-900/50 bg-rose-950/20 p-3 shadow-[0_0_10px_rgba(225,29,72,0.05)]">
                          <span className="text-xl">💎</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                            VIP
                          </span>
                          <span className="text-[10px] font-medium text-zinc-300">
                            30+ Locações
                          </span>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-fuchsia-900/50 bg-fuchsia-950/20 p-3 shadow-[0_0_10px_rgba(217,70,239,0.05)]">
                          <span className="text-xl">👑</span>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-400">
                            Super VIP
                          </span>
                          <span className="text-[10px] font-medium text-zinc-300">
                            50+ Locações
                          </span>
                        </div>
                      </div>
                      <strong className="mb-2 block text-sm text-white">
                        Quais são os benefícios?
                      </strong>
                      <ul className="list-disc space-y-4 pl-5 font-medium text-zinc-300">
                        <li>
                          <strong className="text-blue-400">ACESSO ANTECIPADO:</strong> Para
                          garantir que nossos clientes fiéis sempre tenham prioridade, as reservas
                          de jogos em <strong>PRÉ-VENDA (DATA FUTURA)</strong> são exclusivas para
                          clientes a partir do Rank <strong>MEMBRO</strong>. Após o lançamento
                          oficial do jogo, ele fica liberado para todos os clientes, incluindo
                          Novatos!
                        </li>
                        <li>
                          <strong className="text-amber-400">
                            PRIORIDADE NA FILA (FURA-FILA):
                          </strong>{' '}
                          Se um jogo estiver alugado e você decidir entrar na fila de espera, o seu
                          Rank entra em ação! Se você tiver um Rank maior que outro cliente que já
                          estava na fila, o sistema automaticamente te coloca{' '}
                          <strong>na frente dele</strong>. O cliente que foi ultrapassado receberá
                          um aviso imediato com a nova data de liberação calculada.
                        </li>
                      </ul>
                    </div>
                  </details>

                  <details className="group rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition-transform duration-300 hover:-translate-y-1 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-6 text-white transition-colors hover:text-purple-400 md:p-8">
                      <span className="text-base font-bold tracking-tight md:text-lg">
                        🕹️ Como eu coloco a conta alugada no meu PlayStation?
                      </span>
                      <span className="text-lg text-purple-500 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-zinc-800/50 px-6 pb-6 pt-6 text-xs leading-relaxed text-zinc-400 md:px-8 md:pb-8 md:text-sm">
                      <ol className="list-decimal space-y-3 pl-5 font-medium text-zinc-300">
                        <li>
                          Ligue o console. Selecione{' '}
                          <strong className="text-white">ADICIONAR USUÁRIO</strong> (na tela de boas
                          vindas dos usuários).
                        </li>
                        <li>
                          Do lado esquerdo da tela, selecione{' '}
                          <strong className="text-white">VAMOS COMEÇAR</strong>.
                        </li>
                        <li>
                          Aceite os termos e selecione{' '}
                          <strong className="text-white">CONFIRMAR</strong>.
                        </li>
                        <li>
                          Na tela com o QR Code, selecione{' '}
                          <strong className="text-white">INICIAR SESSÃO MANUALMENTE</strong> (canto
                          esquerdo embaixo).
                        </li>
                        <li>Insira o E-mail e Senha da conta que estão disponíveis acima.</li>
                        <li>
                          Quando o console pedir o código (2FA), clique no botão verde{' '}
                          <strong className="text-emerald-400">
                            "GERAR CÓDIGO DE ACESSO (2FA)"
                          </strong>{' '}
                          aqui no site.
                        </li>
                        <li>
                          Digite o código 2FA (6 dígitos) rapidamente, ele fica ativo por 30
                          segundos.
                        </li>
                        <li>
                          <strong className="text-rose-400">NÃO ATIVE MAIS NADA</strong>. Somente
                          selecione OK.
                        </li>
                        <li>
                          Para jogar na sua conta pessoal e ganhar os troféus, é OBRIGATÓRIO
                          habilitar o compartilhamento:
                          <ul className="ml-1 mt-3 list-disc space-y-3 border-l-2 border-zinc-700 pl-5 text-zinc-400">
                            <li>
                              <strong>No PS5:</strong> Vá em Configurações &gt; Usuários e contas
                              &gt; Outros &gt; Compartilhamento do console... &gt;{' '}
                              <strong className="text-white">HABILITAR</strong>. (Se não estiver
                              habilitado)
                            </li>
                            <li>
                              <strong>No PS4:</strong> Vá em Configurações &gt; Gerenciamento da
                              conta &gt;{' '}
                              <strong className="text-white">ATIVAR COMO SEU PS4 PRINCIPAL</strong>.
                              (Se não estiver habilitado)
                            </li>
                            <li className="mt-3 flex items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-950/30 p-3.5 font-bold text-rose-400">
                              <span className="text-lg">⚠️</span> É aqui também, que no final do seu
                              aluguel, você vai DESATIVAR o compartilhamento.
                            </li>
                          </ul>
                        </li>
                        <li className="mt-6 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-5 text-sm font-black text-emerald-400 shadow-inner">
                          Vá na Biblioteca da conta, coloque o jogo para baixar, volte para o seu
                          perfil pessoal (a sua conta oficial) e divirta-se!
                        </li>
                      </ol>
                    </div>
                  </details>

                  <details className="group rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition-transform duration-300 hover:-translate-y-1 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-6 text-white transition-colors hover:text-purple-400 md:p-8">
                      <span className="text-base font-bold tracking-tight md:text-lg">
                        🔐 O videogame pediu um código de verificação (2FA). O que eu faço?
                      </span>
                      <span className="text-lg text-purple-500 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-zinc-800/50 px-6 pb-6 pt-6 text-xs leading-relaxed text-zinc-400 md:px-8 md:pb-8 md:text-sm">
                      A segurança vem em primeiro lugar! Na aba{' '}
                      <strong className="text-emerald-400">🔑 MEUS ACESSOS</strong>, embaixo das
                      informações da conta (Login e Senha), existe um botão verde chamado{' '}
                      <strong className="text-emerald-400">"GERAR CÓDIGO DE ACESSO (2FA)"</strong>
                      .<br />
                      <br />
                      Basta clicar nele que um código de 6 dígitos vai aparecer na sua tela. Digite
                      esse código rapidamente no seu PlayStation (ele muda a cada 30 segundos). Você
                      não precisa mandar mensagem pro suporte, o sistema gera o código para você na
                      hora!
                    </div>
                  </details>

                  <details className="group rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition-transform duration-300 hover:-translate-y-1 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-6 text-white transition-colors hover:text-purple-400 md:p-8">
                      <span className="text-base font-bold tracking-tight md:text-lg">
                        🏆 Posso jogar na minha conta pessoal e ganhar os troféus?
                      </span>
                      <span className="text-lg text-purple-500 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-zinc-800/50 px-6 pb-6 pt-6 text-xs leading-relaxed text-zinc-400 md:px-8 md:pb-8 md:text-sm">
                      <strong className="text-white">Sim, com certeza!</strong> Para isso, logo após
                      fazer o login com a conta alugada no console:
                      <ul className="mt-4 list-disc space-y-3 pl-5 font-medium text-zinc-300">
                        <li>
                          <strong>No PS5:</strong> Vá em Configurações &gt; Usuários e Contas &gt;
                          Outros &gt; <em>Compartilhamento do console e jogo offline</em> &gt;{' '}
                          <strong className="text-emerald-400">HABILITAR</strong>.
                        </li>
                        <li>
                          <strong>No PS4:</strong> Vá em Configurações &gt; Gerenciamento da conta
                          &gt; <em>Ativar como seu PS4 principal</em> &gt;{' '}
                          <strong className="text-emerald-400">HABILITAR</strong>.
                        </li>
                      </ul>
                      <div className="mt-4">
                        Depois disso, inicie o download do jogo, troque para a sua conta pessoal (a
                        sua oficial) e jogue normalmente. Os saves e troféus ficarão nela!
                      </div>
                    </div>
                  </details>

                  <details className="group rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition-transform duration-300 hover:-translate-y-1 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-6 text-white transition-colors hover:text-purple-400 md:p-8">
                      <span className="text-base font-bold tracking-tight md:text-lg">
                        ⏳ E se o jogo que eu quero estiver "Alugado"?
                      </span>
                      <span className="text-lg text-purple-500 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-zinc-800/50 px-6 pb-6 pt-6 text-xs leading-relaxed text-zinc-400 md:px-8 md:pb-8 md:text-sm">
                      Não se preocupe, você pode garantir a sua vaga! Clique no botão{' '}
                      <strong className="text-amber-400">"RESERVAR"</strong> (7 ou 14 dias). O valor
                      do jogo será investido e você verá uma data de <em>Previsão de Liberação</em>{' '}
                      em <strong className="text-emerald-400">🔑 MEUS ACESSOS</strong>
                      . <br />
                      <br />
                      Nosso sistema inteligente repassa a conta automaticamente para você no exato
                      segundo em que o aluguel do cliente anterior terminar.
                    </div>
                  </details>

                  <details className="group rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition-transform duration-300 hover:-translate-y-1 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-6 text-emerald-400 transition-colors hover:text-emerald-300 md:p-8">
                      <span className="text-base font-bold tracking-tight md:text-lg">
                        ♻️ Posso devolver um jogo antes do prazo e receber cashback?
                      </span>
                      <span className="text-lg text-emerald-500 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-emerald-800/50 px-6 pb-6 pt-6 text-xs leading-relaxed text-zinc-400 md:px-8 md:pb-8 md:text-sm">
                      Nós possuímos um sistema de{' '}
                      <strong className="text-white">DEVOLUÇÃO DINÂMICA</strong>! Essa opção fica
                      ativa automaticamente apenas quando o jogo que você alugou está com{' '}
                      <strong className="text-rose-400">ALTA DEMANDA</strong> (ou seja, quando
                      existem outras pessoas na fila de espera aguardando para jogar).
                      <br />
                      <br />
                      Se este for o caso, um botão verde{' '}
                      <strong className="text-emerald-400">"♻️ DEVOLVER"</strong> aparecerá ao lado
                      do seu jogo na aba{' '}
                      <strong className="text-emerald-400">🔑 MEUS ACESSOS</strong>. Ao fazer a
                      devolução antecipada para agilizar a fila, você ganha uma recompensa:{' '}
                      <strong className="text-emerald-400">
                        R$ {configSistema.valor_por_dia.toFixed(2)} de cashback por cada 24 horas (1
                        dia completo)
                      </strong>{' '}
                      que ainda restavam no seu prazo!
                      <br />
                      <br />O valor cai direto na sua carteira digital assim que a nossa equipe
                      verificar que a conta foi devidamente desativada do seu console.
                    </div>
                  </details>

                  <details className="group rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition-transform duration-300 hover:-translate-y-1 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer items-center justify-between p-6 text-rose-400 transition-colors hover:text-rose-300 md:p-8">
                      <span className="text-base font-bold tracking-tight md:text-lg">
                        🚨 O que acontece se eu esquecer de desativar a conta do meu videogame?
                      </span>
                      <span className="text-lg text-rose-500 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-rose-800/50 px-6 pb-6 pt-6 text-xs leading-relaxed text-zinc-400 md:px-8 md:pb-8 md:text-sm">
                      Essa é a nossa regra mais rigorosa! Se o seu tempo acabar e você deixar a
                      conta ativada como "Principal" no seu console, isso bloqueia a conta e impede
                      que o próximo cliente da fila jogue. Quando isso acontece, nós solicitamos à
                      Sony que faça a desabilitação. Isso pode causar banimento!
                      <br />
                      <br />
                      Neste caso, nosso sistema aplica uma{' '}
                      <strong className="text-rose-400">
                        MULTA ADMINISTRATIVA AUTOMÁTICA DE R$ 50,00
                      </strong>{' '}
                      direto na sua carteira digital. Se você não tiver saldo, sua conta ficará
                      negativada e bloqueada para alugar jogos. Por isso, sempre desabilite a conta
                      como "Principal" no seu console quando seu aluguel acabar.
                      <br />
                      <br />
                      Se tiver alguma dúvida sobre como desabilitar a conta como "Principal" no seu
                      console, consulte o tutorial que fica disponível junto com as informações da
                      conta ou entre em contato conosco e te ajudaremos. É simples e rápido!
                    </div>
                  </details>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* PÁGINA: TERMOS DE USO                                                     */}
            {/* ========================================================================= */}
            {abaAtual === 'termos' && (
              <div className="animate-fade-in mx-auto max-w-4xl py-8">
                <div className="mb-10 border-b border-zinc-800 pb-8">
                  <h2 className="mb-4 text-3xl font-black tracking-tight text-white md:text-4xl">
                    Termos de Uso
                  </h2>
                  <p className="text-sm font-medium text-zinc-400">
                    Última atualização: Abril de 2026
                  </p>
                </div>

                <div className="space-y-8 text-sm leading-relaxed text-zinc-300 md:text-base">
                  <section>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-blue-400">
                      1. Objeto e Natureza do Serviço
                    </h3>
                    <p>
                      A BORA JOGAR! oferece o serviço de locação de licenças de jogos digitais em
                      contas secundárias para os consoles PlayStation 4 e PlayStation 5. O usuário
                      adquire o direito de acessar a conta fornecida, baixar o jogo e jogá-lo em seu
                      perfil pessoal durante o período contratado (7 ou 14 dias).
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-blue-400">
                      2. Regras de Instalação e Uso
                    </h3>
                    <ul className="list-disc space-y-2 pl-5 text-zinc-400">
                      <li>
                        É expressamente <strong className="text-rose-400">PROIBIDO</strong> entrar
                        na conta fornecida utilizando a opção "Jogar como Convidado".
                      </li>
                      <li>
                        O usuário compromete-se a{' '}
                        <strong className="text-white">NÃO ALTERAR</strong> nenhum dado da conta
                        fornecida, incluindo (mas não se limitando a): E-mail, Senha, ID Online,
                        Avatar ou configurações de segurança (2FA). Qualquer tentativa de alteração
                        será registrada pelo sistema da Sony e resultará no banimento permanente do
                        usuário em nossa plataforma e acionamento das medidas legais cabíveis.
                      </li>
                      <li>
                        O usuário está autorizado a ativar o "Compartilhamento do Console e Jogo
                        Offline" (PS5) ou "Ativar como PS4 Principal" (PS4) para jogar em sua conta
                        pessoal e conquistar seus próprios troféus.
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-rose-400">
                      3. Devolução Obrigatória e Multa por Atraso
                    </h3>
                    <p>
                      Ao término do período de locação, o usuário perde o direito de acesso ao jogo.
                      É <strong>obrigação exclusiva do usuário</strong> acessar as configurações do
                      seu console e <strong className="text-rose-400">DESATIVAR</strong> o
                      Compartilhamento de Console (PS5) ou a conta como Principal (PS4) antes de
                      excluir o usuário do videogame.
                    </p>
                    <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
                      <strong className="mb-1 block text-rose-400">
                        Cláusula de Multa Administrativa:
                      </strong>
                      <p className="text-sm text-zinc-400">
                        A não desativação da conta prende a licença no console do usuário, impedindo
                        que o próximo cliente da fila jogue. Caso isso ocorra, o sistema aplicará
                        uma{' '}
                        <strong className="text-white">
                          Multa Administrativa Automática de R$ 50,00
                        </strong>
                        . O saldo do usuário ficará negativo e a conta suspensa até a regularização
                        do débito e liberação da licença.
                      </p>
                    </div>
                  </section>

                  <section>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-emerald-400">
                      4. Sistema de Devolução Dinâmica (Cashback)
                    </h3>
                    <p>
                      Caso o jogo alugado possua fila de espera, o botão "Devolver" ficará ativo no
                      painel do usuário. Ao optar pela devolução antecipada para agilizar a fila, o
                      usuário receberá um reembolso em créditos na carteira digital (Cashback) de
                      acordo com os dias inteiros não utilizados, conforme tabela vigente no site no
                      momento da devolução.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-blue-400">
                      5. Fila de Espera (Reservas)
                    </h3>
                    <p>
                      Ao reservar um jogo indisponível, o valor integral é retido da carteira do
                      usuário. O sistema transferirá as credenciais de acesso automaticamente no
                      exato momento em que a locação do usuário anterior for encerrada. O prazo de 7
                      ou 14 dias só começa a contar a partir do momento em que a conta é liberada no
                      painel.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-blue-400">
                      6. Infrações e Banimentos da Sony
                    </h3>
                    <p>
                      A BORA JOGAR! não se responsabiliza por banimentos sofridos no console do
                      usuário devido à quebra dos Termos de Serviço da PlayStation Network. Caso o
                      usuário utilize softwares de trapaça (hacks/exploits) ou conduta tóxica que
                      resulte no banimento da nossa conta fornecida, o usuário será cobrado
                      judicialmente pelo valor integral de compra do jogo perdido.
                    </p>
                  </section>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* PÁGINA: POLÍTICA DE PRIVACIDADE                                           */}
            {/* ========================================================================= */}
            {abaAtual === 'privacidade' && (
              <div className="animate-fade-in mx-auto max-w-4xl py-8">
                <div className="mb-10 border-b border-zinc-800 pb-8">
                  <h2 className="mb-4 text-3xl font-black tracking-tight text-white md:text-4xl">
                    Política de Privacidade
                  </h2>
                  <p className="text-sm font-medium text-zinc-400">
                    Última atualização: Abril de 2026
                  </p>
                </div>

                <div className="space-y-8 text-sm leading-relaxed text-zinc-300 md:text-base">
                  <section>
                    <p className="text-zinc-400">
                      A sua privacidade é nossa prioridade. Esta política descreve como a BORA
                      JOGAR! coleta, utiliza e protege os seus dados pessoais ao utilizar nossa
                      plataforma, em total conformidade com a Lei Geral de Proteção de Dados (LGPD -
                      Lei nº 13.709/2018).
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-emerald-400">
                      1. Dados que Coletamos
                    </h3>
                    <p>
                      Para o funcionamento da plataforma e liberação das locações, coletamos as
                      seguintes informações no momento do seu cadastro:
                    </p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-400">
                      <li>Nome Completo</li>
                      <li>Endereço de E-mail</li>
                      <li>Número de Telefone (WhatsApp)</li>
                      <li>
                        Senha (armazenada de forma criptografada e inacessível até mesmo para nossos
                        administradores).
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-emerald-400">
                      2. Como Utilizamos seus Dados
                    </h3>
                    <p>As informações coletadas são estritamente utilizadas para:</p>
                    <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-400">
                      <li>Criar e gerenciar sua carteira digital dentro da plataforma.</li>
                      <li>Enviar credenciais de acesso aos jogos alugados.</li>
                      <li>
                        Notificar via e-mail ou WhatsApp quando a fila de espera do seu jogo
                        favorito andar.
                      </li>
                      <li>
                        Fornecer suporte técnico e prevenir fraudes ou apropriação indevida das
                        contas da locadora.
                      </li>
                    </ul>
                  </section>

                  <section>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-emerald-400">
                      3. Proteção e Pagamentos
                    </h3>
                    <p>
                      A BORA JOGAR! <strong className="text-white">NÃO armazena</strong> dados
                      bancários, números de cartão de crédito ou chaves PIX de suas contas pessoais.
                      Todo o processamento financeiro é realizado em ambiente blindado e seguro
                      através da instituição de pagamento parceira oficial (Asaas).
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-emerald-400">
                      4. Compartilhamento de Dados
                    </h3>
                    <p>
                      Nós não vendemos, alugamos ou repassamos seus dados pessoais para terceiros ou
                      agências de publicidade sob nenhuma hipótese. Seus dados são mantidos em
                      servidores seguros e acessados apenas pelo sistema automatizado para garantir
                      o seu aluguel.
                    </p>
                  </section>

                  <section>
                    <h3 className="mb-3 text-xl font-bold tracking-tight text-emerald-400">
                      5. Seus Direitos
                    </h3>
                    <p>
                      Você tem o direito de solicitar a exclusão da sua conta e de todos os seus
                      dados de nossos servidores a qualquer momento. A exclusão será processada em
                      até 72 horas, desde que não existam locações ativas, pendências de devolução
                      no console ou saldos negativos (multas) em aberto.
                    </p>
                  </section>
                </div>
              </div>
            )}

            {abaAtual === 'admin' && usuarioLogado.is_admin && (
              <div className="animate-fade-in mx-auto mt-2 max-w-6xl">
                <h2 className="mb-8 text-2xl font-black tracking-tight text-white md:text-3xl">
                  Administração do Sistema
                </h2>
                {/* 📊 BLOCOS ESTATISTICAS DO SISTEMA */}
                <div className="mb-4 flex justify-end">
                  <select
                    value={periodoFiltroEstatisticas}
                    onChange={(e) => {
                      const novoPeriodo = e.target.value;
                      setPeriodoFiltroEstatisticas(novoPeriodo);
                      fetch(
                        `https://borajogar-api.onrender.com/admin/estatisticas?periodo=${novoPeriodo}`,
                        { headers: getAuthHeaders() },
                      )
                        .then((res) =>
                          res.ok
                            ? res.json()
                            : {
                                faturamento: 0,
                                total_clientes: 0,
                                locacoes_ativas: 0,
                              },
                        )
                        .then((dados) => setEstatisticasAdmin(dados));
                    }}
                    className="cursor-pointer rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 shadow-lg outline-none transition-all hover:border-emerald-500/50"
                  >
                    <option value="mes">📅 Mês Atual</option>
                    <option value="30dias">⏳ Últimos 30 Dias</option>
                    <option value="ano">🗓️ Ano Atual</option>
                    <option value="tudo">♾️ Todo o Período</option>
                  </select>
                </div>
                <section className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-3">
                  <div className="relative overflow-hidden rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900/40 to-zinc-900 p-8 shadow-xl shadow-emerald-500/10 transition-transform duration-300 hover:-translate-y-1">
                    <div className="absolute -right-4 -top-4 text-8xl opacity-5">💰</div>
                    <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      Faturamento Total
                    </h4>
                    <span className="text-3xl font-black tracking-tighter text-emerald-400 md:text-4xl">
                      R$ {estatisticasAdmin.faturamento.toFixed(2)}
                    </span>
                  </div>
                  <div className="relative overflow-hidden rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-900/40 to-zinc-900 p-8 shadow-xl shadow-blue-500/10 transition-transform duration-300 hover:-translate-y-1">
                    <div className="absolute -right-4 -top-4 text-8xl opacity-5">👥</div>
                    <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      Clientes Cadastrados
                    </h4>
                    <span className="text-3xl font-black tracking-tighter text-blue-400 md:text-4xl">
                      {estatisticasAdmin.total_clientes}
                    </span>
                  </div>
                  <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-gradient-to-br from-amber-900/40 to-zinc-900 p-8 shadow-xl shadow-amber-500/10 transition-transform duration-300 hover:-translate-y-1">
                    <div className="absolute -right-4 -top-4 text-8xl opacity-5">🎮</div>
                    <h4 className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      Locações Ativas
                    </h4>
                    <span className="text-3xl font-black tracking-tighter text-amber-400 md:text-4xl">
                      {estatisticasAdmin.locacoes_ativas || 0}
                    </span>
                  </div>
                </section>

                <div className="mb-10 flex flex-col gap-8">
                  {/* 🖼️ BLOCO CONFIGURAÇÕES DA VITRINE E BANNERS */}
                  <details className="group overflow-hidden rounded-3xl border border-l-4 border-zinc-800 border-l-orange-500 bg-zinc-900/80 shadow-2xl shadow-orange-500/10 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="relative flex cursor-pointer select-none items-center justify-between p-6 transition-colors hover:bg-orange-900/10 md:p-8">
                      <span className="relative z-10 flex items-center gap-3 text-lg font-black tracking-tight text-orange-400">
                        🖼️ Configurações da Vitrine e Banners
                      </span>
                      <span className="relative z-10 text-lg text-orange-500 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-zinc-800/50 px-6 pb-6 pt-8 md:px-8 md:pb-8">
                      <div className="mb-4 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
                        <div>
                          <h4 className="text-base font-bold tracking-tight text-white">
                            📣 Hero Alert (Faixa de Anúncio)
                          </h4>
                          <p className="mt-1 text-xs font-medium text-zinc-400">
                            Faixa colorida que aparece abaixo dos banners principais.
                          </p>
                        </div>
                        <button
                          onClick={toggleAnuncio}
                          className={`w-full rounded-xl px-6 py-3 text-xs font-bold uppercase tracking-wider shadow-lg transition-all sm:w-auto ${configSistema.anuncio_ativo ? 'bg-orange-600 text-white shadow-orange-600/20' : 'border border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white'}`}
                        >
                          {configSistema.anuncio_ativo ? '✅ FAIXA LIGADA' : '❌ FAIXA DESLIGADA'}
                        </button>
                      </div>
                      <textarea
                        placeholder="Ex: PROMOÇÃO DE FIM DE SEMANA! Recarregue R$ 50..."
                        value={configSistema.mensagem_anuncio}
                        onChange={(e) =>
                          setConfigSistema({
                            ...configSistema,
                            mensagem_anuncio: e.target.value,
                          })
                        }
                        className={`${adminInputClass} h-16 resize-none border-zinc-700 bg-zinc-950 text-sm focus:ring-orange-500`}
                      />

                      <div className="mt-8 border-t border-zinc-800/50 pt-6">
                        <h4 className="text-base font-bold tracking-tight text-white">
                          🖼️ Banners do Carrossel (Imagens)
                        </h4>
                        <p className="mb-4 mt-1 text-xs font-medium text-zinc-400">
                          Cole as URLs das imagens que irão ficar trocando no topo do site.{' '}
                          <strong className="text-emerald-400">
                            Separe cada URL com uma vírgula.
                          </strong>
                        </p>
                        <textarea
                          placeholder="https://imagem1.jpg, https://imagem2.jpg..."
                          value={configSistema.banners_url || ''}
                          onChange={(e) =>
                            setConfigSistema({
                              ...configSistema,
                              banners_url: e.target.value,
                            })
                          }
                          className={`${adminInputClass} h-24 resize-none border-zinc-700 bg-zinc-950 text-sm focus:ring-orange-500`}
                        />
                      </div>

                      <div className="mt-6 flex justify-end">
                        <button
                          onClick={salvarConfiguracoesGlobais}
                          className="rounded-xl bg-blue-600 px-8 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-500"
                        >
                          💾 Salvar Configurações
                        </button>
                      </div>
                    </div>
                  </details>

                  {/* 📊 BLOCO GESTÃO DA ENQUETE */}
                  <details className="group overflow-hidden rounded-3xl border border-l-4 border-fuchsia-500/30 border-l-fuchsia-500 bg-gradient-to-r from-fuchsia-900/20 to-zinc-900 shadow-2xl shadow-fuchsia-500/10 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="relative flex cursor-pointer select-none items-center justify-between p-6 transition-colors hover:bg-fuchsia-900/10 md:p-8">
                      <span className="relative z-10 flex items-center gap-3 text-lg font-black tracking-tight text-fuchsia-400">
                        📊 Gestão da Enquete
                      </span>
                      <span className="relative z-10 text-lg text-fuchsia-500 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-fuchsia-500/20 px-6 pb-6 pt-8 md:px-8 md:pb-8">
                      <div className="flex flex-col gap-8 lg:flex-row">
                        <form
                          onSubmit={adicionarOpcaoEnquete}
                          className="flex flex-1 flex-col gap-4"
                        >
                          <h4 className="mb-2 text-sm font-bold tracking-tight text-white">
                            Adicionar Opção (Máx. Recomendado: 5)
                          </h4>
                          <input
                            type="text"
                            placeholder="Título do Jogo"
                            value={novaOpcaoEnqueteTitulo}
                            onChange={(e) => setNovaOpcaoEnqueteTitulo(e.target.value)}
                            className={adminInputClass}
                            required
                          />
                          <input
                            type="url"
                            placeholder="URL da Capa"
                            value={novaOpcaoEnqueteImagem}
                            onChange={(e) => setNovaOpcaoEnqueteImagem(e.target.value)}
                            className={adminInputClass}
                            required
                          />
                          <button
                            type="submit"
                            className="mt-2 rounded-xl bg-fuchsia-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-fuchsia-500/20 transition-colors hover:bg-fuchsia-500"
                          >
                            Salvar Opção
                          </button>
                        </form>

                        <div className="flex-1 rounded-2xl border border-zinc-800/80 bg-zinc-950/50 p-5">
                          <div className="mb-4 flex items-center justify-between">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                              Opções Atuais
                            </h4>
                            <button
                              onClick={limparEnquete}
                              type="button"
                              className="rounded-lg border border-rose-500/30 bg-rose-900/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-400 transition-colors hover:bg-rose-600 hover:text-white"
                            >
                              Limpar Enquete
                            </button>
                          </div>
                          <div className="custom-scrollbar flex max-h-[200px] flex-col gap-3 overflow-y-auto pr-2">
                            {enqueteOpcoes.length === 0 ? (
                              <p className="text-xs font-medium text-zinc-500">
                                Nenhuma opção cadastrada.
                              </p>
                            ) : (
                              enqueteOpcoes.map((op) => (
                                <div
                                  key={op.id}
                                  className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 p-3"
                                >
                                  <div className="flex items-center gap-3">
                                    <img
                                      src={op.url_imagem}
                                      className="h-10 w-10 rounded-lg border border-zinc-700 object-cover"
                                      alt="capa"
                                    />
                                    <div className="flex flex-col">
                                      <span className="text-xs font-bold text-white">
                                        {op.titulo}
                                      </span>
                                      <span className="text-[10px] font-black text-fuchsia-400">
                                        {op.total_votos} votos
                                      </span>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => removerOpcaoEnquete(op.id)}
                                    className="text-lg text-zinc-500 transition-colors hover:text-rose-400"
                                    title="Remover"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </details>

                  {/* 🎫 BLOCO CUPONS PROMOCIONAIS */}
                  <details className="group overflow-hidden rounded-3xl border border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-zinc-900 shadow-2xl shadow-purple-500/10 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="relative flex cursor-pointer select-none items-center justify-between p-6 transition-colors hover:bg-purple-900/10 md:p-8">
                      <span className="relative z-10 flex items-center gap-3 text-lg font-black tracking-tight text-purple-400">
                        🎫 Gerenciar Cupons Promocionais
                      </span>
                      <span className="relative z-10 text-lg text-purple-500 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-purple-500/20 px-6 pb-6 pt-8 md:px-8 md:pb-8">
                      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
                        <form
                          onSubmit={cadastrarCupom}
                          className="flex flex-col gap-4 lg:col-span-1"
                        >
                          <input
                            type="text"
                            placeholder="Código (Ex: VIP20)"
                            value={novoCupomCodigo}
                            onChange={(e) => setNovoCupomCodigo(e.target.value.toUpperCase())}
                            className={adminInputClass}
                            required
                          />
                          <div className="flex gap-3">
                            <select
                              value={novoCupomTipo}
                              onChange={(e) => setNovoCupomTipo(e.target.value)}
                              className={adminInputClass}
                            >
                              <option value="PORCENTAGEM">% Porcentagem</option>
                              <option value="FIXO">R$ Valor Fixo</option>
                            </select>
                            <input
                              type="number"
                              step="0.01"
                              placeholder="Valor"
                              value={novoCupomValor}
                              onChange={(e) => setNovoCupomValor(e.target.value)}
                              className={adminInputClass}
                              required
                            />
                          </div>
                          <button
                            type="submit"
                            className="mt-2 w-full rounded-xl bg-purple-600 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-purple-500/20 transition-colors hover:bg-purple-500"
                          >
                            Criar Cupom
                          </button>
                        </form>

                        <div className="scrollbar-thin scrollbar-thumb-purple-700 scrollbar-track-transparent max-h-[200px] overflow-y-auto pr-3 lg:col-span-2">
                          {listaCupons.length === 0 ? (
                            <p className="text-sm font-medium text-zinc-500">Nenhum cupom ativo.</p>
                          ) : (
                            <table className="w-full whitespace-nowrap text-left text-sm">
                              <thead>
                                <tr className="border-b border-purple-500/30 text-zinc-400">
                                  <th className="pb-3 text-[10px] font-bold uppercase tracking-wider">
                                    Código
                                  </th>
                                  <th className="pb-3 text-[10px] font-bold uppercase tracking-wider">
                                    Tipo
                                  </th>
                                  <th className="pb-3 text-[10px] font-bold uppercase tracking-wider">
                                    Bônus
                                  </th>
                                  <th className="pb-3 text-right text-[10px] font-bold uppercase tracking-wider">
                                    Ação
                                  </th>
                                </tr>
                              </thead>
                              <tbody>
                                {listaCupons.map((c) => (
                                  <tr
                                    key={c.id}
                                    className="border-b border-purple-500/10 transition-colors hover:bg-purple-900/20"
                                  >
                                    <td className="py-4 text-sm font-black tracking-widest text-white">
                                      {c.codigo}
                                    </td>
                                    <td className="py-4 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                                      {c.tipo}
                                    </td>
                                    <td className="py-4 text-sm font-black text-emerald-400">
                                      {c.tipo === 'FIXO'
                                        ? `+ R$ ${c.valor.toFixed(2)}`
                                        : `+ ${c.valor}%`}
                                    </td>
                                    <td className="py-4 text-right">
                                      <button
                                        onClick={() => removerCupom(c.id)}
                                        className="rounded-lg border border-rose-500/30 bg-rose-900/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-400 transition-colors hover:text-white"
                                      >
                                        Excluir
                                      </button>
                                    </td>
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
                  <section className="animate-pulse-slow mb-10 rounded-3xl border border-rose-500/50 bg-rose-950/20 p-8 shadow-2xl shadow-rose-500/10">
                    <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                      <div>
                        <h3 className="mb-2 flex items-center gap-3 text-xl font-black tracking-tight text-rose-400">
                          🚨 Atenção: Troca de Senha Necessária
                        </h3>
                        <p className="text-xs font-medium text-zinc-300 md:text-sm">
                          As locações abaixo terminaram. Altere a senha na PSN e informe aqui para
                          liberar a conta.
                        </p>
                      </div>
                    </div>

                    <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-rose-500/20 bg-rose-950/30 p-4 shadow-inner md:flex-row">
                      <input
                        type="text"
                        placeholder="🔍 Buscar por jogo ou último cliente..."
                        value={buscaManutencao}
                        onChange={(e) => setBuscaManutencao(e.target.value)}
                        className={`${adminInputClass} flex-1 border-rose-500/30 focus:ring-rose-500`}
                      />
                      <div className="flex w-full flex-col gap-1 md:w-auto">
                        <select
                          value={ordenacaoManutencao}
                          onChange={(e) => setOrdenacaoManutencao(e.target.value)}
                          className="h-full w-full cursor-pointer rounded-xl border border-rose-500/30 bg-zinc-900 px-3 py-2.5 text-sm font-bold text-zinc-300 outline-none transition-colors hover:border-rose-400 focus:ring-2 focus:ring-rose-500 md:w-56"
                        >
                          <option value="urgente">⚠️ Mais Urgentes (Cashback)</option>
                          <option value="az_jogo">🎮 Jogo (A-Z)</option>
                        </select>
                      </div>
                    </div>

                    {contasManutencaoFiltradas.length === 0 ? (
                      <p className="py-8 text-center text-sm font-medium text-zinc-500">
                        Nenhuma conta em manutenção no momento.
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                        {contasManutencaoFiltradas.map((conta) => (
                          <div
                            key={conta.conta_psn_id}
                            className="flex flex-col gap-6 rounded-3xl border border-rose-500/50 bg-zinc-900 p-6 shadow-lg md:p-8"
                          >
                            <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
                              <div className="flex flex-col gap-1.5">
                                <strong className="text-lg font-black tracking-tight text-white">
                                  {conta.jogo}
                                </strong>
                                <span className="text-xs font-bold tracking-wide text-zinc-400">
                                  Login:{' '}
                                  <span className="select-all font-medium text-white">
                                    {conta.email_login}
                                  </span>
                                </span>
                                <span className="text-xs font-bold tracking-wide text-zinc-500 line-through">
                                  Senha Velha:{' '}
                                  <span className="font-mono">{conta.senha_antiga}</span>
                                </span>

                                <span className="mt-4 w-max rounded-xl border border-amber-500/20 bg-amber-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-amber-500">
                                  Último Cliente: {conta.ultimo_cliente_nome || 'Desconhecido'}
                                </span>

                                {conta.cashback_pendente > 0 && (
                                  <span className="mt-3 w-max rounded-xl border border-emerald-500/30 bg-emerald-400/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                                    💸 Cashback Pendente: R$ {conta.cashback_pendente.toFixed(2)}
                                  </span>
                                )}
                              </div>

                              <div className="flex w-full flex-col gap-3 sm:w-auto">
                                {conta.ultimo_cliente_telefone && (
                                  <button
                                    onClick={() =>
                                      cobrarNoWhatsApp(
                                        conta.ultimo_cliente_nome,
                                        conta.ultimo_cliente_telefone,
                                        conta.jogo,
                                      )
                                    }
                                    className="flex items-center justify-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-900/40 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 shadow transition-colors hover:bg-emerald-600 hover:text-white"
                                  >
                                    📱 Cobrar via Whats
                                  </button>
                                )}
                                {conta.ultimo_cliente_id && (
                                  <button
                                    onClick={() =>
                                      aplicarMultaCliente(
                                        conta.ultimo_cliente_id,
                                        conta.ultimo_cliente_nome,
                                      )
                                    }
                                    className="flex items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-900/40 px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-rose-400 shadow transition-colors hover:bg-rose-600 hover:text-white"
                                  >
                                    🚨 Aplicar Multa
                                  </button>
                                )}
                              </div>
                            </div>

                            <div className="mt-2 flex flex-col gap-3 border-t border-rose-900/50 pt-6 sm:flex-row">
                              <input
                                type="text"
                                placeholder="Digite a NOVA senha para liberar"
                                value={novasSenhasTemp[conta.conta_psn_id] || ''}
                                onChange={(e) =>
                                  setNovasSenhasTemp({
                                    ...novasSenhasTemp,
                                    [conta.conta_psn_id]: e.target.value,
                                  })
                                }
                                className="flex-1 rounded-2xl border border-zinc-800 bg-zinc-950 px-5 py-3.5 text-sm font-bold text-white outline-none focus:border-rose-500"
                              />
                              <button
                                onClick={() => confirmarResetSenha(conta.conta_psn_id)}
                                className="whitespace-nowrap rounded-2xl bg-emerald-600 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-emerald-600/20 transition-colors hover:bg-emerald-500"
                              >
                                Liberar Jogo
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </section>
                )}

                <div className="mb-10 grid grid-cols-1 gap-8 xl:grid-cols-2">
                  {/* ➕ BLOCO CADASTRAR NOVO JOGO */}
                  <div className="flex flex-col rounded-3xl border border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-zinc-900 p-8 shadow-2xl shadow-blue-500/10">
                    <h3 className="mb-8 flex items-center gap-3 text-lg font-black tracking-tight text-blue-400">
                      ➕ Cadastrar Novo Jogo
                    </h3>
                    <form onSubmit={cadastrarJogo} className="flex flex-1 flex-col space-y-4">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Título do jogo"
                          value={novoJogoTitulo}
                          onChange={(e) => setNovoJogoTitulo(e.target.value)}
                          className={adminInputClass}
                          required
                        />
                        <button
                          type="button"
                          onClick={buscarDadosDoJogo}
                          className="whitespace-nowrap rounded-xl bg-amber-500 px-5 text-[10px] font-bold uppercase tracking-wider text-zinc-900 shadow-lg shadow-amber-500/20 transition-colors hover:bg-amber-400"
                        >
                          ✨ Buscar
                        </button>
                      </div>

                      <div className="flex flex-col gap-4 md:flex-row">
                        <div className="w-full">
                          <select
                            value={novoJogoPlataforma}
                            onChange={(e) => setNovoJogoPlataforma(e.target.value)}
                            className={adminInputClass}
                          >
                            <option value="PS5">PS5</option>
                            <option value="PS4/PS5">PS4/PS5</option>
                          </select>
                        </div>
                        <div className="relative w-full">
                          <label className="absolute -top-2 left-3 bg-zinc-900 px-1 text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                            Lançamento (Pré-venda)
                          </label>
                          <input
                            type="date"
                            value={novoJogoDataLancamento}
                            onChange={(e) => setNovoJogoDataLancamento(e.target.value)}
                            className={adminInputClass}
                          />
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Tempo (ex: 20h)"
                          value={novoJogoTempo}
                          onChange={(e) => setNovoJogoTempo(e.target.value)}
                          className={adminInputClass}
                        />
                        <input
                          type="number"
                          step="0.1"
                          placeholder="Nota"
                          value={novoJogoNota}
                          onChange={(e) => setNovoJogoNota(e.target.value)}
                          className={adminInputClass}
                        />
                      </div>
                      <input
                        type="url"
                        placeholder="URL da Capa"
                        value={novoJogoImagem}
                        onChange={(e) => setNovoJogoImagem(e.target.value)}
                        className={adminInputClass}
                      />
                      <div className="flex gap-3">
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Preço 7 Dias (Ex: 35.00)"
                          value={novoJogoPreco}
                          onChange={(e) => setNovoJogoPreco(e.target.value)}
                          className={adminInputClass}
                          required
                        />
                        <input
                          type="number"
                          step="0.01"
                          placeholder="Preço 14 Dias (Ex: 60.00)"
                          value={novoJogoPreco14}
                          onChange={(e) => setNovoJogoPreco14(e.target.value)}
                          className={adminInputClass}
                        />
                      </div>
                      <textarea
                        placeholder="Descrição curta do jogo..."
                        value={novoJogoDescricao}
                        onChange={(e) => setNovoJogoDescricao(e.target.value)}
                        className={`${adminInputClass} h-24 resize-none`}
                        required
                      />
                      <button
                        type="submit"
                        className="mt-auto w-full rounded-xl bg-blue-600 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-blue-500/20 transition-colors hover:bg-blue-500"
                      >
                        Salvar no Catálogo
                      </button>
                    </form>
                  </div>

                  {/* 📦 BLOCO ABASTECER ESTOQUE */}
                  <div className="flex flex-col rounded-3xl border border-fuchsia-500/30 bg-gradient-to-br from-fuchsia-900/20 to-zinc-900 p-8 shadow-2xl shadow-fuchsia-500/10">
                    <h3 className="mb-8 flex items-center gap-3 text-lg font-black tracking-tight text-fuchsia-400">
                      📦 Abastecer Estoque
                    </h3>
                    <input
                      type="text"
                      placeholder="🔍 Filtrar jogo na lista abaixo..."
                      value={buscaEstoque}
                      onChange={(e) => setBuscaEstoque(e.target.value)}
                      className={`${adminInputClass} mb-4 border-fuchsia-500/30 focus:ring-fuchsia-500`}
                    />
                    <form onSubmit={cadastrarConta} className="flex flex-1 flex-col space-y-4">
                      <select
                        value={novaContaJogoId}
                        onChange={(e) => setNovaContaJogoId(e.target.value)}
                        className={adminInputClass}
                        required
                      >
                        <option value="">Selecione o Jogo...</option>
                        {jogosEstoqueFiltrados.map((j) => (
                          <option key={j.id} value={j.id}>
                            {j.titulo}
                          </option>
                        ))}
                      </select>
                      <input
                        type="email"
                        placeholder="E-mail da Conta PSN"
                        value={novaContaEmail}
                        onChange={(e) => setNovaContaEmail(e.target.value)}
                        className={adminInputClass}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Senha da Conta PSN"
                        value={novaContaSenha}
                        onChange={(e) => setNovaContaSenha(e.target.value)}
                        className={adminInputClass}
                        required
                      />
                      <input
                        type="text"
                        placeholder="Segredo MFA (Opcional - Texto do Autenticador)"
                        value={novaContaMfaSecret}
                        onChange={(e) => setNovaContaMfaSecret(e.target.value)}
                        className={adminInputClass}
                      />
                      <button
                        type="submit"
                        className="mt-auto w-full rounded-xl bg-fuchsia-600 py-4 text-xs font-bold uppercase tracking-wider text-white shadow-lg shadow-fuchsia-500/20 transition-colors hover:bg-fuchsia-500"
                      >
                        Adicionar Conta ao Cofre
                      </button>
                    </form>
                  </div>
                </div>

                <div className="mb-10 flex flex-col gap-8">
                  {/* 🎮 BLOCO CATALOGO DE JOGOS */}
                  <details className="group overflow-hidden rounded-3xl border border-l-4 border-zinc-800 border-l-blue-500 bg-zinc-900/80 shadow-2xl shadow-blue-500/10 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer select-none items-center justify-between p-6 transition-colors hover:bg-blue-900/10 md:p-8">
                      <span className="flex items-center gap-3 text-lg font-black tracking-tight text-blue-400">
                        🎮 Catálogo de Jogos ({jogos.length})
                      </span>
                      <span className="text-lg text-blue-500 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-zinc-800/50 px-6 pb-6 pt-8 md:px-8 md:pb-8">
                      {/* 🚀 BARRA DE BUSCA E FILTROS DO CATÁLOGO */}
                      <div className="mb-6 flex flex-col items-center gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4 shadow-inner lg:flex-row">
                        <input
                          type="text"
                          placeholder="🔍 Pesquisar por nome do jogo..."
                          value={termoBusca}
                          onChange={(e) => setTermoBusca(e.target.value)}
                          className={`${adminInputClass} w-full flex-1`}
                        />

                        <div className="flex w-full overflow-x-auto rounded-xl border border-zinc-700/50 bg-zinc-900 p-1 shadow-inner lg:w-auto">
                          <button
                            onClick={() => setFiltroStatusCatalogo('todos')}
                            className={`flex-1 rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all lg:flex-none ${filtroStatusCatalogo === 'todos' ? 'bg-blue-600 text-white' : 'text-zinc-400 hover:text-white'}`}
                          >
                            Todos
                          </button>
                          <button
                            onClick={() => setFiltroStatusCatalogo('disponiveis')}
                            className={`flex-1 rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all lg:flex-none ${filtroStatusCatalogo === 'disponiveis' ? 'bg-emerald-600 text-white' : 'text-zinc-400 hover:text-white'}`}
                          >
                            Livres
                          </button>
                          <button
                            onClick={() => setFiltroStatusCatalogo('alugados')}
                            className={`flex-1 rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all lg:flex-none ${filtroStatusCatalogo === 'alugados' ? 'bg-rose-600 text-white' : 'text-zinc-400 hover:text-white'}`}
                          >
                            Alugados
                          </button>
                          <button
                            onClick={() => setFiltroStatusCatalogo('lancamentos')}
                            className={`flex-1 rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all lg:flex-none ${filtroStatusCatalogo === 'lancamentos' ? 'bg-fuchsia-600 text-white' : 'text-zinc-400 hover:text-white'}`}
                          >
                            🔥 Lançam.
                          </button>
                        </div>
                      </div>

                      <div className="custom-scrollbar max-h-[600px] overflow-y-auto pr-3">
                        {jogosCatalogoAdminFiltrados.length === 0 ? (
                          <p className="text-sm font-medium text-zinc-500">
                            Nenhum jogo encontrado.
                          </p>
                        ) : (
                          <ul className="space-y-3">
                            {jogosCatalogoAdminFiltrados
                              .slice(paginaCatalogo * 50, (paginaCatalogo + 1) * 50)
                              .map((jogo) => (
                                <li
                                  key={jogo.id}
                                  className="flex flex-col items-start justify-between gap-4 rounded-2xl border-l-2 border-blue-500 bg-zinc-950/50 p-4 shadow-sm transition-colors hover:bg-zinc-800/50 md:flex-row md:items-center md:p-5"
                                >
                                  <div className="flex w-full flex-col gap-1 leading-relaxed md:w-auto">
                                    <span className="max-w-[300px] truncate text-sm font-black tracking-tight text-white">
                                      {jogo.titulo}
                                    </span>
                                    <div className="flex items-center gap-3">
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                        7D: R$ {jogo.preco_aluguel.toFixed(2)}
                                      </span>
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                        14D: R$ {jogo.preco_aluguel_14.toFixed(2)}
                                      </span>
                                    </div>
                                    {jogo.estoque > 0 ? (
                                      <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                                        ✅ {jogo.estoque} Disponível
                                      </span>
                                    ) : (
                                      <span className="mt-1 text-[10px] font-bold uppercase tracking-wider text-rose-400">
                                        ❌ Alugado
                                      </span>
                                    )}
                                  </div>

                                  <div className="flex w-full justify-end gap-2 md:w-auto">
                                    <button
                                      onClick={() => setModalEdicaoJogo(jogo)}
                                      className="rounded-lg border border-blue-500/30 bg-blue-900/30 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-blue-400 transition-colors hover:bg-blue-600 hover:text-white"
                                    >
                                      Editar
                                    </button>
                                    <button
                                      onClick={() => removerJogo(jogo.id)}
                                      className="rounded-lg border border-rose-500/30 bg-rose-900/30 px-4 py-2 text-[10px] font-bold uppercase tracking-wider text-rose-400 transition-colors hover:bg-rose-600 hover:text-white"
                                    >
                                      Excluir
                                    </button>
                                  </div>
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>

                      <div className="mt-6 flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4">
                        <button
                          onClick={() => setPaginaCatalogo(Math.max(0, paginaCatalogo - 1))}
                          disabled={paginaCatalogo === 0}
                          className="rounded-xl bg-zinc-800 px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-zinc-700 disabled:opacity-50"
                        >
                          ◀ Anterior
                        </button>
                        <span className="text-xs font-bold text-zinc-400">
                          Página {paginaCatalogo + 1}
                        </span>
                        <button
                          onClick={() => setPaginaCatalogo(paginaCatalogo + 1)}
                          disabled={(paginaCatalogo + 1) * 50 >= jogosCatalogoAdminFiltrados.length}
                          className="rounded-xl bg-zinc-800 px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-zinc-700 disabled:opacity-50"
                        >
                          Próxima ▶
                        </button>
                      </div>
                    </div>
                  </details>

                  {/* 🔑 BLOCO LOCAÇÕES ATIVAS */}
                  <details className="group overflow-hidden rounded-3xl border border-l-4 border-zinc-800 border-l-emerald-500 bg-zinc-900/80 shadow-2xl shadow-emerald-500/10 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer select-none items-center justify-between p-6 transition-colors hover:bg-emerald-900/10 md:p-8">
                      <span className="flex items-center gap-3 text-lg font-black tracking-tight text-emerald-400">
                        🔑 Locações Ativas ({locacoesAtivasFiltradas.length})
                      </span>
                      <span className="text-lg text-emerald-500 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-zinc-800/50 px-6 pb-6 pt-8 md:px-8 md:pb-8">
                      {/* 🚀 BARRA DE BUSCA E FILTRO - LOCAÇÕES ATIVAS */}
                      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4 shadow-inner md:flex-row">
                        <input
                          type="text"
                          placeholder="🔍 Buscar locação por jogo ou cliente..."
                          value={buscaLocacao}
                          onChange={(e) => setBuscaLocacao(e.target.value)}
                          className={`${adminInputClass} flex-1`}
                        />
                        <select
                          value={ordenacaoLocacoes}
                          onChange={(e) => setOrdenacaoLocacoes(e.target.value)}
                          className="w-full cursor-pointer rounded-xl border border-emerald-500/30 bg-zinc-900 px-3 py-2.5 text-sm font-bold text-zinc-300 outline-none transition-colors hover:border-emerald-400 focus:ring-2 focus:ring-emerald-500 md:w-56"
                        >
                          <option value="expira_breve">⏳ Expira em Breve</option>
                          <option value="recentes">🆕 Mais Recentes</option>
                          <option value="az_jogo">🎮 Jogo (A-Z)</option>
                          <option value="az_cliente">👤 Cliente (A-Z)</option>
                        </select>
                      </div>
                      <div className="custom-scrollbar max-h-[600px] overflow-y-auto pr-3">
                        {locacoesAtivasFiltradas.length === 0 ? (
                          <p className="text-sm font-medium text-zinc-500">
                            Nenhuma locação ativa.
                          </p>
                        ) : (
                          <table className="w-full whitespace-nowrap text-left text-sm">
                            <thead>
                              <tr className="border-b border-zinc-800 text-zinc-500">
                                <th className="pb-3 text-[10px] font-bold uppercase tracking-wider">
                                  Cliente
                                </th>
                                <th className="pb-3 text-[10px] font-bold uppercase tracking-wider">
                                  Jogo
                                </th>
                                <th className="pb-3 text-[10px] font-bold uppercase tracking-wider">
                                  Expira
                                </th>
                                <th className="pb-3 text-right text-[10px] font-bold uppercase tracking-wider">
                                  Ações
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {locacoesAtivasFiltradas.map((loc) => (
                                <tr
                                  key={loc.id}
                                  className="border-b border-zinc-800/50 transition-colors hover:bg-zinc-800/30"
                                >
                                  <td className="py-4 text-xs font-medium text-zinc-300">
                                    {loc.cliente}
                                  </td>
                                  <td className="py-4 text-sm font-black tracking-tight text-white">
                                    {loc.jogo}
                                  </td>
                                  <td className="py-4 text-xs font-bold text-amber-400">
                                    {new Date(loc.data_fim).toLocaleDateString()}
                                  </td>
                                  <td className="py-4">
                                    <div className="flex justify-end gap-2">
                                      <button
                                        onClick={() => avisarLiberacao(loc.cliente, loc.jogo)}
                                        className="flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-900/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 shadow transition-colors hover:bg-emerald-600 hover:text-white"
                                        title="Avisar Liberação via WhatsApp"
                                      >
                                        <span className="text-sm">📲</span> Avisar
                                      </button>
                                      <button
                                        onClick={() => revogarLocacao(loc.id)}
                                        className="rounded-lg border border-rose-500/30 bg-rose-900/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-400 shadow transition-colors hover:bg-rose-600 hover:text-white"
                                      >
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
                  <details className="group overflow-hidden rounded-3xl border border-l-4 border-zinc-800 border-l-amber-500 bg-zinc-900/80 shadow-2xl shadow-amber-500/10 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer select-none items-center justify-between p-6 transition-colors hover:bg-amber-900/10 md:p-8">
                      <span className="flex items-center gap-3 text-lg font-black tracking-tight text-amber-400">
                        ⏳ Fila de Espera Global ({reservasAdminFiltradas.length})
                      </span>
                      <span className="text-lg text-amber-500 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-zinc-800/50 px-6 pb-6 pt-8 md:px-8 md:pb-8">
                      <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4 shadow-inner md:flex-row">
                        <input
                          type="text"
                          placeholder="🔍 Buscar reserva por jogo ou cliente..."
                          value={buscaReservaAdmin}
                          onChange={(e) => setBuscaReservaAdmin(e.target.value)}
                          className={`${adminInputClass} flex-1`}
                        />
                        <select
                          value={ordenacaoReservaAdmin}
                          onChange={(e) => setOrdenacaoReservaAdmin(e.target.value)}
                          className="w-full cursor-pointer rounded-xl border border-amber-500/30 bg-zinc-900 px-3 py-2.5 text-sm font-bold text-zinc-300 outline-none transition-colors hover:border-amber-400 focus:ring-2 focus:ring-amber-500 md:w-56"
                        >
                          <option value="antigas">⏳ Mais Antigas</option>
                          <option value="recentes">🆕 Mais Recentes</option>
                          <option value="az_cliente">👤 Cliente (A-Z)</option>
                        </select>
                      </div>
                      <div className="custom-scrollbar max-h-[600px] overflow-y-auto pr-3">
                        {reservasAdminFiltradas.length === 0 ? (
                          <p className="text-sm font-medium text-zinc-500">
                            Nenhuma reserva pendente.
                          </p>
                        ) : (
                          <table className="w-full whitespace-nowrap text-left text-sm">
                            <thead>
                              <tr className="border-b border-zinc-800 text-zinc-500">
                                <th className="pb-3 text-[10px] font-bold uppercase tracking-wider">
                                  Cliente
                                </th>
                                <th className="pb-3 text-[10px] font-bold uppercase tracking-wider">
                                  Jogo
                                </th>
                                <th className="pb-3 text-[10px] font-bold uppercase tracking-wider">
                                  Início Previsto
                                </th>
                                <th className="pb-3 text-[10px] font-bold uppercase tracking-wider">
                                  Fim Previsto
                                </th>
                                <th className="pb-3 text-right text-[10px] font-bold uppercase tracking-wider">
                                  Ações
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {reservasAdminFiltradas.map((reserva) => (
                                <tr
                                  key={reserva.id}
                                  className="border-b border-zinc-800/50 transition-colors hover:bg-zinc-800/30"
                                >
                                  <td className="py-4 text-xs font-medium text-zinc-300">
                                    {reserva.cliente}
                                    <div className="mt-1 text-[9px] font-bold text-zinc-500">
                                      Feita em:{' '}
                                      {new Date(reserva.data_solicitacao).toLocaleDateString()}
                                    </div>
                                  </td>
                                  <td className="py-4 text-sm font-black tracking-tight text-white">
                                    {reserva.jogo}
                                  </td>
                                  <td className="py-4 text-xs font-bold text-blue-400">
                                    {reserva.data_inicio}
                                  </td>
                                  <td className="py-4 text-xs font-bold text-amber-400">
                                    {reserva.data_fim}{' '}
                                    <span className="ml-1 font-normal text-zinc-500">
                                      ({reserva.dias_aluguel}d)
                                    </span>
                                  </td>

                                  <td className="py-4 text-right">
                                    <button
                                      onClick={() =>
                                        cancelarReservaAdmin(
                                          reserva.id,
                                          reserva.cliente,
                                          reserva.jogo,
                                        )
                                      }
                                      className="rounded-lg border border-rose-500/30 bg-rose-900/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-400 shadow transition-colors hover:bg-rose-600 hover:text-white"
                                    >
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
                  <details className="group overflow-hidden rounded-3xl border border-l-4 border-zinc-800 border-l-purple-500 bg-zinc-900/80 shadow-2xl shadow-purple-500/10 [&_summary::-webkit-details-marker]:hidden">
                    <summary className="flex cursor-pointer select-none items-center justify-between p-6 transition-colors hover:bg-purple-900/10 md:p-8">
                      <span className="flex items-center gap-3 text-lg font-black tracking-tight text-purple-400">
                        👥 Base de Clientes ({todosUsuarios.length})
                      </span>
                      <span className="text-lg text-purple-500 transition duration-300 group-open:-rotate-180">
                        ▼
                      </span>
                    </summary>
                    <div className="border-t border-zinc-800/50 px-6 pb-6 pt-8 md:px-8 md:pb-8">
                      {/* 🚀 BARRA DE BUSCA E FILTROS UNIFICADA */}
                      <div className="mb-6 flex flex-col items-center gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4 shadow-inner lg:flex-row">
                        <input
                          type="text"
                          placeholder="🔍 Buscar cliente por nome ou e-mail..."
                          value={buscaCliente}
                          onChange={(e) => {
                            setBuscaCliente(e.target.value);
                            setPaginaClientes(0);
                          }}
                          className={`${adminInputClass} w-full flex-1`}
                        />

                        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
                          <select
                            value={ordenacaoClientes}
                            onChange={(e) => {
                              setOrdenacaoClientes(e.target.value);
                              setPaginaClientes(0);
                            }}
                            className="w-full cursor-pointer rounded-xl border border-purple-500/30 bg-zinc-900 px-3 py-2.5 text-sm font-bold text-zinc-300 outline-none transition-colors hover:border-purple-400 focus:ring-2 focus:ring-purple-500 sm:w-48"
                          >
                            <option value="recentes">⏰ Mais Recentes</option>
                            <option value="antigos">🕰️ Mais Antigos</option>
                            <option value="maior_saldo">💰 Maior Saldo</option>
                            <option value="menor_saldo">📉 Menor Saldo</option>
                            <option value="az">🔤 Ordem (A-Z)</option>
                            <option value="za">🔠 Ordem (Z-A)</option>
                          </select>

                          <div className="flex w-full rounded-xl border border-zinc-700/50 bg-zinc-900 p-1 shadow-inner sm:w-auto">
                            <button
                              onClick={() => {
                                setFiltroSaldoClientes('todos');
                                setPaginaClientes(0);
                              }}
                              className={`flex-1 rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all sm:flex-none ${filtroSaldoClientes === 'todos' ? 'bg-purple-600 text-white shadow-md' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                            >
                              Todos
                            </button>
                            <button
                              onClick={() => {
                                setFiltroSaldoClientes('positivo');
                                setPaginaClientes(0);
                              }}
                              className={`flex-1 rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all sm:flex-none ${filtroSaldoClientes === 'positivo' ? 'bg-emerald-600 text-white shadow-md' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                            >
                              Positivos
                            </button>
                            <button
                              onClick={() => {
                                setFiltroSaldoClientes('negativo');
                                setPaginaClientes(0);
                              }}
                              className={`flex-1 rounded-lg px-4 py-2 text-[10px] font-bold uppercase tracking-wider transition-all sm:flex-none ${filtroSaldoClientes === 'negativo' ? 'bg-rose-600 text-white shadow-md' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}
                            >
                              Negativados
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="custom-scrollbar max-h-[600px] overflow-y-auto pr-3">
                        {clientesFiltrados.length === 0 ? (
                          <p className="text-sm font-medium text-zinc-500">Vazio.</p>
                        ) : (
                          <ul className="space-y-4">
                            {clientesFiltrados
                              .slice(paginaClientes * 50, (paginaClientes + 1) * 50)
                              .map((u) => (
                                <li
                                  key={u.id}
                                  className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-l-2 border-zinc-800/50 border-l-purple-500 bg-zinc-950/50 p-4 shadow-sm transition-colors hover:bg-zinc-800/50 md:flex-row md:items-center md:p-5"
                                >
                                  <div className="flex flex-col gap-1.5">
                                    <span className="text-sm font-black tracking-tight text-white">
                                      {u.nome}{' '}
                                      {u.is_admin && (
                                        <span className="ml-2 rounded-md bg-amber-500/20 px-2 py-0.5 text-[8px] uppercase tracking-wider text-amber-400">
                                          Admin
                                        </span>
                                      )}
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                      Saldo:{' '}
                                      <strong
                                        className={`ml-1 text-xs tracking-normal ${u.saldo < 0 ? 'text-rose-400' : 'text-emerald-400'}`}
                                      >
                                        R$ {parseFloat(u.saldo).toFixed(2)}
                                      </strong>
                                    </span>
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                                      E-mail:{' '}
                                      <span className="ml-1 truncate text-zinc-300">{u.email}</span>
                                    </span>
                                  </div>

                                  {!u.is_admin && (
                                    <div className="mt-2 flex w-full flex-wrap justify-end gap-2 md:mt-0 md:w-auto">
                                      {u.telefone && (
                                        <a
                                          href={`whatsapp://send?phone=${u.telefone.replace(/\D/g, '').startsWith('55') ? u.telefone.replace(/\D/g, '') : '55' + u.telefone.replace(/\D/g, '')}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="flex items-center gap-1 rounded-lg border border-emerald-500/30 bg-emerald-900/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-emerald-400 transition-colors hover:bg-emerald-600 hover:text-white"
                                        >
                                          📱 Whats
                                        </a>
                                      )}
                                      <button
                                        onClick={() => setModalEdicaoCliente(u)}
                                        className="flex items-center gap-1 rounded-lg border border-blue-500/30 bg-blue-900/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-blue-400 transition-colors hover:bg-blue-600 hover:text-white"
                                      >
                                        ✏️ Editar
                                      </button>
                                      <button
                                        onClick={() => removerUsuario(u.id)}
                                        className="flex items-center gap-1 rounded-lg border border-rose-500/30 bg-rose-900/30 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-rose-400 transition-colors hover:bg-rose-600 hover:text-white"
                                      >
                                        🗑️ Excluir
                                      </button>
                                    </div>
                                  )}
                                </li>
                              ))}
                          </ul>
                        )}
                      </div>

                      <div className="mt-6 flex items-center justify-between rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4">
                        <button
                          onClick={() => setPaginaClientes(Math.max(0, paginaClientes - 1))}
                          disabled={paginaClientes === 0}
                          className="rounded-xl bg-zinc-800 px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-zinc-700 disabled:opacity-50"
                        >
                          ◀ Anterior
                        </button>
                        <span className="text-xs font-bold text-zinc-400">
                          Página {paginaClientes + 1}
                        </span>
                        <button
                          onClick={() => setPaginaClientes(paginaClientes + 1)}
                          disabled={(paginaClientes + 1) * 50 >= clientesFiltrados.length}
                          className="rounded-xl bg-zinc-800 px-5 py-2.5 text-[10px] font-bold uppercase tracking-wider text-white transition-colors hover:bg-zinc-700 disabled:opacity-50"
                        >
                          Próxima ▶
                        </button>
                      </div>
                    </div>
                  </details>
                </div>
              </div>
            )}

            {usuarioLogado && (
              <a
                href={`https://wa.me/${NUMERO_WHATSAPP_SUPORTE}?text=${encodeURIComponent('Olá! Estou no site BORA JOGAR! e preciso de ajuda com a minha conta.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group fixed bottom-6 right-6 z-50 flex items-center justify-center rounded-full bg-emerald-500 p-4 text-white shadow-xl shadow-emerald-500/30 transition-all duration-300 hover:-translate-y-1 hover:bg-emerald-400"
                title="Falar com o Suporte"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-8 w-8">
                  <path d="M12.031 0C5.385 0 .003 5.383.003 12.029c0 2.126.554 4.195 1.606 6.012L0 24l6.115-1.595c1.745.967 3.738 1.477 5.912 1.477 6.648 0 12.03-5.383 12.03-12.028S18.679 0 12.031 0zm-1.026 22.02c-1.803 0-3.568-.485-5.116-1.401l-.367-.217-3.799.992.997-3.705-.238-.378c-.998-1.583-1.523-3.411-1.523-5.281 0-5.618 4.568-10.188 10.19-10.188 5.62 0 10.189 4.57 10.189 10.188 0 5.617-4.569 10.187-10.189 10.187zm5.589-7.616c-.306-.153-1.815-.892-2.095-.994-.28-.102-.485-.153-.689.153-.204.306-.791.994-.969 1.199-.179.204-.357.23-.663.076-.306-.153-1.295-.477-2.468-1.517-.913-.809-1.53-1.808-1.708-2.115-.179-.306-.019-.472.134-.625.138-.138.306-.357.459-.536.153-.178.204-.306.306-.51.102-.204.051-.383-.025-.536-.077-.153-.689-1.658-.944-2.27-.247-.597-.497-.515-.689-.525-.179-.01-.383-.01-.587-.01-.204 0-.536.076-.816.408-.28.332-1.071 1.046-1.071 2.551s1.097 2.96 1.25 3.163c.153.204 2.158 3.296 5.23 4.622.73.316 1.301.505 1.745.648.734.234 1.403.2 1.928.122.587-.087 1.815-.74 2.07-1.454.255-.714.255-1.326.179-1.454-.077-.127-.28-.204-.587-.357z" />
                </svg>
              </a>
            )}
          </main>

          <footer className="relative z-10 mt-12 border-t border-zinc-800 bg-zinc-900 pb-8 pt-16">
            <div className="mx-auto max-w-7xl px-4 md:px-8">
              <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
                <div className="col-span-1 md:col-span-2">
                  <span className="mb-4 block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-2xl font-black tracking-tighter text-transparent">
                    BORA JOGAR!
                  </span>
                  <p className="mb-8 max-w-sm text-sm font-medium leading-relaxed text-zinc-400">
                    Sua locadora de jogos digitais next-gen. Alugue os maiores lançamentos de
                    PlayStation de forma automática, rápida e sem sair de casa.
                  </p>
                  <div className="flex gap-4">
                    <a
                      href="https://www.instagram.com/locadoraborajogar/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-lg text-zinc-400 shadow-lg transition-all hover:border-pink-500 hover:bg-pink-500/10 hover:text-white"
                      title="Siga nosso Instagram"
                    >
                      📸
                    </a>
                    <a
                      href={`https://wa.me/${NUMERO_WHATSAPP_SUPORTE}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex h-12 w-12 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-950 text-lg text-zinc-400 shadow-lg transition-all hover:border-emerald-500 hover:bg-emerald-500/10 hover:text-white"
                      title="Fale no WhatsApp"
                    >
                      💬
                    </a>
                  </div>
                </div>

                <div>
                  <h4 className="mb-6 text-[10px] font-bold uppercase tracking-wider text-white">
                    Acesso Rápido
                  </h4>
                  <ul className="space-y-4 text-xs font-medium text-zinc-400">
                    <li>
                      <button
                        onClick={() => setAbaAtual('vitrine')}
                        className="transition-colors hover:text-blue-400"
                      >
                        Catálogo de Jogos
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setAbaAtual('faq')}
                        className="transition-colors hover:text-purple-400"
                      >
                        Como Funciona (FAQ)
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setAbaAtual('termos')}
                        className="transition-colors hover:text-white"
                      >
                        Termos de Uso
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => setAbaAtual('privacidade')}
                        className="transition-colors hover:text-white"
                      >
                        Política de Privacidade
                      </button>
                    </li>
                  </ul>
                </div>

                <div>
                  <h4 className="mb-6 text-[10px] font-bold uppercase tracking-wider text-white">
                    Segurança
                  </h4>
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4 shadow-inner">
                      <span className="text-2xl drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">
                        🔒
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                          Certificado SSL
                        </span>
                        <span className="text-xs font-bold text-zinc-300">
                          Site Seguro 256-bits
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4 shadow-inner">
                      <span className="text-2xl drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">
                        ⚡
                      </span>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                          Gateway Oficial
                        </span>
                        <span className="text-xs font-bold text-zinc-300">Powered by Asaas</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-800/50 pt-8 text-[10px] font-bold uppercase tracking-wide text-zinc-500 md:flex-row">
                <p>© 2026 Locadora Bora Jogar. Todos os direitos reservados.</p>
                <p>CNPJ: 51.666.811/0001-67 • Curitiba, PR</p>
              </div>
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App;
