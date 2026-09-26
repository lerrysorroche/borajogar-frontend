// Lista padrão do Painel Admin: uma linha enxuta por item, que abre em sanfona
// para mostrar os detalhes e as ações. Não tem altura fixa (a rolagem é sempre a
// da própria página) e, quando as colunas não cabem na tela, rola só na horizontal.
//
// As classes de grid/largura vêm de quem chama, escritas por extenso: o Tailwind
// só enxerga classes que aparecem literalmente no código-fonte.

export function ListaAdmin({ cabecalhos, colunas, larguraMin, children }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-zinc-800/80 bg-zinc-950/50 [container-type:inline-size]">
      <div className={larguraMin}>
        <div
          className={`grid items-center gap-4 border-b border-l-4 border-zinc-800 border-l-transparent px-4 py-2.5 ${colunas}`}
        >
          {cabecalhos.map((h) => (
            <span
              key={h}
              className="truncate text-[10px] font-bold uppercase tracking-wider text-zinc-500"
            >
              {h}
            </span>
          ))}
          <span />
        </div>
        {children}
      </div>
    </div>
  );
}

export function ItemListaAdmin({ colunas, celulas, borda, children }) {
  return (
    <details
      className={`group border-b border-l-4 border-b-zinc-800/60 last:border-b-0 [&_summary::-webkit-details-marker]:hidden ${borda || 'border-l-transparent'}`}
    >
      <summary
        className={`grid cursor-pointer select-none list-none items-center gap-4 px-4 py-3 text-xs transition-colors hover:bg-zinc-800/40 group-open:bg-zinc-800/30 ${colunas}`}
      >
        {celulas.map((c, i) => (
          <div key={i} className="min-w-0 truncate">
            {c}
          </div>
        ))}
        <span className="text-right text-[10px] text-zinc-500 transition duration-300 group-open:-rotate-180">
          ▼
        </span>
      </summary>
      {/* Fica colado à esquerda e com a largura da tela, para o conteúdo aberto
          não sumir quando a linha de cima está rolada para o lado. */}
      <div className="sticky left-0 box-border w-[100cqw] border-t border-zinc-800/60 bg-zinc-950/70 p-4">
        {children}
      </div>
    </details>
  );
}

// Par "rótulo: valor" usado dentro da área aberta de cada item.
export function CampoAdmin({ rotulo, children }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-500">{rotulo}</span>
      <span className="break-words text-xs font-medium text-zinc-200">{children}</span>
    </div>
  );
}
