/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#05070a',
        panel: '#0d1117',
        raise: '#151b24',
        line: '#1c2430',
        crimson: {
          DEFAULT: '#bf1e2e',
          hover: '#d42537',
          dim: '#82131e',
          glow: 'rgba(191, 30, 46, 0.35)',
        },
        chalk: '#f3f5f8',
        grey: {
          DEFAULT: '#728096',
          lift: '#a4b3c7',
          dim: '#475366',
        },
        pure: '#ffffff',
        avionics: {
          green: '#00ff88',
          cyan: '#00d2ff',
          amber: '#ffb020',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'monospace'],
      },
      letterSpacing: {
        hud: '0.22em',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.4s ease-in-out infinite',
        'sweep': 'sweep 3s cubic-bezier(0.22, 1, 0.36, 1) infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.08)' },
        },
        sweep: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        }
      }
    },
  },
  plugins: [],
}
