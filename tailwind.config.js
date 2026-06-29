/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        luxury: {
          bg: '#FAF9F6',      // Elegant off-white
          card: '#FFFFFF',    // Pure white for cards
          text: '#1A1A1A',    // Deep charcoal (softer than pure black)
          muted: '#737373',   // Subtle gray for secondary text
          accent: '#B89970',  // Muted bronze/gold for luxury feel
          border: '#EAEAEA',  // Very subtle borders
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], // Luxury headings
        sans: ['"Inter"', 'sans-serif'],        // Clean modern body
      },
      boxShadow: {
        'luxury': '0 4px 20px rgba(0, 0, 0, 0.03)', // Very soft, subtle shadow
      }
    },
  },
  plugins: [],
}