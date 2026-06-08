export default function Termos() {
  return (
    <div className="animate-fade-in mx-auto max-w-4xl py-8">
      <div className="mb-10 border-b border-zinc-800 pb-8">
        <h2 className="mb-4 text-3xl font-black tracking-tight text-white md:text-4xl">
          Termos de Uso
        </h2>
        <p className="text-sm font-medium text-zinc-400">Última atualização: Junho de 2026</p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-zinc-300 md:text-base">
        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-blue-400">
            1. Objeto e Natureza do Serviço
          </h3>
          <p>
            A BORA JOGAR! oferece o serviço de locação de licenças de jogos digitais em contas
            secundárias para os consoles PlayStation 4 e PlayStation 5. O usuário adquire o direito
            de acessar a conta fornecida, baixar o jogo e jogá-lo em seu perfil pessoal durante o
            período contratado (7 ou 14 dias).
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-blue-400">
            2. Regras de Instalação e Uso
          </h3>
          <ul className="list-disc space-y-2 pl-5 text-zinc-300">
            <li>
              É expressamente <strong className="text-rose-400">PROIBIDO</strong> entrar na conta
              fornecida utilizando a opção "Jogar como Convidado".
            </li>
            <li>
              O usuário compromete-se a <strong className="text-white">NÃO ALTERAR</strong> nenhum
              dado da conta fornecida, incluindo (mas não se limitando a): E-mail, Senha, ID Online,
              Avatar ou configurações de segurança (2FA). Qualquer tentativa de alteração será
              registrada pelo sistema da Sony e resultará no banimento permanente do usuário em
              nossa plataforma e acionamento das medidas legais cabíveis.
            </li>
            <li>
              O usuário está autorizado a ativar o "Compartilhamento do Console e Jogo Offline"
              (PS5) ou "Ativar como PS4 Principal" (PS4) para jogar em sua conta pessoal e
              conquistar seus próprios troféus.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-rose-400">
            3. Devolução Obrigatória e Multa por Atraso
          </h3>
          <p>
            Ao término do período de locação, o usuário perde o direito de acesso ao jogo. É{' '}
            <strong>obrigação exclusiva do usuário</strong> acessar as configurações do seu console
            e <strong className="text-rose-400">DESATIVAR</strong> o Compartilhamento de Console
            (PS5) ou a conta como Principal (PS4) antes de excluir o usuário do videogame.
          </p>
          <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
            <strong className="mb-1 block text-rose-400">Cláusula de Multa Administrativa:</strong>
            <p className="text-sm text-zinc-300">
              A não desativação da conta prende a licença no console do usuário, impedindo que o
              próximo cliente da fila jogue. Caso isso ocorra, o sistema aplicará uma{' '}
              <strong className="text-white">Multa Administrativa Automática de R$ 50,00</strong>. O
              saldo do usuário ficará negativo e a conta suspensa até a regularização do débito e
              liberação da licença.
            </p>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-emerald-400">
            4. Sistema de Devolução Antecipada (Cashback)
          </h3>
          <p>
            O botão "Devolver e Ganhar Saldo" está presente no painel do usuário. Ao optar pela
            devolução antecipada para agilizar a fila, o usuário receberá um reembolso em créditos
            na carteira digital (Cashback) de acordo com os dias inteiros não utilizados, conforme
            tabela vigente no site no momento da devolução.
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-blue-400">
            5. Fila de Espera (Reservas)
          </h3>
          <p>
            Ao reservar um jogo indisponível, o valor integral é retido da carteira do usuário. O
            sistema transferirá as credenciais de acesso automaticamente no exato momento em que a
            locação do usuário anterior for encerrada. O prazo de 7 ou 14 dias só começa a contar a
            partir do momento em que a conta é liberada no painel.
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-blue-400">
            6. Infrações e Banimentos da Sony
          </h3>
          <p>
            A BORA JOGAR! não se responsabiliza por banimentos sofridos no console do usuário devido
            à quebra dos Termos de Serviço da PlayStation Network. Caso o usuário utilize softwares
            de trapaça (hacks/exploits) ou conduta tóxica que resulte no banimento da nossa conta
            fornecida, o usuário será cobrado judicialmente pelo valor integral de compra do jogo
            perdido.
          </p>
        </section>
      </div>
    </div>
  );
}
