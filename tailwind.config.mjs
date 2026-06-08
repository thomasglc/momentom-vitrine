// tailwind.config.mjs
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        deep:     '#080808',
        surface:  '#111111',
        elevated: '#1a1a1a',
        border:   '#2a2a2a',
        accent:   '#f97316',
        'accent-bright': '#fb923c',
        'accent-dim':    '#7c3a0e',
        'text-primary':  '#f5f5f5',
        'text-secondary':'#a3a3a3',
        'text-muted':    '#525252',
      },
      fontFamily: {
        display: ['"Barlow Condensed"', 'sans-serif'],
        body:    ['Syne', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
