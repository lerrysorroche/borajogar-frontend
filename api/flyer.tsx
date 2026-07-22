import { ImageResponse } from '@vercel/og';


export default async function handler(req: Request) {
  try {
    // Pega a URL e extrai as variáveis que enviamos pelo n8n
    const { searchParams } = new URL(req.url);
    const titulo = searchParams.get('titulo') || 'Lançamento Disponível';
    const bg = searchParams.get('bg') || 'https://via.placeholder.com/1080x1080';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            backgroundImage: `url(${bg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Camada Escura (Overlay) para garantir que o texto dê leitura, não importa o fundo */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'linear-gradient(to top, rgba(0,0,0, 0.95) 0%, rgba(0,0,0, 0.5) 40%, rgba(0,0,0, 0) 100%)',
            }}
          />

          {/* Container do Conteúdo */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-end',
              padding: '80px',
              zIndex: 10,
              width: '100%',
            }}
          >
            {/* Tag / Logo da Locadora */}
            <div
              style={{
                display: 'flex',
                background: '#6366f1', // Substitua pela cor roxa/azul da Bora Jogar
                padding: '12px 32px',
                borderRadius: '16px',
                marginBottom: '24px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.5)'
              }}
            >
              <span style={{ color: 'white', fontSize: 36, fontWeight: 800, letterSpacing: '2px' }}>
                🎮 BORA JOGAR!
              </span>
            </div>

            {/* Título do Jogo Dinâmico */}
            <div
              style={{
                fontSize: 84,
                fontWeight: 900,
                color: 'white',
                textAlign: 'center',
                marginBottom: '32px',
                textTransform: 'uppercase',
                textShadow: '0 4px 20px rgba(0,0,0, 0.8)',
                lineHeight: 1.1,
              }}
            >
              {titulo}
            </div>

            {/* Call to Action (Botão Falso chamativo) */}
            <div
              style={{
                display: 'flex',
                background: '#ffffff',
                padding: '24px 48px',
                borderRadius: '100px',
                border: '6px solid #6366f1',
              }}
            >
              <span style={{ color: '#000000', fontSize: 44, fontWeight: 900 }}>
                ALUGUE SEM FILAS ⚡
              </span>
            </div>
          </div>
        </div>
      ),
      {
        width: 1080,
        height: 1080, // Proporção quadrada perfeita para feed do Instagram
      }
    );
  } catch (e) {
    console.error(e);
    return new Response('Falha ao gerar o Flyer', { status: 500 });
  }
}