import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: '#1A2A6C',
          red: '#CC1200',
          gold: '#D4A017',
          orange: '#FF6B00',
          dark: '#0D0D0D',
        },
      },
      fontFamily: {
        serif: ['Noto Serif TC', 'serif'],
        sans: ['Noto Sans TC', 'sans-serif'],
      },
      borderRadius: {
        card: '8px',
      },
      ringWidth: { DEFAULT: '0px' },
      ringColor: { DEFAULT: 'transparent' },
      ringOffsetWidth: { DEFAULT: '0px' },
    },
  },
  plugins: [],
}

export default config
