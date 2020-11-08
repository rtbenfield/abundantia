import { createMuiTheme } from "@material-ui/core/styles";

export default createMuiTheme({
  palette: {
    action: {
      active: "#D8DEE9",
      hover: "#434C5E",
      selected: "#4C566A",
    },
    common: {
      black: "#2E3440",
      white: "#ECEFF4",
    },
    error: {
      main: "#BF616A",
    },
    background: {
      default: "#2E3440",
      paper: "#3B4252",
    },
    divider: "#4C566A",
    primary: {
      contrastText: "#ECEFF4",
      main: "#81A1C1",
    },
    secondary: {
      main: "#BF616A",
    },
    text: {
      primary: "#D8DEE9",
      secondary: "#ECEFF4",
      hint: "#E5E9F0",
    },
    type: "dark",
  },
  overrides: {
    MuiDialog: {
      paper: {
        backgroundColor: "#2E3440",
      },
    },
    MuiTableCell: {
      root: {
        borderBottomColor: "#4C566A",
      },
    },
  },
  props: {
    MuiTabs: {
      indicatorColor: "primary",
    },
  },
});
