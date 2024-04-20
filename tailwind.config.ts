import { type Config } from 'tailwindcss'
import { fontFamily } from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '1.25rem'
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        serif: ['var(--font-serif)', ...fontFamily.serif],
        mono: ['var(--font-mono)', ...fontFamily.mono]
      },
      blur: {
        xs: '2px'
      },
      keyframes: {
        'animate-blur': {
          '0%': {
            filter: 'blur(5px)'
          },
          '100%': {
            filter: 'blur(0px)'
          }
        },
        'animate-up': {
          '0%': {
            transform: `translateY(16px)`
          },
          '100%': {
            transform: 'translateY(0px)'
          }
        },
        'animate-scale': {
          '0%': {
            transform: `scale(1.05)`
          },
          '100%': {
            transform: 'translateY(0px)'
          }
        },
        'animate-opacity': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        }
      },
      typography: {
        quoteless: {
          css: {
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:first-of-type::after': { content: 'none' }
          }
        }
      },
      animation: {
        enter:
          'animate-scale 0.75s ease-in-out both, animate-blur 0.75s ease-in-out both, animate-opacity 0.75s ease-in-out both',
        up: 'animate-up 0.75s ease-in-out both',
        blur: 'animate-blur 0.75s ease-in-out both, animate-opacity 0.75s ease-in-out both'
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'animation-delay': (value) => {
            return {
              'animation-delay': value
            }
          }
        },
        {
          values: theme('transitionDelay')
        }
      )
    })
  ]
} satisfies Config
