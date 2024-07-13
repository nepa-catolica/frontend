/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  theme: {
    extend: {
      colors: {
        "primary-color": "#002266",
        "second-color": "#F5F5F5",
        "tertiary-color": "#FFCC00",
      },
      fontFamily: {
        lato: "Lato",
        roboto: "Roboto"
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}