export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'bg-primary':   '#ffffff',
        'bg-secondary': '#f8f7f4',
        'bg-tertiary':  '#f0ede8',
        accent:         '#f97316',
        'accent-dark':  '#ea6c0a',
        'accent-light': '#fff7ed',
        'text-primary': '#1a1a1a',
        'text-secondary':'#6b6b6b',
        'text-muted':   '#a8a8a8',
        border:         '#e8e5e0',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body:    ['Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
