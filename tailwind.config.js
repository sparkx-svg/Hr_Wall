/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#17140F',
          50: '#F5F3EF',
          100: '#E7E2D9',
          200: '#C9C1B2',
          300: '#9C917C',
          400: '#655C4C',
          500: '#3D362B',
          600: '#2B261E',
          700: '#211D17',
          800: '#1B1712',
          900: '#17140F',
          950: '#0F0D09',
        },
        paper: {
          DEFAULT: '#F5EFE2',
          50: '#FBF9F4',
          100: '#F5EFE2',
          200: '#EDE3CC',
        },
        brass: {
          50: '#FBF3E3',
          100: '#F3DFAF',
          300: '#D9AC5A',
          400: '#C89A42',
          500: '#BD8A34',
          600: '#9C6F26',
          700: '#7A561D',
        },
        teal: {
          50: '#E9F1EF',
          100: '#C7DCD8',
          400: '#2C7367',
          500: '#1E5A50',
          600: '#164740',
          700: '#0F332E',
        },
        clay: {
          400: '#C0603C',
          500: '#AC4E2E',
          600: '#8A3D23',
        }
      },
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'ui-sans-serif', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
        manrope: ['"IBM Plex Sans"', 'sans-serif'],
        inter: ['"IBM Plex Sans"', 'sans-serif'],
      },
      backgroundImage: {
        grain: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
      }
    }
  },
  plugins: [],
}
