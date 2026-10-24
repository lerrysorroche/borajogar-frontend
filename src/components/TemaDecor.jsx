// Decoração dos temas sazonais (Halloween, Natal, Ano Novo). Tudo em SVG/CSS,
// sem imagens para baixar, só com transform/opacity nas animações (leve no
// celular). As cores dos botões/fundos NÃO vêm daqui: vêm de src/temas.css.

import { TEMAS } from '../temas';

// ---------------------------------------------------------------------------
// Peças desenhadas
// ---------------------------------------------------------------------------

function Morcego({ className = '', style }) {
  return (
    <svg viewBox="0 0 64 28" className={className} style={style} aria-hidden="true">
      <path
        fill="currentColor"
        d="M32 6c-1.8 0-2.6 1.9-3.4 3.6C25 6.4 19.6 4.6 12 6.2c3.2 1.4 4.6 3.6 4.9 6.3-3.1-1.6-6.6-1.8-10.4-.8 3.8 1.2 6.3 3.2 7.6 6.2 2.3-1.7 4.7-2.3 7.2-1.6.9 3.3 2.7 6.4 6.7 8.7 4-2.3 5.8-5.4 6.7-8.7 2.5-.7 4.9-.1 7.2 1.6 1.3-3 3.8-5 7.6-6.2-3.8-1-7.3-.8-10.4.8.3-2.7 1.7-4.9 4.9-6.3-7.6-1.6-13 .2-16.6 3.4C34.6 7.9 33.8 6 32 6z"
      />
      <circle cx="29.2" cy="11.4" r="0.9" fill="#ffd8a8" />
      <circle cx="34.8" cy="11.4" r="0.9" fill="#ffd8a8" />
    </svg>
  );
}

function TeiaCanto({ className = '', style }) {
  return (
    <svg viewBox="0 0 130 130" className={className} style={style} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round">
        <path d="M0 0 L130 0 M0 0 L122 38 M0 0 L98 98 M0 0 L38 122 M0 0 L0 130" />
        <path d="M30 0 Q27 24 0 30 M62 0 Q52 46 0 62 M96 0 Q78 68 0 96 M126 0 Q104 90 0 126" />
        <path d="M30 0 Q27 24 0 30" />
      </g>
      {/* aranha pendurada */}
      <g className="tema-balanco" style={{ transformOrigin: '84px 0px' }}>
        <line x1="84" y1="0" x2="84" y2="58" stroke="currentColor" strokeWidth="1" />
        <ellipse
          cx="84"
          cy="64"
          rx="5.5"
          ry="6.5"
          fill="#1a0b2e"
          stroke="currentColor"
          strokeWidth="1"
        />
        <circle cx="84" cy="57" r="3.4" fill="#1a0b2e" stroke="currentColor" strokeWidth="1" />
        <g stroke="#1a0b2e" strokeWidth="1.3" strokeLinecap="round" fill="none">
          <path d="M79 62 L72 58 L68 64 M79 66 L71 68 L68 74 M89 62 L96 58 L100 64 M89 66 L97 68 L100 74" />
        </g>
        <circle cx="82.4" cy="56.6" r="0.9" fill="#fb923c" />
        <circle cx="85.6" cy="56.6" r="0.9" fill="#fb923c" />
      </g>
    </svg>
  );
}

export function AboboraIcone({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <defs>
        <radialGradient id="aboboraGrad" cx="50%" cy="40%" r="65%">
          <stop offset="0" stopColor="#ffb347" />
          <stop offset="1" stopColor="#e8590c" />
        </radialGradient>
      </defs>
      <path d="M19 9c0-3 1.4-5 4-6 .3 2-.3 4.2-2 6z" fill="#4d7c0f" />
      <ellipse cx="12.5" cy="23" rx="8.5" ry="11.5" fill="#d9480f" />
      <ellipse cx="27.5" cy="23" rx="8.5" ry="11.5" fill="#d9480f" />
      <ellipse cx="20" cy="23" rx="9" ry="12.5" fill="url(#aboboraGrad)" />
      <path d="M12 19l4 3.6-5 .4zM28 19l-4 3.6 5 .4z" fill="#2a0a02" />
      <path
        d="M11.5 28c2.4 3.6 5.4 4.6 8.5 4.6s6.1-1 8.5-4.6c-2.4.8-4.6 1.2-8.5 1.2s-6.1-.4-8.5-1.2z"
        fill="#2a0a02"
      />
      <path
        d="M17 29l1.6-2.6 1.4 2.4 1.5-2.4 1.5 2.4"
        fill="none"
        stroke="#ffd8a8"
        strokeWidth="0.9"
      />
    </svg>
  );
}

export function GorroNatalIcone({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M6 28c2-10 8-19 18-20 3-.2 6 1.2 8 3.8-4-1.4-8-.4-10 3-2 3.4-1 8 1 13z"
        fill="#dc2626"
      />
      <path d="M5 28c4-3 26-3 31 2 0 3-3 5-6 5H11c-4 0-7-3-6-7z" fill="#f8fafc" />
      <circle cx="33" cy="12" r="4.2" fill="#f8fafc" />
    </svg>
  );
}

export function FaiscaIcone({ className = 'h-7 w-7' }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path d="M20 3l3.4 11.6L35 18l-11.6 3.4L20 33l-3.4-11.6L5 18l11.6-3.4z" fill="#fbbf24" />
      <path d="M32 26l1.6 4.4L38 32l-4.4 1.6L32 38l-1.6-4.4L26 32l4.4-1.6z" fill="#fde68a" />
      <path d="M9 27l1.2 3.3L13.5 31.5l-3.3 1.2L9 36l-1.2-3.3L4.5 31.5l3.3-1.2z" fill="#f59e0b" />
    </svg>
  );
}

// Ícone que acompanha a logo "BORA JOGAR!" na barra de navegação.
export function TemaLogoAdorno({ tema }) {
  if (tema === 'halloween') return <AboboraIcone className="mr-1.5 h-7 w-7 shrink-0" />;
  if (tema === 'natal') return <GorroNatalIcone className="mr-1.5 h-7 w-7 shrink-0" />;
  if (tema === 'ano_novo') return <FaiscaIcone className="mr-1.5 h-7 w-7 shrink-0" />;
  return null;
}

// ---------------------------------------------------------------------------
// Camadas da página
// ---------------------------------------------------------------------------

// Atrás do conteúdo: brilho/lua/estrelas. Só aparece onde a página é transparente.
function Fundo({ tema }) {
  const fundos = {
    halloween:
      'radial-gradient(circle at 88% 6%, rgba(255,140,40,0.28), transparent 34%), radial-gradient(circle at 6% 100%, rgba(139,92,246,0.22), transparent 46%), radial-gradient(circle at 50% 0%, rgba(168,85,247,0.12), transparent 50%)',
    natal:
      'radial-gradient(circle at 12% 0%, rgba(220,38,38,0.22), transparent 40%), radial-gradient(circle at 92% 8%, rgba(34,197,94,0.2), transparent 42%), radial-gradient(circle at 50% 100%, rgba(255,255,255,0.07), transparent 45%)',
    ano_novo:
      'radial-gradient(circle at 20% 0%, rgba(251,191,36,0.24), transparent 40%), radial-gradient(circle at 85% 12%, rgba(167,139,250,0.2), transparent 42%), radial-gradient(circle at 50% 100%, rgba(251,191,36,0.1), transparent 45%)',
  };
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10"
      style={{ backgroundImage: fundos[tema] }}
    >
      {tema === 'halloween' && (
        <div className="absolute right-[7%] top-24 h-24 w-24 rounded-full bg-gradient-to-br from-orange-200 to-orange-400 opacity-60 shadow-[0_0_80px_20px_rgba(251,146,60,0.35)] md:h-32 md:w-32" />
      )}
    </div>
  );
}

// Por cima do conteúdo, sem bloquear cliques: morcegos, neve ou confete.
function Particulas({ tema }) {
  if (tema === 'halloween') {
    const morcegos = [
      { top: '10%', dur: 26, delay: -2, size: 38 },
      { top: '24%', dur: 34, delay: -14, size: 28 },
      { top: '6%', dur: 40, delay: -26, size: 32 },
      { top: '38%', dur: 30, delay: -8, size: 24 },
    ];
    return (
      <div className="pointer-events-none fixed inset-0 z-[45] overflow-hidden">
        {morcegos.map((m, i) => (
          <Morcego
            key={i}
            className="tema-anim tema-morcego absolute left-0 text-zinc-950 drop-shadow-[0_0_6px_rgba(251,146,60,0.45)]"
            style={{
              top: m.top,
              width: m.size,
              animationDuration: `${m.dur}s`,
              animationDelay: `${m.delay}s`,
            }}
          />
        ))}
      </div>
    );
  }
  if (tema === 'natal') {
    return (
      <div className="pointer-events-none fixed inset-0 z-[45] overflow-hidden">
        {Array.from({ length: 34 }, (_, i) => (
          <span
            key={i}
            className="tema-anim tema-neve absolute top-0 rounded-full bg-white"
            style={{
              left: `${(i * 37) % 100}%`,
              width: 3 + ((i * 5) % 5),
              height: 3 + ((i * 5) % 5),
              opacity: 0.55 + ((i * 7) % 4) / 10,
              animationDuration: `${9 + ((i * 7) % 9)}s`,
              animationDelay: `-${(i * 3) % 13}s`,
              ['--vento']: `${((i % 5) - 2) * 14}px`,
            }}
          />
        ))}
      </div>
    );
  }
  if (tema === 'ano_novo') {
    const cores = ['#fbbf24', '#f8fafc', '#a78bfa', '#fb7185', '#fde68a'];
    return (
      <div className="pointer-events-none fixed inset-0 z-[45] overflow-hidden">
        {Array.from({ length: 30 }, (_, i) => (
          <span
            key={i}
            className="tema-anim tema-confete absolute top-0"
            style={{
              left: `${(i * 41) % 100}%`,
              width: 5 + ((i * 3) % 4),
              height: 9 + ((i * 5) % 5),
              backgroundColor: cores[i % cores.length],
              animationDuration: `${8 + ((i * 5) % 8)}s`,
              animationDelay: `-${(i * 2) % 11}s`,
              ['--giro']: `${300 + ((i * 53) % 500)}deg`,
              ['--vento']: `${((i % 6) - 3) * 12}px`,
            }}
          />
        ))}
      </div>
    );
  }
  return null;
}

// Preso ao topo da página (rola junto), logo abaixo da barra de navegação.
function Topo({ tema }) {
  if (tema === 'halloween') {
    return (
      <>
        <TeiaCanto className="pointer-events-none absolute left-0 top-16 z-[5] h-24 w-24 text-white/35 md:h-32 md:w-32" />
        <TeiaCanto className="pointer-events-none absolute right-0 top-16 z-[5] h-24 w-24 -scale-x-100 text-white/35 md:h-32 md:w-32" />
      </>
    );
  }
  if (tema === 'natal' || tema === 'ano_novo') {
    const cores =
      tema === 'natal'
        ? ['#ef4444', '#22c55e', '#fbbf24', '#38bdf8', '#f472b6']
        : ['#fbbf24', '#f8fafc', '#a78bfa', '#fb7185', '#fde68a'];
    const luzes = Array.from({ length: 22 }, (_, i) => i);
    return (
      <div className="pointer-events-none absolute left-0 top-16 z-[5] w-full overflow-hidden">
        <svg
          viewBox="0 0 1100 46"
          preserveAspectRatio="none"
          className="h-8 w-full md:h-11"
          aria-hidden="true"
        >
          <path
            d="M0 4 Q 50 40 100 6 T 200 6 T 300 6 T 400 6 T 500 6 T 600 6 T 700 6 T 800 6 T 900 6 T 1000 6 T 1100 6"
            fill="none"
            stroke="#0f172a"
            strokeWidth="2"
            opacity="0.8"
          />
        </svg>
        <div className="absolute inset-x-0 top-0 h-8 md:h-11">
          {luzes.map((i) => (
            <span
              key={i}
              className="tema-anim tema-luz absolute rounded-full"
              style={{
                left: `${(i / luzes.length) * 100 + 1.5}%`,
                top: i % 2 === 0 ? '52%' : '28%',
                width: 9,
                height: 12,
                backgroundColor: cores[i % cores.length],
                boxShadow: `0 0 10px 2px ${cores[i % cores.length]}`,
                animationDelay: `${(i % 4) * 0.45}s`,
              }}
            />
          ))}
        </div>
      </div>
    );
  }
  return null;
}

export function TemaDecor({ tema }) {
  if (!tema || tema === 'normal' || !TEMAS[tema]) return null;
  return (
    <>
      <Fundo tema={tema} />
      <Particulas tema={tema} />
      <Topo tema={tema} />
    </>
  );
}

// ---------------------------------------------------------------------------
// Faixa de boas-vindas do tema (topo da vitrine)
// ---------------------------------------------------------------------------

export function TemaFaixa({ tema }) {
  const t = TEMAS[tema];
  if (!t || !t.faixa) return null;
  return (
    <div className="mb-6 flex items-center justify-center gap-3 rounded-2xl border border-blue-500/30 bg-gradient-to-r from-blue-500/15 via-purple-500/15 to-blue-500/15 px-5 py-3 text-center shadow-lg shadow-blue-500/10">
      <span className="text-xl">{t.emoji}</span>
      <p className="text-xs font-bold leading-snug tracking-wide text-blue-300 md:text-sm">
        {t.faixa}
      </p>
      <span className="hidden text-xl sm:inline">{t.emoji}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cenário no rodapé da página (acima do Footer)
// ---------------------------------------------------------------------------

export function TemaRodape({ tema }) {
  if (tema === 'halloween') {
    return (
      <div className="pointer-events-none relative -mb-1 mt-10 w-full select-none overflow-hidden">
        <svg
          viewBox="0 0 1200 170"
          preserveAspectRatio="xMidYMax slice"
          className="h-28 w-full md:h-40"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="haloCeu" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#f97316" stopOpacity="0" />
              <stop offset="1" stopColor="#f97316" stopOpacity="0.22" />
            </linearGradient>
          </defs>
          <rect width="1200" height="170" fill="url(#haloCeu)" />
          {/* colinas */}
          <path d="M0 170V128Q150 96 320 132T640 124T940 130T1200 120V170Z" fill="#12081f" />
          <path d="M0 170V146Q220 122 430 148T820 146T1200 142V170Z" fill="#0a0412" />
          {/* casa mal-assombrada */}
          <g fill="#07020d">
            <rect x="905" y="84" width="104" height="66" />
            <path d="M896 86L957 44L1018 86Z" />
            <rect x="1008" y="60" width="26" height="70" />
            <path d="M1004 62L1021 36L1038 62Z" />
            <rect x="926" y="46" width="12" height="22" />
          </g>
          <g fill="#f59e0b">
            <rect x="924" y="96" width="14" height="20" rx="2" className="tema-anim tema-janela" />
            <rect x="954" y="96" width="14" height="20" rx="2" />
            <rect x="982" y="96" width="14" height="20" rx="2" className="tema-anim tema-janela" />
            <rect x="1014" y="76" width="10" height="16" rx="2" />
          </g>
          {/* árvores secas */}
          <g stroke="#07020d" strokeWidth="5" strokeLinecap="round" fill="none">
            <path d="M150 156 L150 100 M150 118 L124 94 L112 74 M150 110 L180 90 L192 66 M150 128 L128 120" />
            <path
              d="M640 160 L640 112 M640 128 L614 108 L604 86 M640 122 L668 104 L676 82"
              strokeWidth="4"
            />
          </g>
          {/* lápides */}
          <g fill="#07020d">
            <path d="M300 160V132a14 14 0 0128 0V160z" />
            <path d="M360 160V138a11 11 0 0122 0V160z" />
            <path d="M740 160V134a13 13 0 0126 0V160z" />
            <path d="M800 160V140a10 10 0 0120 0V160z" />
          </g>
          <g stroke="#7c5fa3" strokeWidth="2" strokeLinecap="round" opacity="0.6">
            <path d="M314 138v14M308 143h12" />
            <path d="M753 140v14M747 145h12" />
          </g>
        </svg>
      </div>
    );
  }
  if (tema === 'natal') {
    const pinheiro = (x, h) => (
      <g key={x} transform={`translate(${x} ${170 - h})`}>
        <rect x="-4" y={h - 12} width="8" height="12" fill="#3f2a1a" />
        <path d={`M0 0L${h * 0.3} ${h * 0.45}H${-h * 0.3}Z`} fill="#15803d" />
        <path d={`M0 ${h * 0.22}L${h * 0.36} ${h * 0.7}H${-h * 0.36}Z`} fill="#166534" />
        <path d={`M0 ${h * 0.45}L${h * 0.42} ${h - 12}H${-h * 0.42}Z`} fill="#14532d" />
        <path d={`M0 0L${h * 0.09} ${h * 0.14}H${-h * 0.09}Z`} fill="#f8fafc" />
      </g>
    );
    return (
      <div className="pointer-events-none relative -mb-1 mt-10 w-full select-none overflow-hidden">
        <svg
          viewBox="0 0 1200 170"
          preserveAspectRatio="xMidYMax slice"
          className="h-28 w-full md:h-40"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="natalCeu" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ef4444" stopOpacity="0" />
              <stop offset="1" stopColor="#ef4444" stopOpacity="0.16" />
            </linearGradient>
          </defs>
          <rect width="1200" height="170" fill="url(#natalCeu)" />
          {[90, 250, 520, 700, 980, 1130].map((x, i) => pinheiro(x, 70 + (i % 3) * 22))}
          <path d="M0 170V138Q200 118 420 140T820 138T1200 132V170Z" fill="#e2edf2" />
          <path d="M0 170V152Q260 138 560 154T1200 150V170Z" fill="#f8fafc" />
          {/* boneco de neve */}
          <g>
            <circle cx="830" cy="146" r="17" fill="#f8fafc" />
            <circle cx="830" cy="122" r="12" fill="#f8fafc" />
            <circle cx="826" cy="120" r="1.6" fill="#0f172a" />
            <circle cx="834" cy="120" r="1.6" fill="#0f172a" />
            <path d="M830 123l10 2-10 2z" fill="#f97316" />
            <rect x="820" y="106" width="20" height="4" fill="#0f172a" />
            <rect x="824" y="94" width="12" height="13" fill="#0f172a" />
            <path d="M818 130q12 6 24 0" stroke="#dc2626" strokeWidth="3" fill="none" />
          </g>
        </svg>
      </div>
    );
  }
  if (tema === 'ano_novo') {
    const predios = [
      [40, 70, 48],
      [92, 100, 38],
      [134, 58, 54],
      [192, 88, 42],
      [238, 112, 36],
      [900, 92, 44],
      [948, 64, 50],
      [1002, 106, 40],
      [1046, 78, 46],
      [1096, 98, 42],
      [1144, 60, 52],
    ];
    const estouro = (cx, cy, r, cor, atraso) => (
      <g
        key={`${cx}-${cy}`}
        className="tema-anim tema-fogos"
        style={{ transformOrigin: `${cx}px ${cy}px`, animationDelay: `${atraso}s` }}
      >
        {Array.from({ length: 12 }, (_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={cx + Math.cos(a) * r * 0.35}
              y1={cy + Math.sin(a) * r * 0.35}
              x2={cx + Math.cos(a) * r}
              y2={cy + Math.sin(a) * r}
              stroke={cor}
              strokeWidth="2.4"
              strokeLinecap="round"
            />
          );
        })}
      </g>
    );
    return (
      <div className="pointer-events-none relative -mb-1 mt-10 w-full select-none overflow-hidden">
        <svg
          viewBox="0 0 1200 190"
          preserveAspectRatio="xMidYMax slice"
          className="h-32 w-full md:h-44"
          aria-hidden="true"
        >
          {estouro(330, 70, 34, '#fbbf24', 0)}
          {estouro(600, 44, 28, '#a78bfa', 0.9)}
          {estouro(820, 76, 38, '#fb7185', 1.7)}
          <rect y="124" width="1200" height="66" fill="#0a0703" />
          {predios.map(([x, h, w]) => (
            <g key={x}>
              <rect x={x} y={190 - h} width={w} height={h} fill="#0a0703" />
              {Array.from({ length: Math.floor(h / 22) }, (_, r) => (
                <rect
                  key={r}
                  x={x + 8}
                  y={190 - h + 8 + r * 20}
                  width="6"
                  height="8"
                  fill="#fbbf24"
                  opacity={r % 3 === 0 ? 0.25 : 0.85}
                />
              ))}
            </g>
          ))}
          <rect
            x="560"
            y="106"
            width="80"
            height="84"
            rx="40"
            fill="#0a0703"
            stroke="#fbbf24"
            strokeWidth="3"
          />
          <circle cx="600" cy="146" r="30" fill="#17110a" />
          <path
            d="M600 146V126M600 146l14 8"
            stroke="#fbbf24"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    );
  }
  return null;
}
