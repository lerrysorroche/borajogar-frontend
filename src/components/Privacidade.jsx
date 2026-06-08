export default function Privacidade() {
  return (
    <div className="animate-fade-in mx-auto max-w-4xl py-8">
      <div className="mb-10 border-b border-zinc-800 pb-8">
        <h2 className="mb-4 text-3xl font-black tracking-tight text-white md:text-4xl">
          Política de Privacidade
        </h2>
        <p className="text-sm font-medium text-zinc-400">Última atualização: Junho de 2026</p>
      </div>

      <div className="space-y-8 text-sm leading-relaxed text-zinc-300 md:text-base">
        <section>
          <p className="text-zinc-300">
            A sua privacidade é nossa prioridade. Esta política descreve como a BORA JOGAR! coleta,
            utiliza e protege os seus dados pessoais ao utilizar nossa plataforma, em total
            conformidade com a Lei Geral de Proteção de Dados (LGPD - Lei nº 13.709/2018).
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-emerald-400">
            1. Dados que Coletamos
          </h3>
          <p>
            Para o funcionamento da plataforma e liberação das locações, coletamos as seguintes
            informações no momento do seu cadastro:
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-300">
            <li>Nome Completo</li>
            <li>Endereço de E-mail</li>
            <li>Número de Telefone (WhatsApp)</li>
            <li>
              Senha (armazenada de forma criptografada e inacessível até mesmo para nossos
              administradores).
            </li>
          </ul>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-emerald-400">
            2. Como Utilizamos seus Dados
          </h3>
          <p>As informações coletadas são estritamente utilizadas para:</p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-zinc-300">
            <li>Criar e gerenciar sua carteira digital dentro da plataforma.</li>
            <li>Enviar credenciais de acesso aos jogos alugados.</li>
            <li>
              Notificar via e-mail ou WhatsApp quando a fila de espera do seu jogo favorito andar.
            </li>
            <li>Fornecer suporte técnico e prevenir fraudes ou apropriação indevida das contas.</li>
          </ul>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-emerald-400">
            3. Proteção e Pagamentos
          </h3>
          <p>
            A BORA JOGAR! <strong className="text-white">NÃO armazena</strong> dados bancários,
            números de cartão de crédito ou chaves PIX de suas contas pessoais. Todo o processamento
            financeiro é realizado em ambiente blindado e seguro através da instituição de pagamento
            parceira oficial (Stripe/Efí).
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-emerald-400">
            4. Compartilhamento de Dados
          </h3>
          <p>
            Nós não vendemos, alugamos ou repassamos seus dados pessoais para terceiros ou agências
            de publicidade sob nenhuma hipótese. Seus dados são mantidos em servidores seguros e
            acessados apenas pelo sistema automatizado para garantir o seu aluguel.
          </p>
        </section>

        <section>
          <h3 className="mb-3 text-xl font-bold tracking-tight text-emerald-400">
            5. Seus Direitos
          </h3>
          <p>
            Você tem o direito de solicitar a exclusão da sua conta e de todos os seus dados de
            nossos servidores a qualquer momento. A exclusão será processada em até 72 horas, desde
            que não existam locações ativas, pendências de devolução no console ou saldos negativos
            (multas) em aberto.
          </p>
        </section>
      </div>
    </div>
  );
}
