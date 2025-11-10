/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'filecoin-blue': '#00F5D4',
        'lime-glow': '#C8FF00',
        'bg-dark': '#050505',
        'text-primary': '#EDEDED',
        'text-secondary': '#9AA0A6',
        'error': '#FF3B3B',
      },
      fontFamily: {
        mono: ['Space Mono', 'JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'shimmer': 'shimmer 2s linear infinite',
        'glow-blue': 'glow-blue 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #00F5D4, 0 0 10px #00F5D4' },
          '100%': { boxShadow: '0 0 10px #00F5D4, 0 0 20px #00F5D4, 0 0 30px #00F5D4' },
        },
        'glow-blue': {
          '0%': { boxShadow: '0 0 5px rgba(0,245,212,0.25), 0 0 10px rgba(0,245,212,0.25)' },
          '100%': { boxShadow: '0 0 10px rgba(0,245,212,0.5), 0 0 20px rgba(0,245,212,0.5), 0 0 30px rgba(0,245,212,0.5)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}

