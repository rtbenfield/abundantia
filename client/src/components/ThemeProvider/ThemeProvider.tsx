import { createMuiTheme, CssBaseline, MuiThemeProvider } from "@material-ui/core";
import * as Sentry from "@sentry/browser";
import * as React from "react";
import ReactGA from "react-ga";
import dark from "./dark";
import light from "./light";

const darkModePreferred = window.matchMedia("(prefers-color-scheme: dark)").matches;
const theme = createMuiTheme(darkModePreferred ? dark : light);
ReactGA.set({
  theme: darkModePreferred ? "dark" : "light",
});
Sentry.setTag("theme", darkModePreferred ? "dark" : "light");

const ThemeProvider: React.FC = ({ children }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};

export default ThemeProvider;
