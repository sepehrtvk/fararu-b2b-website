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

  components: {
    MuiTable: {
      styleOverrides: {
        root: {
          tableLayout: "fixed",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          "&.MuiTableCell-head": {
            fontSize: fontSize[16],
            fontWeight: "bold",
            color: "#000",
            padding: 0,
            textAlign: "center",
            paddingBottom: "16px",
          },
          "&.MuiTableCell-head:first-of-type": {
            width: "75px",
          },
          "&.MuiTableCell-body": {
            fontSize: fontSize[14],
            color: "#343a40",
            textAlign: "center",
            padding: 0,
            paddingBottom: "16px",
            paddingTop: "16px",
            paddingRight: "10px",
            paddingLeft: "10px",
          },
          "&.MuiTableCell-body:first-of-type": {
            fontSize: fontSize[14],
            fontWeight: "bold",
            color: "#000",
          },
        },
      },
    },
    MuiPagination: {
      styleOverrides: {
        root: {
          display: "flex",
          justifyContent: "center",
          marginTop: 10,
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          padding: 0,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          paddingRight: 8,
          paddingLeft: 8,
          marginTop: 5,
          borderRadius: 8,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          "&.MuiMenuItem-root:hover": {
            borderRadius: 8,
          },
          "&.Mui-selected": {
            borderRadius: 8,
          },
        },
      },
    },
  },
});
