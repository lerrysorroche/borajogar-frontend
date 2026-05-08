export default function Footer({ setAbaAtual }) {
  const NUMERO_WHATSAPP_SUPORTE = '5541995948532';

  return (
    <footer className="relative z-10 mt-12 border-t border-zinc-800 bg-zinc-900 pb-8 pt-16">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="mb-12 grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <span className="mb-4 block bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-2xl font-black tracking-tighter text-transparent">
              BORA JOGAR!
            </span>
            <p className="mb-8 max-w-sm text-sm font-medium leading-relaxed text-zinc-400">
              Sua locadora de jogos digitais next-gen. Alugue os maiores lançamentos de PlayStation
              de forma automática, rápida e sem sair de casa.
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
                <span className="text-2xl drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]">🔒</span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Certificado SSL
                  </span>
                  <span className="text-xs font-bold text-zinc-300">Site Seguro 256-bits</span>
                </div>
              </div>
              <div className="flex items-center gap-4 rounded-2xl border border-zinc-800/80 bg-zinc-950 p-4 shadow-inner">
                <span className="text-2xl drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]">⚡</span>
                <div className="flex flex-col gap-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                    Gateway Oficial
                  </span>
                  <span className="text-xs font-bold text-zinc-300">Powered by Stripe/Efí</span>
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
  );
}
