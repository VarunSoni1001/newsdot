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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        cabinet: ['Cabinet Grotesk', "sans-serif"],
        boska: ["Boska", "serif"],
        zina: ["Zina", "sans-serif"],
        kola: ["Kola", "sans-serif"],
        stardom: ["Stardom", "sans-serif"],
        generalSans: ["General Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}