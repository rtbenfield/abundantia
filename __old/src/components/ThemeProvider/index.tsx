import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import * as React from "react";
import dark from "./dark";
import light from "./light";
import ThemedSnackbarProvider from "./ThemedSnackbarProvider";

const ThemeProvider: React.FC = ({ children }) => {
  const darkModePreferred = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createMuiTheme(darkModePreferred ? dark : light);
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <ThemedSnackbarProvider>{children}</ThemedSnackbarProvider>
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
