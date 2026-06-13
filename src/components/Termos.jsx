// ==============================================================================
// COMPONENTE DE TERMOS DE USO
// ==============================================================================
// Documento legal que protege a operação da locadora contra mau uso de licenças,
// compartilhamento indevido e quebra da arquitetura de segurança (2FA).

export default function Termos() {
  return (
    <div className="animate-fade-in mx-auto max-w-4xl py-8">
      {/* CABEÇALHO */}
      <div className="mb-10 border-b border-zinc-800 pb-8">
        <h2 className="mb-4 text-3xl font-black tracking-tight text-white md:text-4xl">
          Termos de Uso
        </h2>
        <p className="text-sm font-medium text-zinc-400">Última atualização: Junho de 2026</p>
      </div>

      {/* CONTEÚDO LEGAL */}
      <div className="space-y-8 text-sm leading-relaxed text-zinc-300 md:text-base">
        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-blue-400">
            1. Objeto e Natureza do Serviço
          </h3>
          <p>
            A BORA JOGAR! oferece o serviço de locação de licenças de jogos digitais para os
            consoles PlayStation 4 e PlayStation 5. O usuário adquire o direito de acessar a conta
            fornecida, baixar o jogo e jogá-lo durante o período contratado (7 ou 14 dias),
            respeitando rigorosamente a modalidade de vaga escolhida no ato da locação.
          </p>
        </section>

        {/* [INFO] Seção nova para detalhar juridicamente a diferença dos slots */}
        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-purple-400">
            2. Modalidades de Locação (Vaga Primária vs. Secundária)
          </h3>
          <ul className="list-disc space-y-3 pl-5 text-zinc-300">
            <li>
              <strong className="text-white">VAGA PRIMÁRIA:</strong> O usuário está autorizado a
              ativar a função "Compartilhamento do Console e Jogo Offline" (PS5) ou "Ativar como PS4
              Principal" (PS4) para jogar o título em seu perfil pessoal e conquistar seus próprios
              troféus.
            </li>
            <li>
              <strong className="text-fuchsia-400">VAGA SECUNDÁRIA:</strong> É{' '}
              <strong className="border-b border-rose-400/50 text-rose-400">
                expressamente PROIBIDO
              </strong>{' '}
              ativar o compartilhamento de console. O usuário é obrigado a jogar exclusivamente
              dentro do perfil fornecido pela locadora e deverá manter seu console conectado à
              internet 100% do tempo. A tentativa de ativação como conta principal resultará em
              banimento e aplicação de multa descrita na Seção 4.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-blue-400">
            3. Regras de Segurança e Acesso
          </h3>
          <ul className="list-disc space-y-3 pl-5 text-zinc-300">
            <li>
              É proibido entrar na conta fornecida utilizando a opção "Jogar como Convidado". O
              perfil deve ser salvo no console.
            </li>
            <li>
              <strong className="text-emerald-400">Código de Autenticação (2FA):</strong> Para
              segurança do sistema, o botão de gerar código de acesso no painel de controle da vaga
              Secundária é de uso único. O usuário concorda em acionar o código apenas quando
              estiver de frente para a tela do console.
            </li>
            <li>
              O usuário compromete-se a <strong className="text-white">NÃO ALTERAR</strong> nenhum
              dado da conta fornecida, incluindo (mas não se limitando a): E-mail, Senha, ID Online,
              Avatar ou configurações de segurança. Qualquer tentativa de alteração resultará no
              banimento permanente da plataforma e medidas legais cabíveis.
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-rose-400">
            4. Devolução Obrigatória e Multa Administrativa
          </h3>
          <p>
            Ao término do período de locação, o usuário perde o direito de acesso ao jogo. É{' '}
            <strong>obrigação exclusiva do usuário</strong> acessar as configurações do seu console
            e <strong className="text-rose-400">DESATIVAR</strong> o Compartilhamento de Console
            antes de excluir o perfil do videogame (seja a locação Primária ou Secundária ativada
            indevidamente).
          </p>
          <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-950/20 p-4">
            <strong className="mb-1 block text-rose-400">Cláusula de Multa Contratual:</strong>
            <p className="text-sm text-zinc-300">
              A não desativação da conta prende a licença da loja no console do usuário, bloqueando
              o acesso e impedindo que o próximo cliente da fila jogue. Caso isso ocorra, ou caso o
              cliente da vaga secundária tente ativar a conta como principal, o sistema aplicará uma{' '}
              <strong className="text-white">Multa Administrativa Automática de R$ 50,00</strong>. O
              saldo do usuário ficará negativo e a conta da plataforma será suspensa até a
              regularização do débito.
            </p>
          </div>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-emerald-400">
            5. Sistema de Devolução Antecipada (Cashback Premium)
          </h3>
          <p>
            Usuários que finalizarem seus jogos antes do prazo podem acionar a devolução no painel.
            A bonificação segue regras distintas para cada modalidade: a Vaga Primária tem direito a
            um valor fixo mais um bônus por cada 24 horas não utilizadas. A Vaga Secundária (tarifa
            econômica) tem direito apenas ao bônus fixo estipulado. Os valores vigentes encontram-se
            descritos na Central de Ajuda.
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-blue-400">
            6. Fila de Espera (Reservas e Rank VIP)
          </h3>
          <p>
            Ao reservar um jogo indisponível, o valor é retido da carteira. O sistema transferirá as
            credenciais de acesso na aba "Meus Acessos" assim que a locação do usuário anterior for
            encerrada. A BORA JOGAR! opera com um sistema de Rank VIP. Usuários com nível de
            fidelidade mais alto (baseado no número de locações concluídas) possuem o direito
            contratual de prioridade na entrega da conta. A data de liberação prevista pode ser
            adiantada a qualquer momento e o usuário será notificado.
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-blue-400">
            7. Conduta e Responsabilidade (PSN)
          </h3>
          <p>
            A BORA JOGAR! não se responsabiliza por banimentos sofridos no console do usuário devido
            à quebra dos Termos de Serviço da PlayStation Network. Caso o usuário utilize softwares
            de trapaça (hacks/exploits), trapaças de saves, ou possua conduta tóxica que resulte no
            banimento da conta fornecida pela loja, o usuário será cobrado judicialmente pelo valor
            integral de reposição do jogo perdido.
          </p>
        </section>
      </div>
    </div>
  );
}
