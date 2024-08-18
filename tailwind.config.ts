import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './public/**/*.svg'],
  theme: {
    extend: {
      colors: {
        background: '#eee',
        'background-dark': '#111',
        text: '#111',
        'text-dark': '#eee',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)'],
        mono: ['var(--font-geist-mono)'],
      },
      keyframes: {
        in: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'in-reverse': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        in: 'in .5s both',
        'in-reverse': 'in-reverse .5s both',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: false,
  },
  plugins: [typography],
} satisfies Config
