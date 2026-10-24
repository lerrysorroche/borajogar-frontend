// Registro dos temas sazonais. As CORES de cada tema ficam em src/temas.css
// (variáveis lidas pelo Tailwind); aqui ficam nome, ícone e textos.
// As datas do calendário automático vivem no backend (borajogar-backend/temas.py);
// CALENDARIO_TEMAS abaixo é só a cópia para mostrar no Painel Admin.

export const TEMAS = {
  normal: { nome: 'Normal', emoji: '🎮' },
  halloween: {
    nome: 'Halloween',
    emoji: '🎃',
    faixa: 'Semana do Halloween na Bora Jogar! Sustos, terror e muita diversão no catálogo.',
  },
  natal: {
    nome: 'Natal',
    emoji: '🎄',
    faixa: 'Feliz Natal! A Bora Jogar deseja boas festas e muitas horas de jogo com quem você ama.',
  },
  ano_novo: {
    nome: 'Ano Novo',
    emoji: '🎆',
    faixa: 'Feliz Ano Novo! Que o próximo ano venha cheio de jogos incríveis.',
  },
};

export const CALENDARIO_TEMAS = [
  { tema: 'halloween', periodo: '25/10 a 02/11' },
  { tema: 'natal', periodo: '01/12 a 26/12' },
  { tema: 'ano_novo', periodo: '27/12 a 05/01' },
];

export const TEMAS_VALIDOS = Object.keys(TEMAS);

// Ícone da aba do navegador: emoji do tema desenhado num SVG.
export const faviconDoTema = (emoji) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y=".9em" font-size="90">${emoji}</text></svg>`,
  )}`;
