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
              🤔 Qual a diferença entre Vaga Primária e Vaga Secundária?
            </span>
            <span className="text-lg text-purple-500 transition duration-300 group-open:-rotate-180">
              ▼
            </span>
          </summary>
          <div className="font-xs border-t border-zinc-800/50 px-6 pb-6 pt-6 leading-relaxed text-zinc-400 md:px-8 md:pb-8 md:text-sm">
            Para garantir que você consiga jogar seus lançamentos favoritos mais rápido, nós
            oferecemos dois tipos de acesso:
            <br />
            <br />
            <ul className="space-y-4">
              <li className="rounded-xl border border-blue-500/20 bg-blue-950/10 p-4">
                <strong className="mb-1 block text-blue-400">
                  🎮 VAGA PRIMÁRIA (Recomendada):
                </strong>
                Você instala a conta no seu console, baixa o jogo e volta para o seu próprio perfil
                pessoal (a sua conta de sempre). Isso permite que você jogue offline, guarde seus
                *saves* e ganhe todos os troféus no seu próprio nome.
              </li>
              <li className="rounded-xl border border-fuchsia-500/20 bg-fuchsia-950/10 p-4">
                <strong className="mb-1 block text-fuchsia-400">
                  🕹️ VAGA SECUNDÁRIA (Econômica):
                </strong>
                É a opção mais barata, mas possui regras: você é <strong>obrigado</strong> a jogar
                dentro do perfil da locadora (os troféus ficam lá) e você precisará estar conectado
                à internet 100% do tempo. Caso sua internet caia, o jogo é pausado até a conexão
                voltar.
              </li>
            </ul>
          </div>
        </details>

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
                principal e clique em <strong className="text-white">"ALUGAR"</strong>. Você poderá
                escolher o tempo (7 ou 14 dias) e se prefere a Vaga Primária ou Secundária.
              </li>
              <li>
                O valor do aluguel será descontado do seu saldo. Acesse novamente a página{' '}
                <strong className="text-emerald-400">🔑 MEUS ACESSOS</strong> para ver as
                informações da conta (Login, Senha e Código de Acesso 2FA).
              </li>
              <li>
                Entre no seu PS4 ou PS5 com a conta da locadora. Se tiver alguma dúvida sobre como
                entrar, veja o <strong className="text-white">📖 TUTORIAL</strong> que está
                disponível logo abaixo das informações da conta na página Meus Acessos.
              </li>
              <li>
                <strong className="text-rose-400">ATENÇÃO!</strong> Lembre-se de sempre devolver a
                conta antes de terminar o prazo da sua locação. Você pode ganhar dinheiro de volta!
                Na página <strong className="text-emerald-400">🔑 MEUS ACESSOS</strong>, você
                encontra o botão{' '}
                <strong className="text-purple-400">DEVOLVER E GANHAR SALDO</strong>.
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
            Não se preocupe, você pode entrar na fila de espera! Na página principal, se os botões
            estiverem <strong className="text-amber-400">DOURADO/LARANJA</strong>, significa que o
            jogo está alugado. Você consegue ver a data exata que o jogo estará disponível para
            você.
            <br />
            <br />
            Ao clicar, selecione <strong className="text-amber-400">"ENTRAR NA FILA"</strong>. O
            valor do jogo será descontado do seu saldo como uma reserva para garantir o seu lugar.
            <br />
            <br />
            Lembre-se que nós temos o sistema de "Devolução Antecipada", então as pessoas costumam
            devolver o jogo antes da data limite para ganharem Cashback. Se isso acontecer, você é
            avisado e{' '}
            <strong className="text-emerald-400">
              fura a fila, pegando o jogo antes do previsto!
            </strong>{' '}
            (Sempre mais cedo, nunca mais tarde).
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
                <strong>MEMBRO</strong> (Basta ter concluído 1 aluguel com sucesso).
              </li>
              <li>
                <strong className="text-amber-400">PRIORIDADE NA FILA (FURA-FILA):</strong> Se você
                tiver um Rank maior que outro cliente que já estava na fila de um lançamento, o
                sistema automaticamente te coloca <strong>na frente dele</strong> na entrega da
                conta.
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
            <strong className="text-white">DEVOLUÇÃO PREMIUM</strong> para premiar os jogadores
            velozes. Ao terminar o jogo mais cedo, você ganha dinheiro de volta direto na carteira
            para usar na próxima locação!
            <br />
            <br />
            {(() => {
              // Puxa o valor do banco de dados (ou usa 2.00 como fallback)
              const valorBase = configSistema?.valor_por_dia || 2.0;
              const valorVezesTres = 3 * valorBase;
              const totalExemplo = valorBase + valorVezesTres;

              return (
                <>
                  <strong className="text-blue-400">Se você alugou a VAGA PRIMÁRIA:</strong>
                  <br />
                  Você ganha{' '}
                  <strong className="text-emerald-400">R$ {valorBase.toFixed(2)} fixos</strong> por
                  apertar o botão de devolução + (Mais){' '}
                  <strong className="text-emerald-400">
                    R$ {valorBase.toFixed(2)} de Cashback Diário
                  </strong>{' '}
                  por cada 24 horas que ainda restavam no seu prazo original.
                  <br />
                  <br />
                  <em className="block rounded-xl border border-zinc-800 bg-zinc-950 p-4">
                    EXEMPLO PRIMÁRIA: Você alugou por 7 dias. Jogou 4 dias e decidiu devolver
                    (sobraram 3 dias). Você recebe R$ {valorBase.toFixed(2)} fixos + R${' '}
                    {valorVezesTres.toFixed(2)} (que é 3 x R$ {valorBase.toFixed(2)}).{' '}
                    <strong className="text-white">TOTAL = R$ {totalExemplo.toFixed(2)}!</strong>
                  </em>
                  <br />
                  <br />
                  <strong className="text-fuchsia-400">Se você alugou a VAGA SECUNDÁRIA:</strong>
                  <br />
                  Como o valor do aluguel já é bastante reduzido, a Vaga Secundária não acumula
                  Cashback Diário. No entanto, se você devolver o jogo antes do tempo acabar, você
                  ainda é recompensado com a taxa fixa de{' '}
                  <strong className="text-emerald-400">R$ {valorBase.toFixed(2)}</strong>.
                </>
              );
            })()}
          </div>
        </details>

        <details className="group rounded-3xl border border-zinc-800 bg-zinc-900 shadow-xl transition-transform duration-300 hover:-translate-y-1 [&_summary::-webkit-details-marker]:hidden">
          <summary className="flex cursor-pointer items-center justify-between p-6 text-rose-400 transition-colors hover:text-rose-300 md:p-8">
            <span className="text-base font-bold tracking-tight md:text-lg">
              🚨 O que acontece se eu esquecer de desativar a conta do console?
            </span>
            <span className="text-lg text-rose-500 transition duration-300 group-open:-rotate-180">
              ▼
            </span>
          </summary>
          <div className="border-t border-rose-800/50 px-6 pb-6 pt-6 text-xs leading-relaxed text-zinc-400 md:px-8 md:pb-8 md:text-sm">
            Essa é a nossa regra mais rigorosa! Se você alugou uma Vaga Primária e o seu tempo
            acabar, e você deixar a conta ativada como "Principal" no seu console, isso bloqueia o
            jogo e impede que o próximo cliente da fila consiga jogar. O mesmo vale para a Vaga
            Secundária, caso você tente ativá-la proibitivamente.
            <br />
            <br />
            Neste caso, nosso sistema aplica automaticamente uma{' '}
            <strong className="text-rose-400">MULTA ADMINISTRATIVA DE R$ 50,00</strong> direto na
            sua carteira digital, além de cancelar qualquer Cashback Premium que você pudesse ter
            ganho.
            <br />
            <br />
            Nós vamos entrar em contato com você por WhatsApp para exigir a remoção. Caso não seja
            feita a desativação, nós acionaremos a Sony para forçar a queda e o seu IP será{' '}
            <strong className="text-white">BANIDO PERMANENTEMENTE</strong> da locadora, impedindo
            novos aluguéis.
          </div>
        </details>
      </div>
    </div>
  );
}
