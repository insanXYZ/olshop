/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "lato": "lato",
        "lato-b": "lato-b",
        "caveat": "caveat",
        "caveat-b": "caveat-b",
        "outfit":"outfit",
        "outfit-b":"outfit-b",
        "outfit-l":"outfit-l",
      },
      colors : {
        "dark-neutral" : "#303241"
      }
    },
  },
  plugins: [require("daisyui")],
  daisyui : {
    themes : ["dracula"]
  }
}