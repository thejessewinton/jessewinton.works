module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/elements/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/layouts/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '1.25rem',
    },
    extend: {
      colors: {
        black: '#000',
        white: '#fff',
        gray: {
          100: '#111',
          200: '#222',
          300: '#333',
          400: '#eee',
        },
      },
      fontSize: {
        h1: '3.25rem',
        h2: '2.75rem',
        h3: '2.5rem',
        h4: '2.125rem',
        h5: '1.75rem',
        h6: '1.25rem',
        base: ['14px', '1.5'],
      },
    },
    fontFamily: {
      sans: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        'Helvetica Neue',
        'sans-serif',
      ],
      monospace: ['Robot Mono', 'monospace'],
    },
  },
  plugins: [require('tailwindcss-radix')()],
};
