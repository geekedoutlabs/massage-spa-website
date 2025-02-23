   // File: tailwind.config.js
   module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          gold: 'var(--color-gold)',
          dark: 'var(--color-dark)',
          light: 'var(--color-light)',
          accent: 'var(--color-accent)',
        },
        fontFamily: {
          sans: ['Poppins', 'sans-serif'],
          serif: ['Cormorant', 'serif'],
        },
        animation: {
          'float': 'float 6s ease-in-out infinite',
        },
        keyframes: {
          float: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-10px)' },
          }
        }
      },
    },
    plugins: [],
  } 