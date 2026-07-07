import { extendTheme } from "@mui/joy/styles";

// const colors = {

//   black: "#050505",
//   dark: "#0d0d0d",

//   red: "#ff0000",
//   redGlow: "#ff3030",

//   silver: "#c0c0c0",

//   gold: "#ffb400",

//   white: "#ffffff"
// }

const theme = extendTheme({

  colorSchemes: {

    dark: {

      palette: {

        primary: {
          solidBg: "#ff0000"
        },

        neutral: {
          solidBg: "#0d0d0d"
        }
      }
    }
  },
});

export default theme;