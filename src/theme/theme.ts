import createTheme from "@mui/material/styles/createTheme";
const fontSize = {
  40: "2.5rem",
  36: "2.25rem",
  30: "1.875rem",
  28: "1.75rem",
  26: "1.625rem",
  24: "1.5rem",
  20: "1.25rem",
  18: "1.125rem",
  16: "1rem",
  14: "0.875rem",
  12: "0.75rem",
  10: "0.625rem",
  8: "0.5rem",
};

export let theme = createTheme({
  direction: "rtl",
  typography: {
    // fontFamily: "yekanBakh",
  },

  breakpoints: {
    values: {
      xs: 320,
      sm: 420,
      md: 768,
      lg: 1024,
      xl: 1400,
    },
  },

  components: {},
});
