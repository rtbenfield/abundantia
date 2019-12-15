import { makeStyles } from "@material-ui/core";
import { SnackbarProvider, SnackbarProviderProps } from "notistack";
import * as React from "react";

const useStyles = makeStyles(theme => ({
  variantError: {
    background: theme.palette.background.paper,
    color: "#bf616a",
  },
  variantInfo: {
    background: theme.palette.background.paper,
    color: "#8fbcbb",
  },
  variantSuccess: {
    background: theme.palette.background.paper,
    color: "#a3be8c",
  },
  variantWarning: {
    background: theme.palette.background.paper,
    color: "#ebcb8b",
  },
}));

const CustomSnackbarProvider: React.FunctionComponent<SnackbarProviderProps> = ({ children, ...props }) => {
  const classes = useStyles();
  return (
    <SnackbarProvider classes={classes} {...props}>
      {children}
    </SnackbarProvider>
  );
};

export default CustomSnackbarProvider;
