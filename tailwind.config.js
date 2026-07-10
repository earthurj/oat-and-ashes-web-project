/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        tan: '#D2B48C',
        cream: '#FCF9F8',
        espresso: '#2C1810',
        'surface-dim': '#DCD9D9',
        'warm-white': '#FFFAF5',
      },
      fontFamily: {
        display: ['"Archivo Narrow"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '6px',
      },
      boxShadow: {
        block: '3px 3px 0px 0px rgba(44, 24, 16, 0.8)',
        'block-sm': '2px 2px 0px 0px rgba(44, 24, 16, 0.8)',
        'block-hover': '1px 1px 0px 0px rgba(44, 24, 16, 0.8)',
      },
      borderWidth: {
        '3': '3px',
      },
      transitionDuration: {
        DEFAULT: '150ms',
      },
    },
  },
  plugins: [],
}
