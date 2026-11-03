/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1B4332',
          light: '#2D6A4F',
          subtle: '#84A98C',
        },
        accent: {
          DEFAULT: '#C9A96E',
          light: '#F0E6D3',
        },
        bg: {
          DEFAULT: '#FAFAF7',
          soft: '#F4F0E8',
          muted: '#EEF2EE',
        },
        border: '#E8E4DC',
        surface: '#FFFFFF',
        text: {
          primary: '#1A1A1A',
          secondary: '#5C5C5C',
          muted: '#9A9A9A',
          inverse: '#FAFAF7',
        },
      },
      fontFamily: {
        serif: ['"DM Serif Display"', 'Georgia', 'serif'],
        body: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      fontSize: {
        'display': ['clamp(2.75rem, 5.5vw, 5rem)', { lineHeight: '1.07' }],
        'h1': ['clamp(2rem, 3.5vw, 3.25rem)', { lineHeight: '1.15' }],
        'h2': ['clamp(1.625rem, 2.75vw, 2.5rem)', { lineHeight: '1.2' }],
        'h3': ['clamp(1.125rem, 1.75vw, 1.5rem)', { lineHeight: '1.3' }],
      },
      borderRadius: {
        'pill': '999px',
        'xl': '16px',
        '2xl': '24px',
      },
      boxShadow: {
        'card': '0 2px 12px rgba(0,0,0,0.07)',
        'card-hover': '0 8px 30px rgba(0,0,0,0.12)',
        'green': '0 8px 24px rgba(27,67,50,0.22)',
        'btn': '0 4px 14px rgba(27,67,50,0.25)',
      },
      maxWidth: {
        'content': '1280px',
      },
    },
  },
  plugins: [],
};
