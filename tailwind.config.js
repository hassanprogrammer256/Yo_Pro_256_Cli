/** @type {import('tailwindcss').Config} */
export default {
  content: ['index.html','src/**/*{.jsx,.js}'],
  theme: {
    
    extend: {
  colors:{
  black: "#050505",
  dark: "#0d0d0d",

  red: "#ff0000",
  redGlow: "#ff3030",

  silver: "#c0c0c0",

  gold: "#ffb400",

  white: "#ffffff"
      }


    },
  },
  plugins: [],
}

