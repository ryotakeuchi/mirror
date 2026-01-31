import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        /* Mirror Color System */
        'mirror-beige-light': '#F5F5F0',
        'mirror-beige-medium': '#E5DED4',
        'mirror-beige-dark': '#D6CFC4',

        'mirror-charcoal': '#4A4A4A',
        'mirror-charcoal-soft': '#6B6B6B',

        'mirror-primary': '#D2B48C',
        'mirror-gold-accent': '#B8860B',
      },

      boxShadow: {
        /* Glassmorphism / Editorial Soft Shadow */
        'mirror-neumorphic':
          '0 4px 6px rgba(0,0,0,0.05), 0 10px 15px rgba(0,0,0,0.01)',
        'mirror-soft':
          '0 8px 24px rgba(0,0,0,0.04)',
      },

      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Noto Sans JP"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
