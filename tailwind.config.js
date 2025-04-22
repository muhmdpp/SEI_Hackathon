// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // All files in the src folder
    "./public/index.html",        // Optional: For inline Tailwind in HTML
  ],
  
  theme: {
    extend: {
      colors: {
        'dark-blue': '#003366',
        'light-blue': '#4F8FD6',
        'dark-grey': '#2F2F2F',
        'light-grey': '#F1F1F1',
        'gold': '#FFD700',
        'green': '#28A745',
        'red': '#DC3545',
        'cta-blue': '#007BFF',
      },
    },
  },
  plugins: [],
}
