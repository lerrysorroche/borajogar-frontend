// Ícones da faixa técnica dos cards de jogo (plataforma, nota, tempo, platina).
// SVG próprio, em vez de emoji, para ficarem iguais em qualquer aparelho.

export function IconeControle({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M7.5 6h9a5.5 5.5 0 0 1 5.4 4.6l.9 5.4a3 3 0 0 1-5.2 2.4L15.3 16H8.7l-2.3 2.4A3 3 0 0 1 1.2 16l.9-5.4A5.5 5.5 0 0 1 7.5 6Zm-.25 3.25v1.5h-1.5v1.5h1.5v1.5h1.5v-1.5h1.5v-1.5h-1.5v-1.5h-1.5Zm9.5.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm2.5 2a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
    </svg>
  );
}

export function IconeEstrela({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="m12 2.5 2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4 6.1 20.5l1.2-6.5L2.5 9.4l6.6-.9L12 2.5Z" />
    </svg>
  );
}

export function IconeRelogio({ className = 'h-3.5 w-3.5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

// Troféu de platina no estilo do PlayStation: taça prateada com reflexo azulado.
export function IconeTrofeuPlatina({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="platinaGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f1f5f9" />
          <stop offset="0.5" stopColor="#a5c8f0" />
          <stop offset="1" stopColor="#6b8cb8" />
        </linearGradient>
      </defs>
      <path
        d="M7 3h10v6a5 5 0 0 1-10 0V3Z"
        fill="url(#platinaGrad)"
        stroke="#e2e8f0"
        strokeWidth="0.8"
      />
      <path
        d="M7 4.5H4v2a3.5 3.5 0 0 0 3.2 3.5M17 4.5h3v2a3.5 3.5 0 0 1-3.2 3.5"
        fill="none"
        stroke="#cbd5e1"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path d="M10.8 13.8h2.4v3h-2.4z" fill="url(#platinaGrad)" />
      <path
        d="M8 18.2h8l.8 2.8H7.2L8 18.2Z"
        fill="url(#platinaGrad)"
        stroke="#e2e8f0"
        strokeWidth="0.8"
      />
      <path
        d="M9.2 4.5v4.2a2.8 2.8 0 0 0 1 2.1"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.7"
        strokeWidth="1"
        strokeLinecap="round"
      />
    </svg>
  );
}
