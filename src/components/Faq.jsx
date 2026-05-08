export default function Faq({ configSistema }) {
  return (
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
            É super simples! Você adiciona saldo à sua carteira digital, escolhe o jogo na vitrine,
            escolhe o número de dias que quer ficar com o jogo (7 ou 14 dias) e clica em{' '}
            <strong className="text-white">"ALUGAR"</strong>. O valor é descontado e os dados da
            conta (E-mail e Senha) aparecem imediatamente na sua aba{' '}
            <strong className="text-emerald-400">🔑 MEUS ACESSOS</strong>. O aluguel dura 7 ou 14
            dias corridos a partir do momento da compra.
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
            Aqui no <strong>BORA JOGAR!</strong>, a sua fidelidade se transforma em vantagens reais.
            Toda vez que você conclui um aluguel com sucesso, o seu nível sobe. Quanto maior o seu
            Rank, mais benefícios você tem.
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
                <span className="text-[10px] font-medium text-zinc-300">10+ Locações</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-amber-900/50 bg-amber-950/20 p-3 shadow-[0_0_10px_rgba(245,158,11,0.05)]">
                <span className="text-xl">⭐</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400">
                  Especial
                </span>
                <span className="text-[10px] font-medium text-zinc-300">20+ Locações</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-rose-900/50 bg-rose-950/20 p-3 shadow-[0_0_10px_rgba(225,29,72,0.05)]">
                <span className="text-xl">💎</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400">
                  VIP
                </span>
                <span className="text-[10px] font-medium text-zinc-300">30+ Locações</span>
              </div>
              <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-fuchsia-900/50 bg-fuchsia-950/20 p-3 shadow-[0_0_10px_rgba(217,70,239,0.05)]">
                <span className="text-xl">👑</span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-fuchsia-400">
                  Super VIP
                </span>
                <span className="text-[10px] font-medium text-zinc-300">50+ Locações</span>
              </div>
            </div>
            <strong className="mb-2 block text-sm text-white">Quais são os benefícios?</strong>
            <ul className="list-disc space-y-4 pl-5 font-medium text-zinc-300">
              <li>
                <strong className="text-blue-400">ACESSO ANTECIPADO:</strong> As reservas de jogos
                em <strong>PRÉ-VENDA</strong> são exclusivas para clientes a partir do Rank{' '}
                <strong>MEMBRO</strong>.
              </li>
              <li>
                <strong className="text-amber-400">PRIORIDADE NA FILA (FURA-FILA):</strong> Se você
                tiver um Rank maior que outro cliente que já estava na fila, o sistema
                automaticamente te coloca <strong>na frente dele</strong>.
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
                Ligue o console. Selecione <strong className="text-white">ADICIONAR USUÁRIO</strong>
                .
              </li>
              <li>
                Selecione <strong className="text-white">VAMOS COMEÇAR</strong>.
              </li>
              <li>
                Aceite os termos e selecione <strong className="text-white">CONFIRMAR</strong>.
              </li>
              <li>
                Na tela com o QR Code, selecione{' '}
                <strong className="text-white">INICIAR SESSÃO MANUALMENTE</strong>.
              </li>
              <li>Insira o E-mail e Senha da conta que estão disponíveis acima.</li>
              <li>
                Quando o console pedir o código (2FA), clique no botão verde{' '}
                <strong className="text-emerald-400">"GERAR CÓDIGO DE ACESSO (2FA)"</strong> aqui no
                site.
              </li>
              <li>Digite o código 2FA (6 dígitos) rapidamente.</li>
              <li>
                <strong className="text-rose-400">NÃO ATIVE MAIS NADA</strong>. Somente selecione
                OK.
              </li>
              <li>
                Para jogar na sua conta pessoal e ganhar os troféus, é OBRIGATÓRIO habilitar o
                compartilhamento:
                <ul className="ml-1 mt-3 list-disc space-y-3 border-l-2 border-zinc-700 pl-5 text-zinc-400">
                  <li>
                    <strong>No PS5:</strong> Configurações &gt; Usuários e contas &gt; Outros &gt;
                    Compartilhamento do console... &gt;{' '}
                    <strong className="text-white">HABILITAR</strong>.
                  </li>
                  <li>
                    <strong>No PS4:</strong> Configurações &gt; Gerenciamento da conta &gt;{' '}
                    <strong className="text-white">ATIVAR COMO SEU PS4 PRINCIPAL</strong>.
                  </li>
                  <li className="mt-3 flex items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-950/30 p-3.5 font-bold text-rose-400">
                    <span className="text-lg">⚠️</span> É aqui também, que no final do seu aluguel,
                    você vai DESATIVAR o compartilhamento.
                  </li>
                </ul>
              </li>
              <li className="mt-6 rounded-xl border border-emerald-500/40 bg-emerald-950/40 p-5 text-sm font-black text-emerald-400 shadow-inner">
                Vá na Biblioteca da conta, coloque o jogo para baixar, volte para o seu perfil
                pessoal (a sua conta oficial) e divirta-se!
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
            <strong className="text-emerald-400">🔑 MEUS ACESSOS</strong>, embaixo das informações
            da conta (Login e Senha), existe um botão verde chamado
            <strong className="text-emerald-400"> "GERAR CÓDIGO DE ACESSO (2FA)"</strong>.
            <br />
            <br />
            Basta clicar nele que um código de 6 dígitos vai aparecer na sua tela.
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
            <strong className="text-white">Sim, com certeza!</strong> Para isso, logo após fazer o
            login com a conta alugada no console:
            <ul className="mt-4 list-disc space-y-3 pl-5 font-medium text-zinc-300">
              <li>
                <strong>No PS5:</strong> Vá em Configurações &gt; Usuários e Contas &gt; Outros &gt;{' '}
                <em>Compartilhamento do console e jogo offline</em> &gt;{' '}
                <strong className="text-emerald-400">HABILITAR</strong>.
              </li>
              <li>
                <strong>No PS4:</strong> Vá em Configurações &gt; Gerenciamento da conta &gt;{' '}
                <em>Ativar como seu PS4 principal</em> &gt;{' '}
                <strong className="text-emerald-400">HABILITAR</strong>.
              </li>
            </ul>
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
            <strong className="text-amber-400">"RESERVAR"</strong> (7 ou 14 dias). O valor do jogo
            será investido e você verá uma data de <em>Previsão de Liberação</em>.
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
            Nós possuímos um sistema de <strong className="text-white">DEVOLUÇÃO DINÂMICA</strong>!
            Essa opção fica ativa automaticamente apenas quando o jogo que você alugou está com{' '}
            <strong className="text-rose-400">ALTA DEMANDA</strong>.
            <br />
            <br />
            Se este for o caso, um botão verde{' '}
            <strong className="text-emerald-400">"♻️ DEVOLVER"</strong> aparecerá. Ao fazer a
            devolução antecipada para agilizar a fila, você ganha uma recompensa:{' '}
            <strong className="text-emerald-400">
              R$ {configSistema?.valor_por_dia?.toFixed(2)} de cashback por cada 24 horas
            </strong>{' '}
            que ainda restavam no seu prazo!
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
            Essa é a nossa regra mais rigorosa! Se o seu tempo acabar e você deixar a conta ativada
            como "Principal" no seu console, isso bloqueia a conta e impede que o próximo cliente da
            fila jogue.
            <br />
            <br />
            Neste caso, nosso sistema aplica uma{' '}
            <strong className="text-rose-400">
              MULTA ADMINISTRATIVA AUTOMÁTICA DE R$ 50,00
            </strong>{' '}
            direto na sua carteira digital.
          </div>
        </details>
      </div>
    </div>
  );
}
