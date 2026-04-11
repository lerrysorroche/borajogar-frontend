/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // 🚀 Adicionando a Fonte Space Mono
      fontFamily: {
        'mono-tech': ['"Space Mono"', 'monospace'],
      },
      // 🚀 Criando a Animação de Flicker (Neon piscando)
      keyframes: {
        flicker: {
          '0%, 18%, 22%, 25%, 38%, 100%': { 
            opacity: 1,
            textShadow: '0 0 10px #60a5fa, 0 0 20px #34d399, 0 0 40px #34d399',
          },
          '20%, 24%, 35%': { 
            opacity: 0.2,
            textShadow: 'none',
          },
        }
      },
      animation: {
        'neon-flicker': 'flicker 3s infinite alernate', // Animação sutil e contínua
        'fade-in': 'fadeIn 0.5s ease-in-out',
      }
    },
  },
  plugins: [],
}