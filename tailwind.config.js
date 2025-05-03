/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        'source-sans': ['var(--font-source-sans)', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            'blockquote p:first-of-type::before': { content: '""' },
            'blockquote p:last-of-type::after': { content: '""' },
            code: {
              backgroundColor: 'var(--tw-prose-pre-bg)',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
              fontWeight: '400',
            },
            table: {
              width: '100%',
            },
            'thead th': {
              padding: '0.75rem 1rem',
              borderWidth: '1px',
              borderColor: 'var(--tw-prose-th-borders)',
              backgroundColor: 'var(--tw-prose-th-bg)',
            },
            'tbody td': {
              padding: '0.75rem 1rem',
              borderWidth: '1px',
              borderColor: 'var(--tw-prose-td-borders)',
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: 'var(--tw-prose-td-borders)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
