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
          hover: '#0E2E2C',
          light: '#1B524F',
        },
        secondary: {
          DEFAULT: '#2F6F68',
          hover: '#245953',
          light: '#3C887F',
        },
        accent: {
          DEFAULT: '#B7D8C9',
          hover: '#9EC6B4',
          subtle: '#EBF4F0',
        },
        bg: '#F7F8F5',
        surface: '#FFFFFF',
        heading: '#172B2A',
        body: '#647573',
        border: '#E2E9E5',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(18, 60, 58, 0.04)',
        'premium': '0 10px 30px rgba(18, 60, 58, 0.08)',
        'elevated': '0 20px 40px rgba(18, 60, 58, 0.12)',
      }
    },
  },
  plugins: [],
}
