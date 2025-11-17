// tailwind.config.mjs
export default {
  darkMode: 'class',
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
      primary: { DEFAULT: '#3b82f6', dark: '#2563eb' },
      accent: { DEFAULT: '#f472b6', dark: '#be185d' },
    }
    },
  },
  plugins: [],
}
