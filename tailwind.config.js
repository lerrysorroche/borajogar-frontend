/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 🚀 Fonte Space Mono
      fontFamily: {
        'mono-tech': ['"Space Mono"', 'monospace'],
      },
      // 🚀 Animação de Flicker Corrigida (Usando drop-shadow para textos com degradê)
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': { 
            opacity: '1',
            filter: 'drop-shadow(0 0 8px rgba(52, 211, 153, 0.6)) drop-shadow(0 0 15px rgba(96, 165, 250, 0.4))'
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': { 
            opacity: '0.4',
            filter: 'none'
          },
        }
      },
      animation: {
        // Trocamos para 'linear' para o piscar ficar mais "seco" e mecânico, tipo mal contato
        'neon-flicker': 'flicker 4s infinite linear', 
      }
    },
  },
  plugins: [],
}