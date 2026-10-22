// Passo a passo da devolução (apagar a conta da locadora do console e mandar um
// vídeo). Fica num só lugar para o modal de devolução, a Central de Ajuda e os
// demais avisos do site nunca divergirem entre si.

const VIDEO = '/videos/apagar_conta_ps5.mp4';
const CAPA_VIDEO = '/videos/apagar_conta_ps5_capa.jpg';

export function PassosApagarConta() {
  return (
    <ol className="space-y-3 text-sm leading-relaxed text-zinc-300">
      <li className="flex gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-black text-emerald-400">
          1
        </span>
        <span>
          <strong className="text-white">Apague a conta da locadora do seu console.</strong>
          <br />
          <strong className="text-white">No PS5:</strong> Configurações &gt; Usuários e Contas &gt;{' '}
          Excluir usuários &gt; escolha a conta da locadora &gt;{' '}
          <strong className="text-rose-400">Sim</strong> no aviso que aparecer.
          <br />
          <strong className="text-white">No PS4:</strong> Configurações &gt; Configurações de login
          &gt; Gerenciamento de usuários &gt; Excluir usuário &gt; escolha a conta da locadora.
        </span>
      </li>
      <li className="flex gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-black text-emerald-400">
          2
        </span>
        <span>
          Pronto: a conta é apagada, você sai dela automaticamente e ela fica desativada. O console
          avisa que os dados salvos desse usuário também serão excluídos, isso é normal.
        </span>
      </li>
      <li className="flex gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-black text-emerald-400">
          3
        </span>
        <span>
          <strong className="text-white">Grave um vídeo curto da TV</strong> mostrando esse caminho
          até apertar <strong className="text-rose-400">Sim</strong>, e{' '}
          <strong className="text-white">envie o vídeo no WhatsApp da locadora</strong>. É assim que
          confirmamos a devolução.
        </span>
      </li>
    </ol>
  );
}

export function VideoTutorialApagarConta({ className = '' }) {
  return (
    <video
      controls
      playsInline
      preload="none"
      poster={CAPA_VIDEO}
      className={`w-full rounded-xl border border-zinc-800 bg-black ${className}`}
    >
      <source src={VIDEO} type="video/mp4" />
      Seu navegador não consegue reproduzir este vídeo.
    </video>
  );
}
