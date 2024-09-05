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
        "gray-color": "#4B5563",
        "bold-gray-color": "#1F2937"
      },
      fontFamily: {
        lato: "Lato",
        roboto: "Roboto",
        poppins: "Poppins",
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}