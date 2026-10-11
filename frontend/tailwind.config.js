/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          hover: 'var(--color-primary-hover)',
          soft: 'var(--color-primary-soft)',
        },
        accent: {
          DEFAULT: 'var(--color-accent)',
        },
        success: {
          DEFAULT: 'var(--color-success)',
        },
        warning: {
          DEFAULT: 'var(--color-warning)',
        },
        danger: {
          DEFAULT: 'var(--color-danger)',
        },
        info: {
          DEFAULT: 'var(--color-info)',
        },
        bg: 'var(--color-bg)',
        surface: {
          DEFAULT: 'rgb(var(--color-surface-rgb) / <alpha-value>)',
          2: 'rgb(var(--color-surface-2-rgb) / <alpha-value>)',
        },
        border: 'rgb(var(--color-border-rgb) / <alpha-value>)',
        text: {
          DEFAULT: 'var(--color-text)',
          muted: 'var(--color-text-muted)',
        },
      },
      fontFamily: {
        heading: ['"Hallo Sans"', '"Plus Jakarta Sans"', '"Noto Sans Sinhala"', '"Noto Sans Tamil"', 'system-ui', 'sans-serif'],
        body: ['"Neutra Text"', '"Plus Jakarta Sans"', '"Noto Sans Sinhala"', '"Noto Sans Tamil"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        lg: '8px',
        xl: '12px',
        full: '9999px',
      },
      boxShadow: {
        soft: '0 4px 20px -2px rgba(0, 0, 0, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
      },
    },
  },
  plugins: [],
}
