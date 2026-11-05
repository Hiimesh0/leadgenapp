/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#123C3A',
          hover: '#0e2f2e',
          light: '#1b4f4c'
        },
        secondary: {
          DEFAULT: '#2F6F68',
          hover: '#265b55',
          light: '#3d8880'
        },
        accent: {
          DEFAULT: '#B7D8C9',
          light: '#d4ebd0',
          dark: '#8bbfa7'
        },
        background: '#F7F8F5',
        surface: '#FFFFFF',
        text: {
          DEFAULT: '#172B2A',
          muted: '#647573',
          light: '#8fa09e'
        },
        border: {
          DEFAULT: '#E2E9E5',
          dark: '#c9d6d1'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', '"DM Serif Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(18, 60, 58, 0.05)',
        'elevated': '0 12px 32px -4px rgba(18, 60, 58, 0.08)',
        'card': '0 1px 3px rgba(0,0,0,0.02), 0 6px 16px rgba(18, 60, 58, 0.04)',
      }
    },
  },
  plugins: [],
}

