/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        black: 'var(--black)',
        white: 'var(--white)',
        orange: 'var(--orange)',
        'orange-dim': 'var(--orange-dim)',
        gray: 'var(--gray)',
        'gray-mid': 'var(--gray-mid)',
        'gray-text': 'var(--gray-text)',
      },
      fontFamily: {
        display: 'var(--font-display)',
        mono: 'var(--font-mono)',
      },
      animation: {
        fadeUp: 'fadeUp 0.9s ease forwards',
        fadeIn: 'fadeIn 1s ease forwards',
        blink: 'blink 1s step-end infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
      },
      spacing: {
        '5.5': '1.375rem',
      },
    },
  },
  plugins: [],
}

