   // File: tailwind.config.js
   module.exports = {
    content: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          gold: '#D4B98C',
          dark: '#1A1A1A',
          light: '#F8F8F8',
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