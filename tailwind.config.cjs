/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // EXTREME optimization
  corePlugins: {
    preflight: true,
  },
  // Remove unused utilities
  safelist: [],
  // Purge ALL unused CSS
  purge: {
    enabled: true,
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    options: {
      safelist: [],
    },
  },
}

