import { createMuiTheme } from "@material-ui/core";

export default createMuiTheme({
  palette: {
    action: {
      active: "#2E3440",
      hover: "#D8DEE9",
      selected: "#D8DEE9",
    },
    common: {
      black: "#2E3440",
      white: "#ECEFF4",
    },
    error: {
      main: "#BF616A",
    },
    background: {
      default: "#ECEFF4",
      paper: "#E5E9F0",
    },
    divider: "#D8DEE9",
    primary: {
      contrastText: "#ECEFF4",
      main: "#5E81AC",
    },
    secondary: {
      main: "#BF616A",
    },
    text: {
      primary: "#2E3440",
      secondary: "#434C5E",
      hint: "#3B4252",
    },
    type: "light",
  },
  overrides: {
    MuiTableCell: {
      root: {
        borderBottomColor: "#D8DEE9",
      },
    },
  },
});