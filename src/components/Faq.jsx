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
              🎮 Como alugo um jogo no BORA JOGAR!?
            </span>
            <span className="text-lg text-purple-500 transition duration-300 group-open:-rotate-180">
              ▼
            </span>
          </summary>
          <div className="font-xs border-t border-zinc-800/50 px-6 pb-6 pt-6 leading-relaxed text-zinc-400 md:px-8 md:pb-8 md:text-sm">
            É muito simples! Veja o passo a passo:
            <br />
            <br />
            <ol className="list-decimal space-y-3 pl-5 font-medium text-zinc-400">
              <li>
                Entre na página <strong className="text-emerald-400">🔑 MEUS ACESSOS</strong>{' '}
                (Precisa ter feito o cadastro no site).
              </li>
              <li>Adicione saldo à sua carteira digital via PIX ou cartão de crédito.</li>
              <li>
                Agora que você tem saldo na sua carteira, escolha um jogo disponível na página
                principal e clique em <strong className="text-white">"ALUGAR"</strong> (7 ou 14
                dias).
              </li>
              <li>
                O valor do aluguel será descontado do seu saldo. Acesse novamente a página{' '}
                <strong className="text-emerald-400">🔑 MEUS ACESSOS</strong> para ver as
                informações da conta (Login, Senha e Código de Acesso 2FA).
              </li>
              <li>
                Entre no seu PS4 ou PS5 com a conta da locadora. Se tiver alguma dúvida sobre como
                entrar com a conta, veja o <strong className="text-white">📖 TUTORIAL</strong> que
                está disponível logo abaixo das informações da conta na página Meus Acessos.
              </li>
              <li>
                Pronto! Agora que você entrou na conta, é só ir na biblioteca e baixar o jogo.
                Depois que baixou o jogo, você pode trocar para a sua conta e jogar na sua conta
                para ganhar troféus!
              </li>
              <li>
                <strong className="text-rose-400">ATENÇÃO!</strong> Lembre-se de sempre desativar a
                conta antes de terminar o prazo da sua locação. Você ganha dinheiro de volta! Na
                página <strong className="text-emerald-400">🔑 MEUS ACESSOS</strong>, logo abaixo
                das informações da conta, você encontra o botão{' '}
                <strong className="text-purple-400">DEVOLVER E GANHAR SALDO</strong>. Clique nesse
                botão para devolver o jogo e ganhar crédito que você pode usar para alugar novos
                jogos!
              </li>
            </ol>
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
            Não se preocupe, você pode entrar na fila de espera! Na página principal, você consegue
            ver quais jogos estão alugados ou não. Se os botões estiverem{' '}
            <strong className="text-amber-400">DOURADO/LARANJA</strong>, signfica que o jogo está
            alugado. Você consegue ver quantas pessoas estão na fila de espera, e a data que o jogo
            estará disponível <strong className="text-white">(⏳ Próxima Vaga em)</strong>.
            <br />
            <br />
            Clique no botão <strong className="text-amber-400">"RESERVAR"</strong> (7 ou 14 dias). O
            valor do jogo será descontado do seu saldo e você entrará na fila de reserva.
            <br />
            <br />
            Você verá uma área verde te informando que o jogo foi reservado, e também uma mensagem
            informando quando o jogo estará diponível (
            <strong className="text-white">SUA VEZ EM: ...</strong>). Lembre-se que nós temos um
            sistema de devolução de jogo, então pode ser que o jogo seja devolvido antes do prazo,
            assim o jogo é liberado pra você mais cedo do que o previsto! (SEMPRE mais cedo, NUNCA
            mais tarde).
            <br />
            <br />
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
            <ul className="list-disc space-y-4 pl-5 font-medium text-zinc-400">
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
          <summary className="flex cursor-pointer items-center justify-between p-6 text-emerald-400 transition-colors hover:text-emerald-300 md:p-8">
            <span className="text-base font-bold tracking-tight md:text-lg">
              ♻️ Posso devolver um jogo antes do prazo e receber cashback?
            </span>
            <span className="text-lg text-emerald-500 transition duration-300 group-open:-rotate-180">
              ▼
            </span>
          </summary>
          <div className="border-t border-emerald-800/50 px-6 pb-6 pt-6 text-xs leading-relaxed text-zinc-400 md:px-8 md:pb-8 md:text-sm">
            Com certeza! Nós possuímos um sistema de{' '}
            <strong className="text-white">DEVOLUÇÃO ANTECIPADA</strong>! Você pode devolver o jogo
            antes de terminar o seu prazo, e você GANHA DINHEIRO DE VOLTA!
            <br />
            <br />
            Na página <strong className="text-emerald-400">🔑 MEUS ACESSOS</strong>, logo abaixo das
            informações da conta, você encontra o botão{' '}
            <strong className="text-purple-400">DEVOLVER E GANHAR SALDO</strong>.
            <br />
            <br />
            Clique nesse botão para devolver o jogo (siga o tutorial que aparece quando você clica
            no botão). Ao fazer a devolução antecipada, você recebe as seguintes recompensas:{' '}
            <strong className="text-emerald-400">R$ 2.00</strong> fixos por devolver antes MAIS{' '}
            <strong className="text-emerald-400">
              R$ {configSistema?.valor_por_dia?.toFixed(2)} de cashback por cada 24 horas
            </strong>{' '}
            que ainda restavam no seu prazo!
            <br />
            <br />
            EXEMPLO: Você alugou por 7 dias. Jogou 4 dias e decidiu devolver. Você recebe R$ 2.00
            fixos + R$ 6.00 (3 x R$ 2.00). TOTAL = R$ 8.00!
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
            <br />
            <br />
            Nós vamos entrar em contato com você por Whatsapp (por isso é importante fazer o seu
            cadastro com um número de Whatsapp real) e vamos te dar um prazo para você fazer a
            desativação. Caso não seja feita a desativação, nós iremos solicitar a Sony para fazer a
            desativação e você será <strong className="text-white">BANIDO</strong> da locadora (Ban
            de IP).
          </div>
        </details>
      </div>
    </div>
  );
}
