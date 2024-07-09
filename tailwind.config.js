/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        sans: ['var(--font-poppins)'],
      },
      colors: {
        primary: '#3498db',
        secondary: '#2ecc71',
        accent: '#e74c3c',
        text: '#e0e0e0',
        bg: {
          DEFAULT: '#121212',
          card: '#1e1e1e',
          nav: 'rgba(26, 26, 26, 0.95)',
          footer: '#1a1a1a',
          section1: '#1a1a1a',
          section2: '#222222',
        },
      },
    },
  },
  plugins: [],
};
