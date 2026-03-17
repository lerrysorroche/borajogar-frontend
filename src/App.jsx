// ==============================================================================
// BORA JOGAR! - FRONTEND (React)
// ==============================================================================

import { useState, useEffect } from 'react'

function App() {
  const NUMERO_WHATSAPP_SUPORTE = "5541999880882"; 
  const JOGOS_POR_PAGINA = 12; 

  const [usuarioLogado, setUsuarioLogado] = useState(() => {
    const usuarioSalvo = localStorage.getItem('usuario_locadora')
    return usuarioSalvo ? JSON.parse(usuarioSalvo) : null
  })
  
  const [abaAtual, setAbaAtual] = useState('vitrine') 
  const [modoLogin, setModoLogin] = useState(true) 
  const [toast, setToast] = useState({ visivel: false, mensagem: '', tipo: 'sucesso' })
  const [modalConfirmacao, setModalConfirmacao] = useState({ visivel: false, tipo: '', jogoId: null, jogoTitulo: '', preco7: 0, preco14: 0, diasEscolhidos: 7 })
  const [menuMobileAberto, setMenuMobileAberto] = useState(false)

  const [formEmail, setFormEmail] = useState('')
  const [formSenha, setFormSenha] = useState('')
  const [cadNome, setCadNome] = useState('')
  const [cadEmail, setCadEmail] = useState('')
  const [cadSenha, setCadSenha] = useState('')
  const [cadTelefone, setCadTelefone] = useState('')
  const [cadCodigoConvite, setCadCodigoConvite] = useState('')

  const [modoEsqueciSenha, setModoEsqueciSenha] = useState(false)
  const [esqueciEmail, setEsqueciEmail] = useState('')
  const [mudarSenhaAtual, setMudarSenhaAtual] = useState('')
  const [mudarSenhaNova, setMudarSenhaNova] = useState('')

  const [jogos, setJogos] = useState([])
  const [meusAlugueis, setMeusAlugueis] = useState([])
  const [minhasReservas, setMinhasReservas] = useState([]) 
  const [extrato, setExtrato] = useState([]) 
  
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
  
  const [novaContaJogoId, setNovaContaJogoId] = useState('')
  const [novaContaEmail, setNovaContaEmail] = useState('')
  const [novaContaSenha, setNovaContaSenha] = useState('')
  const [novaContaMfaSecret, setNovaContaMfaSecret] = useState('') 

  const [editandoPrecoId, setEditandoPrecoId] = useState(null)
  const [novoPrecoEdicao, setNovoPrecoEdicao] = useState('')
  
  const [termoBusca, setTermoBusca] = useState('')
  const [buscaEstoque, setBuscaEstoque] = useState('')
  const [buscaLocacao, setBuscaLocacao] = useState('')
  const [buscaCliente, setBuscaCliente] = useState('')

  const [todasLocacoes, setTodasLocacoes] = useState([])
  const [todosUsuarios, setTodosUsuarios] = useState([])

  const [valorRecarga, setValorRecarga] = useState('30')
  const [cupomRecarga, setCupomRecarga] = useState('')
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
    if (isNaN(valorReal) || valorReal < 30) { mostrarToast("O valor mínimo para recarga é de R$ 30,00", "erro"); return; }
    
    mostrarToast("Gerando código PIX seguro...", "aviso");

    fetch('https://borajogar-api.onrender.com/recarga/gerar-pix', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ utilizador_id: usuarioLogado.id, valor: valorReal, cupom: cupomRecarga })
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
                setValorRecarga('30');
                carregarDados(); 
            }
        }).catch(() => console.log("Aguardando verificação..."));
      }, 5000); 
    }
    return () => clearInterval(intervalId); 
  }, [pixPendente])

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
    fetch('https://borajogar-api.onrender.com/mudar-senha', {
      method: 'POST', headers: getAuthHeaders(),
      body: JSON.stringify({ utilizador_id: usuarioLogado.id, senha_atual: mudarSenhaAtual, nova_senha: mudarSenhaNova })
    }).then(async res => {
      const data = await res.json();
      if (res.ok) {
        mostrarToast(data.mensagem, "sucesso");
        setMudarSenhaAtual('');
        setMudarSenhaNova('');
      } else {
        mostrarToast(data.detail, "erro");
      }
    }).catch(() => mostrarToast("Erro de conexão.", "erro"));
  }

  const abrirConfirmacao = (tipo, jogoId, jogoTitulo, preco7, preco14) => {
    if (usuarioLogado.saldo < preco7) { mostrarToast(`Saldo insuficiente!\nColoque créditos em "Meus Acessos"!`, "erro"); return; }
    if (usuarioLogado.saldo < 0) { mostrarToast(`Você está negativado!`, "erro"); return; }
    setModalConfirmacao({ visivel: true, tipo, jogoId, jogoTitulo, preco7, preco14, diasEscolhidos: 7 });
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

    // VALIDAÇÃO DE SENHA FORTE
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
        setFormEmail(cadEmail); setFormSenha(cadSenha); setModoLogin(true); setCadNome(''); setCadEmail(''); setCadSenha(''); setCadTelefone(''); setCadCodigoConvite('');
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

  const carregarDados = () => {
    fetch('https://borajogar-api.onrender.com/configuracoes').then(res => res.json()).then(dados => setConfigSistema(dados));
    if (!usuarioLogado) return;
    
    fetch('https://borajogar-api.onrender.com/jogos').then(res => res.json()).then(dados => setJogos(dados))
    
    if (usuarioLogado.is_admin) {
      fetch('https://borajogar-api.onrender.com/admin/locacoes', { headers: getAuthHeaders() }).then(res => res.ok ? res.json() : []).then(dados => setTodasLocacoes(dados))
      fetch('https://borajogar-api.onrender.com/admin/estatisticas', { headers: getAuthHeaders() }).then(res => res.ok ? res.json() : {faturamento: 0, total_clientes: 0, locacoes_ativas: 0}).then(dados => setEstatisticasAdmin(dados))
      fetch('https://borajogar-api.onrender.com/admin/manutencao', { headers: getAuthHeaders() }).then(res => res.ok ? res.json() : []).then(dados => setContasManutencao(dados))
      fetch('https://borajogar-api.onrender.com/admin/cupons', { headers: getAuthHeaders() }).then(res => res.ok ? res.json() : []).then(dados => setListaCupons(dados))
    }

    if(usuarioLogado.is_admin) {
        fetch('https://borajogar-api.onrender.com/usuarios', { headers: getAuthHeaders() })
        .then(res => { if (!res.ok) throw new Error("Token Inválido"); return res.json(); })
        .then(dados => {
          if (!Array.isArray(dados)) return; 
          setTodosUsuarios(dados);
          setUsuarioLogado(prevUsuario => {
            if (!prevUsuario) return null; 
            const usuarioAtualizadoNoBanco = dados.find(u => u.id === prevUsuario.id);
            if(usuarioAtualizadoNoBanco && prevUsuario.saldo !== usuarioAtualizadoNoBanco.saldo) {
                const usuarioNovo = {...prevUsuario, saldo: usuarioAtualizadoNoBanco.saldo};
                localStorage.setItem('usuario_locadora', JSON.stringify(usuarioNovo));
                return usuarioNovo; 
            }
            return prevUsuario; 
          });
        })
        .catch(() => { sair(); mostrarToast("Sua sessão expirou.", "erro"); });
    }

    fetch(`https://borajogar-api.onrender.com/meus-alugueis/${usuarioLogado.id}`).then(res => res.json()).then(dados => setMeusAlugueis(dados))
    fetch(`https://borajogar-api.onrender.com/minhas-reservas/${usuarioLogado.id}`).then(res => res.json()).then(dados => setMinhasReservas(dados))
    fetch(`https://borajogar-api.onrender.com/extrato/${usuarioLogado.id}`).then(res => res.json()).then(dados => setExtrato(dados))
  }

  useEffect(() => { carregarDados(); }, [usuarioLogado?.id]) 

  const salvarConfiguracoesDireto = (novaConfig, msgSucesso) => {
    fetch('https://borajogar-api.onrender.com/admin/configuracoes', {
        method: 'POST', headers: getAuthHeaders(),
        body: JSON.stringify(novaConfig)
    }).then(res => {
        if(res.ok) { mostrarToast(msgSucesso, "sucesso"); } 
        else { mostrarToast("Erro ao salvar.", "erro"); }
    });
  }

  const toggleDevolucao = () => {
    const novaConfig = { ...configSistema, devolucao_dinamica: !configSistema.devolucao_dinamica };
    setConfigSistema(novaConfig); 
    salvarConfiguracoesDireto(novaConfig, novaConfig.devolucao_dinamica ? "✅ Cashback Ativado!" : "❌ Cashback Desativado!"); 
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
      body: JSON.stringify({ titulo: novoJogoTitulo, plataforma: novoJogoPlataforma, preco_aluguel: parseFloat(novoJogoPreco), preco_aluguel_14: parseFloat(novoJogoPreco14) || 0.0, descricao: novoJogoDescricao, url_imagem: novoJogoImagem, tempo_jogo: novoJogoTempo, nota: parseFloat(novoJogoNota) || 0 })
    }).then(res => {
      if (res.ok) { 
        mostrarToast("Jogo cadastrado!", "sucesso"); carregarDados(); 
        setNovoJogoTitulo(''); setNovoJogoPreco(''); setNovoJogoPreco14(''); setNovoJogoDescricao(''); setNovoJogoImagem(''); setNovoJogoTempo(''); setNovoJogoNota('');
      } else { mostrarToast("Erro ao cadastrar.", "erro") }
    })
  }

  const salvarNovoPreco = (jogoId) => {
    const precoReal = parseFloat(novoPrecoEdicao);
    if (isNaN(precoReal) || precoReal <= 0) { mostrarToast("Digite um valor válido.", "erro"); return; }
    
    fetch(`https://borajogar-api.onrender.com/jogos/${jogoId}/preco`, {
      method: 'PATCH', headers: getAuthHeaders(),
      body: JSON.stringify({ preco_aluguel: precoReal })
    }).then(async res => {
      if (res.ok) {
        mostrarToast("Preço atualizado!", "sucesso");
        setEditandoPrecoId(null);
        carregarDados();
      } else {
        const data = await res.json(); mostrarToast(data.detail, "erro");
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

  const ajustarSaldoCliente = (idUsuario, nomeUsuario) => {
    const inputValor = window.prompt(`AJUSTE DE SALDO: ${nomeUsuario}\n\nPara ADICIONAR saldo, digite um número (Ex: 50)\nPara REMOVER saldo, coloque o sinal de menos (Ex: -20)`);
    if (!inputValor) return; 
    const valorReal = parseFloat(inputValor.replace(',', '.'));
    if (isNaN(valorReal)) { mostrarToast("Você precisa digitar um número válido.", "erro"); return; }
    const motivo = window.prompt("Qual o motivo deste ajuste? (Isso aparecerá no extrato do cliente)");
    if (motivo === null) return;
    fetch('https://borajogar-api.onrender.com/admin/ajustar-saldo', {
      method: 'POST', headers: getAuthHeaders(),
      body: JSON.stringify({ utilizador_id: idUsuario, valor: valorReal, motivo: motivo || 'Ajuste Manual' })
    }).then(async res => {
      const data = await res.json();
      if (res.ok) { mostrarToast(data.mensagem, "sucesso"); carregarDados(); } else { mostrarToast(data.detail, "erro"); }
    });
  }

  const cobrarNoWhatsApp = (nome, telefone, jogo) => {
    if(!telefone) return;
    let numeroLimpo = telefone.replace(/\D/g, '');
    if(!numeroLimpo.startsWith('55')) numeroLimpo = '55' + numeroLimpo;
    const mensagem = `Olá, ${nome}! Aqui é da locadora *BORA JOGAR!* 🎮\n\nSeu tempo com o jogo *${jogo}* terminou, mas notamos que a conta ainda está ativada como "Principal" no seu console.\n\n⚠️ Concedemos um *prazo de tolerância de 1 hora* para você entrar na conta e desativar. Caso não seja feito, o sistema aplicará uma multa automática de R$ 50,00 e sua carteira será bloqueada.\n\nComo fazer a desativação:\n\nNo PS5: Vá em Configurações > Usuários e Contas > Outros > Compartilhamento do console e jogo offline e desative.\n\nNo PS4: Vá em Configurações > Gerenciamento da conta > Ativar como seu PS4 principal e desative.\n\nMe avise aqui assim que desativar!`;
    const url = `https://wa.me/${numeroLimpo}?text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  }

  const calcularPrevisao = (dataBaseDeDevolucao, tamanhoFila) => {
    if (!dataBaseDeDevolucao) return 'Aguardando Estoque';
    const data = new Date(dataBaseDeDevolucao);
    data.setDate(data.getDate() + (tamanhoFila * 7));
    return data.toLocaleDateString();
  }

  const lidarComFiltroPlataforma = (plat) => { setFiltroPlataforma(plat); setPaginaAtual(1); }
  const lidarComFiltroDisp = (disp) => { setFiltroDisponibilidade(disp); setPaginaAtual(1); }
  const lidarComBusca = (e) => { setTermoBusca(e.target.value); setPaginaAtual(1); }

  const idsLancamentos = [...jogos]
    .sort((a, b) => b.id - a.id)
    .slice(0, 3)
    .map(j => j.id);

  const jogosFiltrados = jogos
    .filter(jogo => jogo.titulo.toLowerCase().includes(termoBusca.toLowerCase()))
    .filter(jogo => {
      if (filtroPlataforma === 'TODAS') return true;
      if (filtroPlataforma === 'PS5') return jogo.plataforma === 'PS5' || jogo.plataforma === 'PS4/PS5';
      if (filtroPlataforma === 'PS4') return jogo.plataforma === 'PS4' || jogo.plataforma === 'PS4/PS5';
      if (filtroPlataforma === 'PS4/PS5') return jogo.plataforma === 'PS4/PS5';
      return jogo.plataforma === filtroPlataforma;
    })
    .filter(jogo => {
      if (filtroDisponibilidade === 'TODOS') return true;
      if (filtroDisponibilidade === 'DISPONIVEL') return jogo.estoque > 0;
      return true;
    })
    .sort((a, b) => {
      const aLancamento = idsLancamentos.includes(a.id);
      const bLancamento = idsLancamentos.includes(b.id);

      if (aLancamento && !bLancamento) return -1;
      if (!aLancamento && bLancamento) return 1;

      const aDisponivel = a.estoque > 0;
      const bDisponivel = b.estoque > 0;
      if (aDisponivel && !bDisponivel) return -1;
      if (!aDisponivel && bDisponivel) return 1;
      
      if (b.popularidade !== a.popularidade) {
          return b.popularidade - a.popularidade;
      }
      
      return b.id - a.id;
    });

  const totalPaginas = Math.ceil(jogosFiltrados.length / JOGOS_POR_PAGINA);
  const indiceUltimoJogo = paginaAtual * JOGOS_POR_PAGINA;
  const indicePrimeiroJogo = indiceUltimoJogo - JOGOS_POR_PAGINA;
  const jogosDaPagina = jogosFiltrados.slice(indicePrimeiroJogo, indiceUltimoJogo);

  const jogosAdminParaMostrar = jogosFiltrados.slice(0, 5)
  const jogosEstoqueFiltrados = jogos.filter(jogo => jogo.titulo.toLowerCase().includes(buscaEstoque.toLowerCase()))
  const locacoesAtivasFiltradas = todasLocacoes.filter(loc => loc.status === 'ATIVA').filter(loc => loc.jogo.toLowerCase().includes(buscaLocacao.toLowerCase()) || loc.cliente.toLowerCase().includes(buscaLocacao.toLowerCase()))
  const locacoesAdminParaMostrar = locacoesAtivasFiltradas.slice(0, 5)
  
  const clientesFiltrados = todosUsuarios
    .filter(u => u.nome.toLowerCase().includes(buscaCliente.toLowerCase()))
    .sort((a, b) => b.id - a.id);
  const clientesParaMostrar = clientesFiltrados.slice(0, 100);
  const alugueisAtivos = meusAlugueis.filter(item => item.status === 'ATIVA')
  const historicoAlugueis = meusAlugueis.filter(item => item.status === 'EXPIRADA').slice(0, 5)

  const inputClass = "w-full p-2.5 bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
  const navBtnClass = "text-sm font-bold px-4 py-2 rounded-full transition-all duration-300"
  const adminInputClass = "w-full px-3 py-2 text-sm bg-zinc-800 border border-zinc-700 text-white rounded-lg focus:ring-1 focus:ring-blue-500 focus:outline-none transition-all"
  const adminCardClass = "bg-zinc-900 p-4 rounded-xl border border-zinc-800 shadow-lg flex flex-col"


  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans pb-10 relative overflow-x-hidden">
      
      {toast.visivel && (
        <div className={`fixed top-6 right-6 z-[150] px-5 py-4 rounded-xl shadow-2xl border transition-all duration-300 animate-fade-in flex items-center gap-3 max-w-sm ${
          toast.tipo === 'sucesso' ? 'bg-emerald-950/90 border-emerald-500/50 text-emerald-100' :
          toast.tipo === 'erro' ? 'bg-rose-950/90 border-rose-500/50 text-rose-100' :
          'bg-amber-950/90 border-amber-500/50 text-amber-100'
        } backdrop-blur-md`}>
          <span className="text-xl">{toast.tipo === 'sucesso' ? '✅' : toast.tipo === 'erro' ? '❌' : '⚠️'}</span>
          <p className="text-sm font-medium leading-tight whitespace-pre-line">{toast.mensagem}</p>
        </div>
      )}

      {modalConfirmacao.visivel && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl p-8 max-w-sm w-full shadow-2xl">
            <h3 className="text-2xl font-black text-white mb-2 tracking-tight">
              {modalConfirmacao.tipo === 'aluguel' ? '🎮 Alugar Jogo' : '⏳ Entrar na Fila'}
            </h3>
            <p className="text-zinc-400 text-sm mb-6 leading-relaxed">
              Escolha por quanto tempo você quer jogar <strong className="text-white">{modalConfirmacao.jogoTitulo}</strong>:
            </p>
            
            {/* CAIXAS DE SELEÇÃO 7 vs 14 DIAS */}
            <div className="flex gap-3 mb-6">
                <button onClick={() => setModalConfirmacao({...modalConfirmacao, diasEscolhidos: 7})} className={`flex-1 p-3 rounded-xl border-2 transition-all text-left ${modalConfirmacao.diasEscolhidos === 7 ? 'border-blue-500 bg-blue-500/10' : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700'}`}>
                    <div className="text-sm font-bold text-white mb-1">7 Dias</div>
                    <div className="text-lg font-black text-blue-400">R$ {modalConfirmacao.preco7.toFixed(2)}</div>
                </button>

                {modalConfirmacao.preco14 > 0 && (
                    <button onClick={() => setModalConfirmacao({...modalConfirmacao, diasEscolhidos: 14})} className={`flex-1 p-3 rounded-xl border-2 transition-all text-left relative ${modalConfirmacao.diasEscolhidos === 14 ? 'border-purple-500 bg-purple-500/10' : 'border-zinc-700 bg-zinc-800 hover:bg-zinc-700'}`}>
                        <span className="absolute -top-3 right-2 bg-purple-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider">Desconto!</span>
                        <div className="text-sm font-bold text-white mb-1">14 Dias</div>
                        <div className="text-lg font-black text-purple-400">R$ {modalConfirmacao.preco14.toFixed(2)}</div>
                    </button>
                )}
            </div>

            {/* CÁLCULO DE SALDO DINÂMICO */}
            {(() => {
              const precoAtual = modalConfirmacao.diasEscolhidos === 7 ? modalConfirmacao.preco7 : modalConfirmacao.preco14;
              const temSaldo = usuarioLogado.saldo >= precoAtual;
              
              return (
                <>
                  <div className="bg-zinc-950 rounded-2xl p-5 mb-8 border border-zinc-800/80 shadow-inner">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-sm text-zinc-500 font-medium">Valor do aluguel:</span>
                      <span className="text-rose-400 font-black">- R$ {precoAtual.toFixed(2)}</span>
                    </div>
                    <div className="w-full h-px bg-zinc-800/50 mb-3"></div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-zinc-500 font-medium">Saldo após compra:</span>
                      <span className={`font-black ${temSaldo ? 'text-emerald-400' : 'text-rose-500 animate-pulse'}`}>
                        R$ {(usuarioLogado.saldo - precoAtual).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={() => setModalConfirmacao({ visivel: false, tipo: '', jogoId: null, jogoTitulo: '', preco7: 0, preco14: 0, diasEscolhidos: 7 })} className="flex-1 py-3 rounded-xl font-bold text-sm bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white transition-colors">Cancelar</button>
                    <button onClick={confirmarTransacao} disabled={!temSaldo} className={`flex-1 py-3 rounded-xl font-bold text-sm text-white shadow-lg transition-all ${!temSaldo ? 'opacity-50 cursor-not-allowed bg-zinc-600' : modalConfirmacao.tipo === 'aluguel' ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20' : 'bg-amber-600 hover:bg-amber-500 shadow-amber-600/20'}`}>
                        {temSaldo ? 'Confirmar' : 'Sem Saldo'}
                    </button>
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      )}

      {!usuarioLogado ? (
        <div className="flex justify-center items-center min-h-screen p-4" style={{ backgroundImage: `url('https://cinesiageek.com.br/wp-content/uploads/2024/09/playstation5.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
          <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-sm"></div>
          <div className="relative z-10 bg-zinc-900 p-8 rounded-3xl border border-zinc-800 w-full max-w-sm shadow-2xl animate-fade-in">
            <h2 className="text-4xl font-black text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 mb-8 tracking-tighter">BORA JOGAR!</h2>
            
            {modoEsqueciSenha ? (
              <form onSubmit={solicitarRecuperacaoSenha} className="space-y-4 animate-fade-in">
                <p className="text-zinc-400 text-sm text-center mb-4 leading-relaxed">
                  Digite seu e-mail de cadastro. Se ele existir, enviaremos uma senha temporária em instantes.
                </p>
                <input type="email" placeholder="Seu E-mail" value={esqueciEmail} onChange={e => setEsqueciEmail(e.target.value)} className={inputClass} required />
                <button type="submit" className="w-full py-3 mt-2 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-amber-500/30">
                  Recuperar Senha
                </button>
                <div className="pt-4 text-center border-t border-zinc-800 mt-6">
                  <button type="button" onClick={() => setModoEsqueciSenha(false)} className="text-zinc-400 hover:text-white font-bold transition-colors text-sm">
                    Voltar para o Login
                  </button>
                </div>
              </form>
            ) : modoLogin ? (
              <form onSubmit={entrarNoSistema} className="space-y-4 animate-fade-in">
                <input type="email" placeholder="Seu E-mail" value={formEmail} onChange={e => setFormEmail(e.target.value)} className={inputClass} required />
                <input type="password" placeholder="Sua Senha" value={formSenha} onChange={e => setFormSenha(e.target.value)} className={inputClass} required />
                
                <div className="flex justify-end">
                  <button type="button" onClick={() => setModoEsqueciSenha(true)} className="text-xs text-zinc-400 hover:text-blue-400 transition-colors font-medium">
                    Esqueceu a senha?
                  </button>
                </div>

                <button type="submit" className="w-full py-3 mt-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-blue-500/30">Entrar na Loja</button>
                <div className="pt-4 text-center border-t border-zinc-800 mt-6">
                  <p className="text-zinc-400 text-sm">Ainda não tem conta? <br/>
                    <button type="button" onClick={() => { setModoLogin(false); setModoEsqueciSenha(false); }} className="mt-2 text-emerald-400 hover:text-emerald-300 font-bold transition-colors">
                      CRIE UMA CONTA GRÁTIS
                    </button>
                  </p>
                </div>
              </form>
            ) : (
              <form onSubmit={registrarConta} className="space-y-4 animate-fade-in">
                <input type="text" placeholder="Nome Completo" value={cadNome} onChange={e => setCadNome(e.target.value)} className={inputClass} required />
                <input type="email" placeholder="E-mail" value={cadEmail} onChange={e => setCadEmail(e.target.value)} className={inputClass} required />
                <input type="text" placeholder="WhatsApp (DDD+Número)" value={cadTelefone} onChange={e => setCadTelefone(e.target.value)} className={inputClass} required />
                <input type="password" placeholder="Crie uma Senha" value={cadSenha} onChange={e => setCadSenha(e.target.value)} className={inputClass} required />
                <input type="text" placeholder="Código de um Amigo (Opcional)" value={cadCodigoConvite} onChange={e => setCadCodigoConvite(e.target.value.toUpperCase())} className={`${inputClass} border-purple-500/50 bg-purple-950/10 placeholder-purple-400/50 uppercase`} />
                <button type="submit" className="w-full py-3 mt-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-emerald-500/30">Finalizar Cadastro</button>
                <div className="pt-4 text-center border-t border-zinc-800 mt-6">
                    <p className="text-zinc-400 text-sm">Já possui uma conta? <br/>
                        <button type="button" onClick={() => { setModoLogin(true); setModoEsqueciSenha(false); }} className="mt-2 text-blue-400 hover:text-blue-300 font-bold transition-colors">
                            Faça Login aqui
                        </button>
                    </p>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : (

      <>
        <nav className="bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 fixed top-0 left-0 w-full z-50 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-8">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tighter">BORA JOGAR!</span>
                
                {/* MENU DESKTOP (Invisível no Celular) */}
                <div className="hidden md:flex space-x-2">
                  <button onClick={() => setAbaAtual('vitrine')} className={`${navBtnClass} ${abaAtual === 'vitrine' ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>🎮 Loja</button>
                  <button onClick={() => setAbaAtual('dashboard')} className={`${navBtnClass} ${abaAtual === 'dashboard' ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>🔑 Meus Acessos</button>
                  <button onClick={() => setAbaAtual('faq')} className={`${navBtnClass} ${abaAtual === 'faq' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>📖 Como Funciona</button>
                  
                  {usuarioLogado.is_admin && (
                    <button onClick={() => setAbaAtual('admin')} className={`${navBtnClass} ${abaAtual === 'admin' ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>⚙️ Painel Admin</button>
                  )}
                </div>
              </div>

              {/* ÁREA DIREITA: SALDO, NOME E BOTÕES */}
              <div className="flex items-center gap-4">
                
                {/* INFO DESKTOP (Invisível no Celular) */}
                <div className="hidden md:flex bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl items-center gap-2 shadow-inner">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Saldo</span>
                  <span className={`text-sm font-black ${usuarioLogado.saldo < 0 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
                    R$ {(usuarioLogado.saldo || 0).toFixed(2)}
                  </span>
                </div>
                <span className="hidden md:block text-sm text-zinc-400">Olá, <strong className="text-white">{usuarioLogado.nome}</strong></span>
                <button onClick={sair} className="hidden md:block bg-zinc-800 hover:bg-rose-600 hover:text-white text-zinc-300 px-4 py-2 rounded-lg transition-colors text-sm font-bold">Sair</button>

                {/* BOTÃO HAMBÚRGUER MOBILE (Visível apenas no Celular) */}
                <button onClick={() => setMenuMobileAberto(!menuMobileAberto)} className="md:hidden text-zinc-300 hover:text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {menuMobileAberto ? (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    ) : (
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    )}
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* === MENU MOBILE EXPANDIDO === */}
          {menuMobileAberto && (
            <div className="md:hidden bg-zinc-900 border-b border-zinc-800 absolute w-full left-0 top-16 shadow-2xl animate-fade-in flex flex-col">
              
              {/* Info do Usuário no Mobile */}
              <div className="flex items-center justify-between p-4 border-b border-zinc-800/50 bg-zinc-950/50">
                <span className="text-sm text-zinc-400">Olá, <strong className="text-white truncate max-w-[120px] inline-block align-bottom">{usuarioLogado.nome}</strong></span>
                <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-lg shadow-inner">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Saldo</span>
                  <span className={`text-sm font-black ${usuarioLogado.saldo < 0 ? 'text-rose-500 animate-pulse' : 'text-emerald-400'}`}>
                    R$ {(usuarioLogado.saldo || 0).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Botões de Navegação Mobile */}
              <div className="flex flex-col p-4 gap-3">
                <button onClick={() => { setAbaAtual('vitrine'); setMenuMobileAberto(false); }} className={`p-3 rounded-xl text-left font-bold transition-all shadow-md ${abaAtual === 'vitrine' ? 'bg-blue-600 text-white shadow-blue-600/20' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'}`}>🎮 Loja</button>
                <button onClick={() => { setAbaAtual('dashboard'); setMenuMobileAberto(false); }} className={`p-3 rounded-xl text-left font-bold transition-all shadow-md ${abaAtual === 'dashboard' ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'}`}>🔑 Meus Acessos</button>
                <button onClick={() => { setAbaAtual('faq'); setMenuMobileAberto(false); }} className={`p-3 rounded-xl text-left font-bold transition-all shadow-md ${abaAtual === 'faq' ? 'bg-purple-600 text-white shadow-purple-600/20' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'}`}>📖 Como Funciona</button>
                
                {usuarioLogado.is_admin && (
                  <button onClick={() => { setAbaAtual('admin'); setMenuMobileAberto(false); }} className={`p-3 rounded-xl text-left font-bold transition-all shadow-md ${abaAtual === 'admin' ? 'bg-rose-600 text-white shadow-rose-600/20' : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white'}`}>⚙️ Painel Admin</button>
                )}
                
                <button onClick={() => { sair(); setMenuMobileAberto(false); }} className="p-3 mt-4 rounded-xl text-center font-bold transition-all bg-rose-900/30 text-rose-400 border border-rose-500/30 hover:bg-rose-600 hover:text-white shadow-lg">Sair da Conta</button>
              </div>
            </div>
          )}
        </nav>

        <main className="max-w-7xl mx-auto px-4 pb-10 pt-24 md:px-8 md:pt-24">

          {abaAtual === 'vitrine' && (
            <div className="animate-fade-in">
              <div className="relative rounded-3xl p-8 md:p-12 mb-8 border border-zinc-800 overflow-hidden shadow-2xl flex items-center min-h-[320px]" style={{ backgroundImage: `url('https://cinesiageek.com.br/wp-content/uploads/2024/09/playstation5.jpeg')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent"></div>
                <div className="relative z-10 w-full">
                  <span className="inline-block py-1 px-3 rounded-full bg-blue-500/20 border border-blue-500/30 text-blue-400 text-xs font-bold tracking-wider mb-4">CATÁLOGO ATUALIZADO</span>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tighter leading-tight max-w-2xl">A sua Próxima Aventura <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Começa Aqui</span></h1>
                  <p className="text-zinc-300 max-w-xl mb-8 text-sm md:text-base leading-relaxed">Alugue os maiores lançamentos e os melhores exclusivos. Receba seu acesso instantaneamente e comece a jogar sem sair de casa.</p>
                  
                  <div className="relative max-w-xl group">
                    <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none"><span className="text-xl opacity-70 transition-opacity">🎮</span></div>
                    <input type="text" placeholder="Qual jogo você quer jogar hoje?" value={termoBusca} onChange={lidarComBusca} className="w-full py-4 pl-14 pr-6 bg-zinc-900/60 backdrop-blur-xl border border-zinc-700/50 rounded-full text-white placeholder-zinc-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all shadow-xl" />
                  </div>

                  <div className="flex flex-wrap gap-4 mt-6 max-w-xl">
                    <div className="flex bg-zinc-900/80 rounded-xl p-1.5 backdrop-blur-md border border-zinc-700/50 shadow-lg overflow-x-auto scrollbar-hide">
                      <button onClick={() => lidarComFiltroPlataforma('TODAS')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filtroPlataforma === 'TODAS' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>Todas</button>
                      <button onClick={() => lidarComFiltroPlataforma('PS5')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filtroPlataforma === 'PS5' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>PS5</button>
                      <button onClick={() => lidarComFiltroPlataforma('PS4')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filtroPlataforma === 'PS4' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>PS4</button>
                      <button onClick={() => lidarComFiltroPlataforma('PS4/PS5')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${filtroPlataforma === 'PS4/PS5' ? 'bg-blue-600 text-white shadow' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>PS4 / PS5</button>
                    </div>
                    
                    <div className="flex bg-zinc-900/80 rounded-xl p-1.5 backdrop-blur-md border border-zinc-700/50 shadow-lg">
                      <button onClick={() => lidarComFiltroDisp('TODOS')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filtroDisponibilidade === 'TODOS' ? 'bg-emerald-600 text-white shadow' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>Todos Status</button>
                      <button onClick={() => lidarComFiltroDisp('DISPONIVEL')} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${filtroDisponibilidade === 'DISPONIVEL' ? 'bg-emerald-600 text-white shadow' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'}`}>Apenas Disponíveis</button>
                    </div>
                  </div>
                </div>
              </div>

              {configSistema.anuncio_ativo && configSistema.mensagem_anuncio && (
                <div className="w-full p-1 rounded-3xl mb-8 animate-pulse-slow shadow-2xl relative overflow-hidden bg-gradient-to-r from-amber-500 via-orange-500 to-red-500">
                  <div className="bg-zinc-950 p-6 md:p-8 rounded-[22px] flex items-center justify-center gap-4 text-center">
                    <span className="text-4xl hidden md:block">📣</span>
                    <h2 className="text-lg md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 tracking-wide uppercase leading-snug">
                      {configSistema.mensagem_anuncio}
                    </h2>
                    <span className="text-4xl hidden md:block">🔥</span>
                  </div>
                </div>
              )}

              <div className="mb-6 text-sm text-zinc-400 font-medium">Mostrando <span className="text-white">{jogosFiltrados.length}</span> jogo(s) encontrado(s)</div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {jogosDaPagina.map(jogo => {
                  const isLancamento = idsLancamentos.includes(jogo.id);
                  
                  return (
                  <div key={jogo.id} className="bg-zinc-900 rounded-2xl border border-zinc-800 flex flex-col shadow-xl hover:-translate-y-2 hover:border-blue-500/50 transition-all duration-300 group overflow-hidden">
                    <div className="h-48 w-full bg-zinc-800 relative overflow-hidden">
                      {jogo.url_imagem ? <img src={jogo.url_imagem} alt={jogo.titulo} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" /> : <div className="w-full h-full flex items-center justify-center bg-zinc-800/80"><span className="text-5xl opacity-50">🎮</span></div>}
                      
                      <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                        <div className="flex flex-wrap gap-2">
                          <span className="bg-zinc-900/80 backdrop-blur-sm text-white border border-zinc-700/50 text-xs uppercase tracking-wider font-bold px-2.5 py-1 rounded-md shadow">{jogo.plataforma}</span>
                          {jogo.nota > 0 && (<span className="bg-zinc-900/80 backdrop-blur-sm text-amber-400 border border-zinc-700/50 text-[10px] uppercase font-bold px-2 py-1 rounded-md shadow flex items-center gap-1">⭐ {jogo.nota}</span>)}
                          {jogo.tempo_jogo && jogo.tempo_jogo !== '0h' && (<span className="bg-zinc-900/80 backdrop-blur-sm text-zinc-300 border border-zinc-700/50 text-[10px] uppercase font-bold px-2 py-1 rounded-md shadow flex items-center gap-1">⏱️ ~{jogo.tempo_jogo}</span>)}
                        </div>
                        {jogo.estoque > 0 
                          ? <span className="bg-emerald-500/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg border border-emerald-400/50"><span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span>DISPONÍVEL</span>
                          : <span className="bg-rose-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-lg border border-rose-500/50">ALUGADO</span>}
                      </div>

                      {/* AQUI ENTRA O NOVO BADGE NEON DE LANÇAMENTO */}
                      {isLancamento && (
                        <div className="absolute bottom-3 left-3 z-20">
                          <span className="bg-fuchsia-600/90 text-white text-[10px] font-black px-3 py-1.5 rounded-lg border border-fuchsia-400 shadow-[0_0_15px_rgba(192,38,211,0.8)] flex items-center gap-1.5 tracking-widest uppercase backdrop-blur-md">
                            <span className="animate-pulse">🔥</span> Lançamento
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-blue-400 transition-colors leading-tight">{jogo.titulo}</h3>
                      <p className="text-zinc-400 text-xs mb-4 line-clamp-5 leading-relaxed" title={jogo.descricao}>{jogo.descricao}</p>
                      
                      <div className="mt-auto">
                        <div className="flex items-end justify-between mb-4">
                          <div>
                            <div className="text-xl font-black text-white">R$ {jogo.preco_aluguel.toFixed(2)}</div>
                            <span className="text-[10px] text-zinc-500 font-normal">
                                {jogo.preco_aluguel_14 > 0 ? '/ 7 ou 14 dias' : '/ 7 dias'}
                            </span>
                          </div>
                        </div>

                        {jogo.estoque === 0 && (
                          <div className="bg-zinc-950 rounded-lg p-2.5 mb-3 border border-zinc-800/80 shadow-inner">
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="text-[10px] text-zinc-400">👥 Fila de espera:</span>
                              <span className="text-[11px] font-bold text-amber-400">{jogo.tamanho_fila || 0} pessoa(s)</span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-[10px] text-zinc-400">⏳ Sua vez em:</span>
                              <span className="text-[11px] font-bold text-blue-400">{calcularPrevisao(jogo.proxima_devolucao, jogo.tamanho_fila || 0)}</span>
                            </div>
                          </div>
                        )}

                        <button onClick={() => abrirConfirmacao(jogo.estoque > 0 ? 'aluguel' : 'reserva', jogo.id, jogo.titulo, jogo.preco_aluguel, jogo.preco_aluguel_14 || 0)} className={`w-full py-3 rounded-xl text-sm font-bold transition-all duration-300 ${ jogo.estoque > 0 ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-500/20' : 'bg-amber-600 hover:bg-amber-500 text-white shadow-lg shadow-amber-600/20'}`}>
                          {jogo.estoque > 0 ? 'Alugar Agora' : 'Reservar na Fila'}
                        </button>
                      </div>
                    </div>
                  </div>
                  );
                })}
              </div>

              {totalPaginas > 1 && (
                <div className="flex justify-center items-center gap-2 mt-12">
                  <button onClick={() => setPaginaAtual(prev => Math.max(prev - 1, 1))} disabled={paginaAtual === 1} className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-sm">Anterior</button>
                  {[...Array(totalPaginas)].map((_, index) => {
                    const numeroDaPagina = index + 1;
                    return (
                      <button key={numeroDaPagina} onClick={() => setPaginaAtual(numeroDaPagina)} className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${paginaAtual === numeroDaPagina ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30 border border-blue-500' : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white'}`}>{numeroDaPagina}</button>
                    );
                  })}
                  <button onClick={() => setPaginaAtual(prev => Math.min(prev + 1, totalPaginas))} disabled={paginaAtual === totalPaginas} className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-all font-bold text-sm">Próximo</button>
                </div>
              )}
            </div>
          )}

          {abaAtual === 'dashboard' && (
            <div className="animate-fade-in max-w-5xl mx-auto space-y-8">
              <h2 className="text-2xl font-bold text-white">Meu Painel de Controle</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* === CAIXA DE RECARGA === */}
                <section className="bg-zinc-900 p-6 md:p-8 rounded-3xl border border-zinc-800 shadow-2xl flex flex-col h-full relative overflow-hidden">
                  <div className="absolute -right-8 -top-8 text-9xl opacity-5 pointer-events-none">💸</div>
                  <h3 className="text-lg font-bold text-emerald-400 mb-2 flex items-center gap-2">💰 Adicionar Saldo via PIX</h3>
                  <p className="text-sm text-zinc-400 mb-6">Recarregue sua carteira instantaneamente para alugar jogos sem filas.</p>
                  
                  {pixPendente ? (
                    <div className="flex flex-col items-center justify-center animate-fade-in z-10 bg-zinc-950 p-6 rounded-2xl border border-emerald-500/30 shadow-inner">
                        <img src={`data:image/png;base64,${pixPendente.qr_code}`} alt="QR Code PIX" className="w-48 h-48 rounded-xl border border-zinc-800 p-2 mb-4 bg-white" />
                        <p className="text-xs text-zinc-400 mb-3 text-center">Escaneie o QR Code ou copie o código abaixo para pagar no app do seu banco. <strong className="text-emerald-400 block mt-1 animate-pulse">Aguardando pagamento...</strong></p>
                        
                        <div className="flex gap-2 w-full">
                            <button onClick={() => { navigator.clipboard.writeText(pixPendente.copia_cola); mostrarToast("PIX Copiado!", "sucesso"); }} className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-bold py-3 rounded-xl text-xs transition-colors border border-zinc-700">
                                📋 Copiar Código PIX
                            </button>
                            <button onClick={() => setPixPendente(null)} className="bg-rose-900/30 hover:bg-rose-900/80 text-rose-400 font-bold px-4 rounded-xl text-xs transition-colors border border-rose-500/30">
                                Cancelar
                            </button>
                        </div>
                    </div>
                  ) : (
                    <form onSubmit={solicitarGeracaoPix} className="flex flex-col gap-4 mt-auto relative z-10">
                      <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Valor da Recarga (R$)</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-bold">R$</span>
                          <input type="number" min="30" step="1" value={valorRecarga} onChange={e => setValorRecarga(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-zinc-950 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none font-bold text-lg" required />
                        </div>
                        <span className="text-[10px] text-zinc-500 mt-1 block">Valor mínimo: R$ 30,00</span>
                      </div>
  
                      <div>
                        <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Cupom Promocional</label>
                        <input type="text" placeholder="Ex: BORA20" value={cupomRecarga} onChange={e => setCupomRecarga(e.target.value.toUpperCase())} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none uppercase placeholder:normal-case placeholder-zinc-600" />
                      </div>
  
                      <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 px-6 rounded-xl transition-all shadow-lg shadow-emerald-600/20 mt-2 flex items-center justify-center gap-2">
                        <span>Gerar PIX</span> <span className="text-xl">⚡</span>
                      </button>

                      {/* NOVO: SELOS DE SEGURANÇA (Checkout) */}
                      <div className="mt-5 pt-5 border-t border-zinc-800/50 flex flex-col items-center gap-2 opacity-80">
                        <div className="flex items-center gap-2 text-zinc-400 text-[10px] uppercase tracking-widest font-bold">
                          <span>🔒 Pagamento 100% Seguro</span>
                          <span className="text-zinc-700">•</span>
                          <span>🪙 Aceitamos PIX</span>
                        </div>
                        <div className="text-[10px] text-zinc-500 flex items-center gap-1 font-medium text-center">
                          Transação blindada e processada por <strong className="text-white">Asaas Instituição de Pagamento S.A.</strong>
                        </div>
                      </div>
                    </form>
                  )}
                </section>

                <section className="bg-zinc-900/80 p-6 md:p-8 rounded-3xl border border-zinc-800 shadow-2xl flex flex-col h-full">
                  <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">🧾 Extrato da Conta</h3>
                  {extrato.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-zinc-500"><span className="text-4xl mb-2 opacity-30">💳</span><p className="text-sm">Nenhuma transação encontrada.</p></div>
                  ) : (
                    <div className="space-y-3 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent flex-1">
                      {extrato.map((t, i) => (
                        <div key={i} className="flex justify-between items-center bg-zinc-950/50 p-4 rounded-xl border border-zinc-800/50 hover:border-zinc-700 transition-colors">
                          <div>
                            <p className="text-sm font-bold text-zinc-200">{t.descricao}</p>
                            <p className="text-[10px] text-zinc-500 mt-0.5">{new Date(t.data_transacao).toLocaleString()}</p>
                          </div>
                          <span className={`text-base font-black ${t.tipo === 'ENTRADA' ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {t.tipo === 'ENTRADA' ? '+' : '-'} R$ {parseFloat(t.valor).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              </div>

              {/* === NOVA CAIXA DE MUDANÇA DE SENHA === */}
              <section className="bg-zinc-900/80 p-6 md:p-8 rounded-3xl border border-zinc-800 shadow-2xl relative overflow-hidden group">
                <div className="absolute -right-8 -top-8 text-9xl opacity-5 pointer-events-none">🔐</div>
                <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">🔐 Segurança da Conta</h3>
                <p className="text-sm text-zinc-400 mb-6 max-w-2xl leading-relaxed">
                  Mantenha sua conta segura alterando sua senha regularmente ou troque a senha temporária que enviamos por e-mail.
                </p>
                
                <form onSubmit={alterarMinhaSenha} className="flex flex-col sm:flex-row gap-4 items-end max-w-3xl relative z-10">
                  <div className="w-full">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Senha Atual</label>
                    <input type="password" placeholder="Sua senha atual" value={mudarSenhaAtual} onChange={e => setMudarSenhaAtual(e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" required />
                  </div>
                  <div className="w-full">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-1 block">Nova Senha</label>
                    <input type="password" placeholder="Sua nova senha" value={mudarSenhaNova} onChange={e => setMudarSenhaNova(e.target.value)} className="w-full px-4 py-3 bg-zinc-950 border border-zinc-700 text-white rounded-xl focus:ring-2 focus:ring-emerald-500 outline-none" required />
                  </div>
                  <button type="submit" className="w-full sm:w-auto bg-zinc-800 hover:bg-zinc-700 text-white font-bold px-8 py-3 rounded-xl transition-colors border border-zinc-700 whitespace-nowrap shadow-lg">
                    Atualizar Senha
                  </button>
                </form>
              </section>

              {usuarioLogado && usuarioLogado.codigo_indicacao && (
                <section className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 p-6 md:p-8 rounded-3xl border border-purple-500/30 shadow-2xl relative overflow-hidden group">
                  <div className="absolute -right-10 -top-10 text-9xl opacity-5 group-hover:scale-110 transition-transform duration-700 pointer-events-none">🎁</div>
                  <h3 className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">Indique um Amigo e Ganhe Bônus!</h3>
                  <p className="text-sm text-zinc-300 mb-6 max-w-2xl leading-relaxed">
                    Mande o seu código para um amigo. Quando ele criar uma conta nova e fizer a <strong className="text-emerald-400">primeira recarga</strong>, nós daremos <strong>10% do valor</strong> da recarga dele de presente para você gastar em jogos!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 items-center">
                    <div className="bg-zinc-950 border border-zinc-800 px-6 py-3 rounded-xl flex items-center gap-4 w-full sm:w-auto justify-center">
                      <span className="text-xs text-zinc-500 uppercase font-bold tracking-wider">Seu Código:</span>
                      <span className="text-2xl font-black text-white tracking-widest select-all">{usuarioLogado.codigo_indicacao}</span>
                    </div>
                    <button onClick={() => { navigator.clipboard.writeText(usuarioLogado.codigo_indicacao); mostrarToast("Código copiado! Envie para seus amigos.", "sucesso"); }} className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-4 rounded-xl text-sm transition-colors shadow-lg shadow-purple-600/20 w-full sm:w-auto">
                      📋 Copiar Código
                    </button>
                  </div>
                </section>
              )}

              <section className="bg-zinc-900/80 p-6 md:p-8 rounded-3xl border border-zinc-800 border-l-4 border-l-emerald-500 shadow-2xl">
                <h3 className="text-lg font-bold text-emerald-400 mb-6 flex items-center gap-2">🔑 Chaves de Acesso Ativas</h3>
                
                {alugueisAtivos.length > 0 && (
                  <div className="mb-6 bg-rose-950/40 border border-rose-500/50 rounded-xl p-4 flex items-start gap-4 shadow-inner">
                    <span className="text-2xl animate-pulse">🚨</span>
                    <div>
                      <h4 className="text-rose-400 font-bold text-sm uppercase tracking-wider mb-1">Evite Bloqueio e Multa de R$ 50,00</h4>
                      <p className="text-xs text-zinc-300 leading-relaxed">
                        É <strong>obrigatório</strong> desativar o "Compartilhamento de Console" ou "PS4 Principal" na sua conta ANTES do tempo de aluguel expirar. O descumprimento gera uma multa automática e deixa seu saldo negativo.
                      </p>
                    </div>
                  </div>
                )}

                {alugueisAtivos.length === 0 ? <p className="text-zinc-500 text-sm">Nenhum jogo ativo no momento.</p> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap text-sm">
                      <thead><tr className="text-zinc-500 border-b border-zinc-800"><th className="pb-3 px-4 font-medium">Jogo</th><th className="pb-3 px-4 font-medium">E-mail PSN</th><th className="pb-3 px-4 font-medium">Senha</th><th className="pb-3 px-4 font-medium text-center">Acesso (2FA)</th><th className="pb-3 px-4 font-medium">Expira em</th><th className="pb-3 px-4 font-medium text-right">Ações</th></tr></thead>
                      <tbody>
                        {alugueisAtivos.map(item => (
                          <tr key={item.locacao_id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                            <td className="py-4 px-4 font-bold text-white">{item.jogo}</td>
                            <td className="py-4 px-4 text-blue-400 select-all">{item.email_login}</td>
                            <td className="py-4 px-4 text-zinc-300 font-mono bg-black/20 rounded select-all">{item.senha_login}</td>
                            <td className="py-4 px-4 text-center">
                              {codigosGerados2FA[item.locacao_id] ? (
                                <span className="text-emerald-400 font-mono text-lg font-bold tracking-widest bg-zinc-950 px-3 py-1 rounded border border-emerald-500/30 select-all">
                                  {codigosGerados2FA[item.locacao_id]}
                                </span>
                              ) : (
                                <button onClick={() => gerarCodigo2FA(item.locacao_id)} className="bg-zinc-800 hover:bg-blue-600 text-xs text-white font-bold px-3 py-1.5 rounded transition-colors shadow shadow-blue-500/10">🔐 Gerar 2FA</button>
                              )}
                            </td>
                            <td className="py-4 px-4 text-amber-400">{new Date(item.data_fim).toLocaleString()}</td>
                            
                            <td className="py-4 px-4 text-right">
                              {configSistema.devolucao_dinamica && (
                                <button onClick={() => devolverAntecipado(item.locacao_id, item.data_fim)} className="bg-emerald-900/40 hover:bg-emerald-600 text-emerald-400 hover:text-white font-bold px-3 py-1.5 rounded-lg text-xs transition-colors border border-emerald-500/30 shadow">
                                  ♻️ Devolver
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              <section className="bg-zinc-900/80 p-6 md:p-8 rounded-3xl border border-zinc-800 border-l-4 border-l-amber-500 shadow-2xl">
                <h3 className="text-lg font-bold text-amber-400 mb-6 flex items-center gap-2">⏳ Minhas Reservas (Fila de Espera)</h3>
                {minhasReservas.length === 0 ? <p className="text-zinc-500 text-sm">Você não possui reservas ativas na fila.</p> : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap text-sm">
                      <thead><tr className="text-zinc-500 border-b border-zinc-800"><th className="pb-3 px-4 font-medium">Jogo</th><th className="pb-3 px-4 font-medium">Data da Reserva</th><th className="pb-3 px-4 font-medium">Status</th><th className="pb-3 px-4 font-medium">Previsão de Liberação</th></tr></thead>
                      <tbody>
                        {minhasReservas.map(item => (
                          <tr key={item.reserva_id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                            <td className="py-4 px-4 font-bold text-white">{item.jogo}</td>
                            <td className="py-4 px-4 text-zinc-300">{new Date(item.data_solicitacao).toLocaleString()}</td>
                            <td className="py-4 px-4 text-amber-400 font-bold">Aguardando</td>
                            <td className="py-4 px-4 text-blue-400 font-bold">{calcularPrevisao(item.proxima_devolucao, item.pessoas_na_frente)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>

              {historicoAlugueis.length > 0 && (
                <section className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800">
                  <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-4">🕰️ Últimos 5 Aluguéis</h3>
                  <div className="flex flex-wrap gap-2">
                    {historicoAlugueis.map(item => (
                      <span key={item.locacao_id} className="bg-zinc-950 border border-zinc-800 text-zinc-400 px-4 py-1.5 rounded-full text-xs">{item.jogo} <span className="opacity-50 ml-1">({new Date(item.data_fim).toLocaleDateString()})</span></span>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {abaAtual === 'faq' && (
            <div className="animate-fade-in max-w-4xl mx-auto py-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 mb-4">Central de Ajuda</h2>
                <p className="text-zinc-400">Tudo o que você precisa saber para alugar e jogar sem dores de cabeça.</p>
              </div>

              <div className="space-y-4">
                <details className="group bg-zinc-900 border border-zinc-800 rounded-2xl [&_summary::-webkit-details-marker]:hidden shadow-lg">
                  <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-bold text-lg">
                    <span>🎮 Como funciona o aluguel no BORA JOGAR!?</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-purple-400">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800 pt-4 mt-2">
                    É super simples! Você adiciona saldo à sua carteira digital, escolhe o jogo na vitrine e clica em "Alugar Agora". O valor é descontado e os dados da conta (E-mail e Senha) aparecem imediatamente na sua aba <strong>🔑 Meus Acessos</strong>. O aluguel dura 7 dias corridos a partir do momento da compra.
                  </div>
                </details>

                <details className="group bg-zinc-900 border border-zinc-800 rounded-2xl [&_summary::-webkit-details-marker]:hidden shadow-lg">
                  <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-bold text-lg">
                    <span>🕹️ Como eu coloco a conta alugada no meu PlayStation?</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-purple-400">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800 pt-4 mt-2">
                    <ol className="list-decimal pl-5 space-y-2 text-zinc-300">
                      <li>Ligue seu console e vá na tela de seleção de usuário.</li>
                      <li>Selecione <strong>"Adicionar Novo Usuário"</strong> (Nunca escolha "Jogar como Convidado").</li>
                      <li>Clique em <strong>"Iniciar Sessão e Jogar"</strong>.</li>
                      <li>Insira o E-mail e a Senha fornecidos na aba <em>Meus Acessos</em>.</li>
                      <li>Quando o console pedir o código de verificação (2FA), siga as instruções da próxima pergunta!</li>
                    </ol>
                  </div>
                </details>

                <details className="group bg-zinc-900 border border-zinc-800 rounded-2xl [&_summary::-webkit-details-marker]:hidden shadow-lg">
                  <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-bold text-lg">
                    <span>🔐 O videogame pediu um código de verificação (2FA). O que eu faço?</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-purple-400">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800 pt-4 mt-2">
                    A segurança vem em primeiro lugar! Na aba <strong>🔑 Meus Acessos</strong>, ao lado da senha do seu jogo, existe um botão azul chamado <strong>"Gerar 2FA"</strong>.<br/><br/>
                    Basta clicar nele que um código de 6 dígitos vai aparecer na sua tela. Digite esse código rapidamente no seu PlayStation (ele muda a cada 30 segundos). Você não precisa mandar mensagem pro suporte, o sistema gera o código para você na hora!
                  </div>
                </details>

                <details className="group bg-zinc-900 border border-zinc-800 rounded-2xl [&_summary::-webkit-details-marker]:hidden shadow-lg">
                  <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-bold text-lg">
                    <span>🏆 Posso jogar na minha conta pessoal e ganhar os troféus?</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-purple-400">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800 pt-4 mt-2">
                    <strong>Sim, com certeza!</strong> Para isso, logo após fazer o login com a conta alugada no console:
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li><strong>No PS5:</strong> Vá em Configurações &gt; Usuários e Contas &gt; Outros &gt; <em>Compartilhamento do console e jogo offline</em> e ative.</li>
                      <li><strong>No PS4:</strong> Vá em Configurações &gt; Gerenciamento da conta &gt; <em>Ativar como seu PS4 principal</em> e ative.</li>
                    </ul>
                    Depois disso, inicie o download do jogo, troque para a sua conta pessoal (a sua oficial) e jogue normalmente. Os saves e troféus ficarão nela!
                  </div>
                </details>

                <details className="group bg-zinc-900 border border-zinc-800 rounded-2xl [&_summary::-webkit-details-marker]:hidden shadow-lg">
                  <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-bold text-lg">
                    <span>⏳ E se o jogo que eu quero estiver "Alugado"?</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-purple-400">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-zinc-400 text-sm leading-relaxed border-t border-zinc-800 pt-4 mt-2">
                    Não se preocupe, você pode garantir a sua vaga! Clique no botão <strong>"Reservar na Fila"</strong>. O valor do jogo será investido e você verá uma data de <em>Previsão de Liberação</em> em "Meus Acessos". <br/><br/>
                    Nosso sistema inteligente repassa a conta automaticamente para você no exato segundo em que o aluguel do cliente anterior terminar.
                  </div>
                </details>

                <details className="group bg-zinc-900 border border-zinc-800 rounded-2xl [&_summary::-webkit-details-marker]:hidden shadow-lg">
                  <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-bold text-lg">
                    <span className="text-emerald-400">♻️ Posso devolver um jogo antes do prazo e receber cashback?</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-emerald-400">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-zinc-300 text-sm leading-relaxed border-t border-emerald-500/30 pt-4 mt-2">
                    Nós possuímos um sistema de <strong>Devolução Dinâmica</strong>! Essa opção fica ativa automaticamente apenas quando o jogo que você alugou está com <strong>alta demanda</strong> (ou seja, quando existem outras pessoas na fila de espera aguardando para jogar).<br/><br/>
                    Se este for o caso, um botão verde <strong>"♻️ Devolver"</strong> aparecerá ao lado do seu jogo na aba <em>Meus Acessos</em>. Ao fazer a devolução antecipada para agilizar a fila, você ganha uma recompensa: <strong>R$ {configSistema.valor_por_dia.toFixed(2)} de cashback por cada 24 horas (1 dia completo)</strong> que ainda restavam no seu prazo!<br/><br/>
                    O valor cai direto na sua carteira digital assim que a nossa equipe verificar que a conta foi devidamente desativada do seu console.
                  </div>
                </details>

                <details className="group bg-rose-950/20 border border-rose-500/30 rounded-2xl [&_summary::-webkit-details-marker]:hidden shadow-lg">
                  <summary className="flex items-center justify-between p-6 cursor-pointer text-white font-bold text-lg">
                    <span className="text-rose-400">🚨 O que acontece se eu esquecer de desativar a conta do meu videogame?</span>
                    <span className="transition duration-300 group-open:-rotate-180 text-rose-400">▼</span>
                  </summary>
                  <div className="px-6 pb-6 text-zinc-300 text-sm leading-relaxed border-t border-rose-500/30 pt-4 mt-2">
                    Essa é a nossa regra mais rigorosa! Se o seu tempo acabar e você deixar a conta ativada como "Principal" no seu console, isso bloqueia o console e impede que o próximo cliente da fila jogue. <br/><br/>
                    Neste caso, nosso sistema aplica uma <strong>Multa Administrativa Automática de R$ 50,00</strong> direto na sua carteira digital. Se você não tiver saldo, sua conta ficará negativada e bloqueada para alugar jogos. Por isso, coloque sempre um alarme!
                  </div>
                </details>

              </div>
            </div>
          )}

          {abaAtual === 'admin' && usuarioLogado.is_admin && (
            <div className="animate-fade-in mt-2">
              
              <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-br from-emerald-900/40 to-zinc-900 border border-emerald-500/30 p-6 rounded-3xl shadow-lg relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-6xl opacity-10">💰</div>
                  <h4 className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-2">Faturamento Total</h4>
                  <span className="text-3xl md:text-4xl font-black text-emerald-400">R$ {estatisticasAdmin.faturamento.toFixed(2)}</span>
                </div>
                <div className="bg-gradient-to-br from-blue-900/40 to-zinc-900 border border-blue-500/30 p-6 rounded-3xl shadow-lg relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-6xl opacity-10">👥</div>
                  <h4 className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-2">Clientes Cadastrados</h4>
                  <span className="text-3xl md:text-4xl font-black text-blue-400">{estatisticasAdmin.total_clientes}</span>
                </div>
                <div className="bg-gradient-to-br from-amber-900/40 to-zinc-900 border border-amber-500/30 p-6 rounded-3xl shadow-lg relative overflow-hidden">
                  <div className="absolute -right-4 -top-4 text-6xl opacity-10">🎮</div>
                  <h4 className="text-zinc-400 text-sm font-bold uppercase tracking-wider mb-2">Locações Ativas Agora</h4>
                  <span className="text-3xl md:text-4xl font-black text-amber-400">{estatisticasAdmin.locacoes_ativas}</span>
                </div>
              </section>

              <section className="bg-zinc-900 border border-zinc-800 p-6 rounded-3xl mb-8 shadow-2xl">
                <h3 className="text-lg font-bold text-blue-400 mb-6 flex items-center gap-2">⚙️ Configurações Globais do Sistema</h3>
                
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row items-center justify-between bg-zinc-950 p-5 rounded-xl border border-zinc-800/50 gap-4">
                    <div>
                      <h4 className="text-white font-bold text-base">Devolução Dinâmica (Cashback)</h4>
                      <p className="text-sm text-zinc-400 mt-1">Permite que clientes devolvam contas antes do prazo e recebam R$ {configSistema.valor_por_dia.toFixed(2)} por cada 24h restantes.</p>
                    </div>
                    <button onClick={toggleDevolucao} className={`px-6 py-3 rounded-xl font-black text-sm transition-all shadow-lg w-full sm:w-auto ${configSistema.devolucao_dinamica ? 'bg-emerald-600 text-white shadow-emerald-600/20' : 'bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700'}`}>
                      {configSistema.devolucao_dinamica ? '✅ ATIVADO' : '❌ DESATIVADO'}
                    </button>
                  </div>

                  <div className="bg-zinc-950 p-5 rounded-xl border border-zinc-800/50 gap-4">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                      <div>
                        <h4 className="text-white font-bold text-base text-orange-400">📣 Hero Alert (Banner da Vitrine)</h4>
                        <p className="text-sm text-zinc-400 mt-1">Crie um aviso chamativo na página inicial para anunciar promoções, avisos de feriado ou cupons.</p>
                      </div>
                      <button onClick={toggleAnuncio} className={`px-6 py-3 rounded-xl font-black text-sm transition-all shadow-lg w-full sm:w-auto ${configSistema.anuncio_ativo ? 'bg-orange-600 text-white shadow-orange-600/20' : 'bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700'}`}>
                        {configSistema.anuncio_ativo ? '✅ BANNER LIGADO' : '❌ BANNER DESLIGADO'}
                      </button>
                    </div>
                    <textarea placeholder="Ex: PROMOÇÃO DE FIM DE SEMANA! Recarregue R$ 50..." value={configSistema.mensagem_anuncio} onChange={(e) => setConfigSistema({...configSistema, mensagem_anuncio: e.target.value})} className={`${adminInputClass} resize-none h-20 bg-zinc-900 border-zinc-700 focus:ring-orange-500`} />
                  </div>

                  <div className="flex justify-end">
                    <button onClick={salvarConfiguracoesGlobais} className="bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-3 rounded-xl shadow-lg shadow-blue-600/20 transition-colors">
                      💾 Salvar Texto do Anúncio
                    </button>
                  </div>
                </div>
              </section>

              {contasManutencao.length > 0 && (
                <section className="bg-rose-950/20 border border-rose-500/30 p-6 rounded-3xl mb-8 animate-pulse-slow">
                  <h3 className="text-xl font-bold text-rose-400 mb-4 flex items-center gap-2">🚨 Atenção: Troca de Senha Necessária</h3>
                  <p className="text-base text-zinc-300 mb-6">As locações abaixo terminaram. Você deve entrar na PSN, alterar a senha destas contas e informá-las aqui para que o sistema repasse para o próximo da fila.</p>
                  
                  <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                    {contasManutencao.map(conta => (
                      <div key={conta.conta_psn_id} className="bg-zinc-900 p-5 rounded-xl border border-rose-500/50 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <strong className="text-white block text-lg mb-1">{conta.jogo}</strong>
                            <span className="text-sm text-zinc-400 block mb-1">Login: {conta.email_login}</span>
                            <span className="text-sm text-zinc-500 line-through block">Senha Velha: {conta.senha_antiga}</span>
                            
                            <span className="block mt-3 text-sm font-bold text-amber-500 bg-amber-500/10 px-3 py-1.5 rounded inline-block">
                              Último a alugar: {conta.ultimo_cliente_nome || 'Desconhecido'}
                            </span>

                            {conta.cashback_pendente > 0 && (
                              <span className="block mt-2 text-sm font-bold text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded inline-block border border-emerald-500/30">
                                💸 Cliente aguardando Cashback: R$ {conta.cashback_pendente.toFixed(2)}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex flex-col gap-2 items-end">
                            {conta.ultimo_cliente_telefone && (
                              <button onClick={() => cobrarNoWhatsApp(conta.ultimo_cliente_nome, conta.ultimo_cliente_telefone, conta.jogo)} className="bg-emerald-900/40 hover:bg-emerald-600 text-emerald-400 hover:text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors border border-emerald-500/30 shadow flex items-center gap-2 w-full justify-center">
                                📱 Cobrar no WhatsApp
                              </button>
                            )}
                            {conta.ultimo_cliente_id && (
                              <button onClick={() => aplicarMultaCliente(conta.ultimo_cliente_id, conta.ultimo_cliente_nome)} className="bg-rose-900/40 hover:bg-rose-600 text-rose-400 hover:text-white font-bold px-4 py-2 rounded-lg text-sm transition-colors border border-rose-500/30 shadow flex items-center gap-2 w-full justify-center">
                                🚨 Aplicar Multa
                              </button>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex gap-3 mt-2 pt-4 border-t border-zinc-800">
                          <input type="text" placeholder="Digite a NOVA senha para liberar" value={novasSenhasTemp[conta.conta_psn_id] || ''} onChange={(e) => setNovasSenhasTemp({...novasSenhasTemp, [conta.conta_psn_id]: e.target.value})} className="flex-1 px-4 py-2 bg-zinc-950 border border-zinc-700 rounded-lg text-base text-white focus:border-rose-500 outline-none"/>
                          <button onClick={() => confirmarResetSenha(conta.conta_psn_id)} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 rounded-lg text-base transition-colors shadow-lg shadow-emerald-600/20">Liberar Jogo</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              <section className="bg-gradient-to-r from-purple-900/20 to-zinc-900 border border-purple-500/30 p-6 rounded-3xl mb-8 shadow-2xl">
                <h3 className="text-lg font-bold text-purple-400 mb-6 flex items-center gap-2">🎟️ Gerenciar Cupons Promocionais</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <form onSubmit={cadastrarCupom} className="flex flex-col gap-3 lg:col-span-1">
                    <input type="text" placeholder="Código (Ex: VIP20)" value={novoCupomCodigo} onChange={e => setNovoCupomCodigo(e.target.value.toUpperCase())} className={adminInputClass} required />
                    <div className="flex gap-2">
                      <select value={novoCupomTipo} onChange={e => setNovoCupomTipo(e.target.value)} className={adminInputClass}>
                        <option value="PORCENTAGEM">% Porcentagem</option>
                        <option value="FIXO">R$ Valor Fixo</option>
                      </select>
                      <input type="number" step="0.01" placeholder="Valor" value={novoCupomValor} onChange={e => setNovoCupomValor(e.target.value)} className={adminInputClass} required />
                    </div>
                    <button type="submit" className="w-full py-2.5 bg-purple-600 hover:bg-purple-500 font-bold rounded-lg text-sm text-white transition-colors shadow-lg shadow-purple-500/20 mt-2">Criar Cupom</button>
                  </form>

                  <div className="lg:col-span-2 overflow-y-auto max-h-[160px] pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                    {listaCupons.length === 0 ? <p className="text-zinc-500 text-sm">Nenhum cupom ativo.</p> : (
                      <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead><tr className="text-zinc-500 border-b border-zinc-800"><th className="pb-2">Código</th><th className="pb-2">Tipo</th><th className="pb-2">Bônus</th><th className="pb-2 text-right">Ação</th></tr></thead>
                        <tbody>
                          {listaCupons.map(c => (
                            <tr key={c.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                              <td className="py-2.5 font-bold text-white tracking-widest">{c.codigo}</td>
                              <td className="py-2.5 text-zinc-400 text-xs">{c.tipo}</td>
                              <td className="py-2.5 text-emerald-400 font-bold">{c.tipo === 'FIXO' ? `+ R$ ${c.valor.toFixed(2)}` : `+ ${c.valor}%`}</td>
                              <td className="py-2.5 text-right"><button onClick={() => removerCupom(c.id)} className="text-rose-400 hover:text-white bg-rose-900/30 px-3 py-1 rounded-lg text-xs font-bold transition-colors">Excluir</button></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                  </div>
                </div>
              </section>

              <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <div className={adminCardClass}>
                  <h3 className="text-base font-bold text-blue-400 mb-4 flex items-center gap-2">🕹️ Novo Jogo</h3>
                  <form onSubmit={cadastrarJogo} className="space-y-3 flex-1 flex flex-col">
  
                    {/* 1. Título e Botão de Busca */}
                    <div className="flex gap-2">
                      <input type="text" placeholder="Título do jogo" value={novoJogoTitulo} onChange={e => setNovoJogoTitulo(e.target.value)} className={adminInputClass} required />
                      <button type="button" onClick={buscarDadosDoJogo} className="bg-amber-500 hover:bg-amber-400 text-zinc-900 font-bold px-4 rounded-lg text-xs whitespace-nowrap transition-colors shadow-lg">✨ Buscar</button>
                    </div>

                    {/* 2. URL da Capa */}
                    <input type="url" placeholder="URL da Capa" value={novoJogoImagem} onChange={e => setNovoJogoImagem(e.target.value)} className={adminInputClass} />

                    {/* 3. Plataforma, Tempo e Nota */}
                    <div className="flex gap-2">
                      <select value={novoJogoPlataforma} onChange={e => setNovoJogoPlataforma(e.target.value)} className={adminInputClass}>
                        <option value="PS5">PS5</option>
                        <option value="PS4">PS4</option>
                        <option value="PS4/PS5">PS4/PS5</option>
                      </select>
                      <input type="text" placeholder="Tempo (ex: 20h)" value={novoJogoTempo} onChange={e => setNovoJogoTempo(e.target.value)} className={adminInputClass} />
                      <input type="number" step="0.1" placeholder="Nota" value={novoJogoNota} onChange={e => setNovoJogoNota(e.target.value)} className={adminInputClass} />
                    </div>

                    {/* 4. OS PREÇOS DE 7 E 14 DIAS LADO A LADO */}
                    <div className="flex gap-2">
                      <input type="number" step="0.01" placeholder="Preço 7 Dias (Ex: 35.00)" value={novoJogoPreco} onChange={e => setNovoJogoPreco(e.target.value)} className={adminInputClass} required />
                      <input type="number" step="0.01" placeholder="Preço 14 Dias (Ex: 60.00)" value={novoJogoPreco14} onChange={e => setNovoJogoPreco14(e.target.value)} className={adminInputClass} />
                    </div>

                    {/* 5. Descrição e Botão Salvar */}
                    <textarea placeholder="Descrição" value={novoJogoDescricao} onChange={e => setNovoJogoDescricao(e.target.value)} className={`${adminInputClass} resize-none h-16`} required />
                    <button type="submit" className="w-full mt-auto py-2.5 bg-blue-600 hover:bg-blue-500 font-bold rounded-lg text-sm transition-colors">Salvar no Catálogo</button>

                  </form>
                </div>

                <div className={`${adminCardClass} border-purple-500/30`}>
                  <h3 className="text-base font-bold text-purple-400 mb-4 flex items-center gap-2">🔐 Abastecer Estoque</h3>
                  <input type="text" placeholder="🔍 Filtrar jogo..." value={buscaEstoque} onChange={e => setBuscaEstoque(e.target.value)} className={`${adminInputClass} mb-3`} />
                  <form onSubmit={cadastrarConta} className="space-y-3 flex-1 flex flex-col">
                    <select value={novaContaJogoId} onChange={e => setNovaContaJogoId(e.target.value)} className={adminInputClass} required><option value="">Selecione o Jogo...</option>{jogosEstoqueFiltrados.map(j => <option key={j.id} value={j.id}>{j.titulo}</option>)}</select>
                    <input type="email" placeholder="E-mail PSN" value={novaContaEmail} onChange={e => setNovaContaEmail(e.target.value)} className={adminInputClass} required />
                    <input type="text" placeholder="Senha PSN" value={novaContaSenha} onChange={e => setNovaContaSenha(e.target.value)} className={adminInputClass} required />
                    <input type="text" placeholder="Segredo MFA (Opcional)" value={novaContaMfaSecret} onChange={e => setNovaContaMfaSecret(e.target.value)} className={adminInputClass} title="Cole aqui o texto de configuração do App Autenticador da Sony" />
                    <button type="submit" className="w-full mt-auto py-2.5 bg-purple-600 hover:bg-purple-500 font-bold rounded-lg text-sm transition-colors">Adicionar Conta</button>
                  </form>
                </div>

                <div className={adminCardClass}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-bold text-blue-400">📚 Catálogo</h3>
                    <input type="text" placeholder="🔍 Buscar..." value={termoBusca} onChange={e => setTermoBusca(e.target.value)} className="w-1/2 p-1.5 px-3 bg-zinc-800 border border-zinc-700 rounded-lg text-sm focus:outline-none" />
                  </div>
                  {jogosAdminParaMostrar.length === 0 ? <p className="text-zinc-500 text-sm">Vazio.</p> : (
                    <ul className="space-y-2 flex-1">
                      {jogosAdminParaMostrar.map(jogo => (
                        <li key={jogo.id} className="flex flex-col md:flex-row justify-between items-start md:items-center bg-zinc-800/50 p-3 rounded-lg border-l-2 border-rose-500 gap-3">
                          <div className="flex flex-col leading-tight gap-1 w-full md:w-auto">
                            <span className="font-bold text-sm truncate max-w-[200px]">{jogo.titulo}</span>
                            <span className="text-xs text-zinc-400">R$ {jogo.preco_aluguel.toFixed(2)}</span>
                            {jogo.estoque > 0 ? <span className="text-emerald-400 text-xs">✅ {jogo.estoque} Disponível</span> : <span className="text-rose-400 text-xs">❌ Alugado</span>}
                          </div>
                          
                          <div className="flex gap-2 w-full md:w-auto justify-end">
                            {editandoPrecoId === jogo.id ? (
                              <div className="flex items-center gap-2">
                                <span className="text-zinc-500 text-xs font-bold">R$</span>
                                <input type="number" step="0.01" value={novoPrecoEdicao} onChange={e => setNovoPrecoEdicao(e.target.value)} className="w-20 px-2 py-1 bg-zinc-950 border border-zinc-700 rounded text-xs text-white focus:outline-none focus:border-emerald-500" placeholder="Novo" />
                                <button onClick={() => salvarNovoPreco(jogo.id)} className="text-emerald-400 hover:text-white text-xs bg-emerald-900/30 hover:bg-emerald-600 px-3 py-1.5 rounded-lg font-bold transition-colors border border-emerald-500/30">Salvar</button>
                                <button onClick={() => setEditandoPrecoId(null)} className="text-zinc-400 hover:text-white text-xs bg-zinc-800 hover:bg-zinc-700 px-3 py-1.5 rounded-lg font-bold transition-colors">X</button>
                              </div>
                            ) : (
                              <>
                                <button onClick={() => { setEditandoPrecoId(jogo.id); setNovoPrecoEdicao(jogo.preco_aluguel); }} className="text-blue-400 hover:text-white text-xs bg-blue-900/30 hover:bg-blue-600 px-3 py-1.5 rounded-lg font-bold transition-colors border border-blue-500/30">Editar</button>
                                <button onClick={() => removerJogo(jogo.id)} className="text-rose-400 hover:text-white text-xs bg-rose-900/30 hover:bg-rose-600 px-3 py-1.5 rounded-lg font-bold transition-colors border border-rose-500/30">Excluir</button>
                              </>
                            )}
                          </div>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>

              <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className={adminCardClass}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-bold text-emerald-400">👁️ Locações Ativas</h3>
                    <input type="text" placeholder="🔍 Buscar locação..." value={buscaLocacao} onChange={e => setBuscaLocacao(e.target.value)} className="w-1/3 p-1.5 px-3 bg-zinc-800 border border-zinc-700 rounded-lg text-sm" />
                  </div>
                  {locacoesAdminParaMostrar.length === 0 ? <p className="text-zinc-500 text-sm">Nenhuma locação.</p> : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead>
                          <tr className="text-zinc-500 border-b border-zinc-800">
                            <th className="pb-2">Cliente</th>
                            <th className="pb-2">Jogo</th>
                            <th className="pb-2">Expira</th>
                            <th className="pb-2 text-right">Ação</th>
                          </tr>
                        </thead>
                        <tbody>
                          {locacoesAdminParaMostrar.map(loc => (
                            <tr key={loc.id} className="border-b border-zinc-800/50 hover:bg-zinc-800/30">
                              <td className="py-2 text-zinc-300">{loc.cliente}</td>
                              <td className="py-2 font-semibold">{loc.jogo}</td>
                              <td className="py-2 text-rose-300">{new Date(loc.data_fim).toLocaleDateString()}</td>
                              <td className="py-2 text-right">
                                <button onClick={() => revogarLocacao(loc.id)} className="text-rose-400 hover:text-white text-[10px] uppercase tracking-wider bg-rose-900/30 hover:bg-rose-600 px-3 py-1.5 rounded-lg font-bold transition-colors border border-rose-500/30 shadow">
                                  Revogar
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>

                <div className={adminCardClass}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-base font-bold text-amber-400">👥 Clientes</h3>
                    <input type="text" placeholder="🔍 Buscar cliente..." value={buscaCliente} onChange={e => setBuscaCliente(e.target.value)} className="w-1/3 p-1.5 px-3 bg-zinc-800 border border-zinc-700 rounded-lg text-sm" />
                  </div>
                  {clientesParaMostrar.length === 0 ? <p className="text-zinc-500 text-sm">Vazio.</p> : (
                    <ul className="space-y-3 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-zinc-700 scrollbar-track-transparent">
                      {clientesParaMostrar.map(u => (
                        <li key={u.id} className="flex justify-between items-center bg-zinc-800/50 p-3 rounded-lg border border-zinc-700/50">
                          <div className="flex flex-col gap-1">
                            <span className="text-sm font-medium">
                              {u.nome} {u.is_admin && <span className="ml-2 text-[10px] bg-amber-500/20 text-amber-400 px-2 py-0.5 rounded-full uppercase">Admin</span>}
                            </span>
                            <span className="text-xs text-zinc-400">
                              Saldo: <strong className={u.saldo < 0 ? 'text-rose-400' : 'text-emerald-400'}>R$ {parseFloat(u.saldo).toFixed(2)}</strong>
                            </span>
                          </div>
                          {!u.is_admin && (
                            <div className="flex gap-2">
                              <button onClick={() => ajustarSaldoCliente(u.id, u.nome)} className="text-blue-400 hover:text-white text-xs bg-blue-900/30 hover:bg-blue-600 px-3 py-1.5 rounded-lg font-bold transition-colors border border-blue-500/30">
                                ⚖️ Ajustar Saldo
                              </button>
                              <button onClick={() => removerUsuario(u.id)} className="text-rose-400 hover:text-white text-xs bg-rose-900/30 hover:bg-rose-600 px-3 py-1.5 rounded-lg font-bold transition-colors border border-rose-500/30">
                                Excluir
                              </button>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* BOTÃO FLUTUANTE DO WHATSAPP */}
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

        {/* ==================== NOVO RODAPÉ (FOOTER) ==================== */}
        <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8 mt-12 relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
              
              <div className="col-span-1 md:col-span-2">
                <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400 tracking-tighter mb-4 block">BORA JOGAR!</span>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mb-6">
                  Sua locadora de jogos digitais next-gen. Alugue os maiores lançamentos de PlayStation de forma automática, rápida e sem sair de casa.
                </p>
                <div className="flex gap-4">
                  {/* Ícones de Redes Sociais (Substitua os links depois) */}
                  <a href="#" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-pink-500 hover:bg-pink-500/10 transition-all shadow-lg" title="Instagram">
                    📸
                  </a>
                  <a href={`https://wa.me/${NUMERO_WHATSAPP_SUPORTE}`} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-emerald-500 hover:bg-emerald-500/10 transition-all shadow-lg" title="WhatsApp">
                    💬
                  </a>
                </div>
              </div>

              <div>
                <h4 className="text-white font-bold mb-5 tracking-wide uppercase text-sm">Acesso Rápido</h4>
                <ul className="space-y-3 text-sm text-zinc-400">
                  <li><button onClick={() => setAbaAtual('vitrine')} className="hover:text-blue-400 transition-colors">Catálogo de Jogos</button></li>
                  <li><button onClick={() => setAbaAtual('faq')} className="hover:text-purple-400 transition-colors">Como Funciona (FAQ)</button></li>
                  <li><a href="#" className="hover:text-white transition-colors">Termos de Uso</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Política de Privacidade</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-white font-bold mb-5 tracking-wide uppercase text-sm">Segurança</h4>
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/80 shadow-inner">
                    <span className="text-2xl drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">🔒</span>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Certificado SSL</span>
                      <span className="text-xs text-zinc-300 font-medium">Site Seguro 256-bits</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800/80 shadow-inner">
                    <span className="text-2xl drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">⚡</span>
                    <div className="flex flex-col">
                      <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider">Gateway Oficial</span>
                      <span className="text-xs text-zinc-300 font-medium">Powered by Asaas</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-zinc-500 font-medium">
              <p>© 2026 Locadora Bora Jogar. Todos os direitos reservados.</p>
              {/* Você pode colocar seu CNPJ real ou MEI aqui depois */}
              <p>CNPJ: 00.000.000/0001-00 • Curitiba, PR</p> 
            </div>
          </div>
        </footer>

      </>
      )}
    </div>
  )
}

export default App