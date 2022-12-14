module.exports = {
  content: [
    "./src/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/*.{js,ts,jsx,tsx}",
    "./public/index.html"
  ],
  purge: [
    "./src/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/pages/*.{js,ts,jsx,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
