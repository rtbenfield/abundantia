import { makeStyles } from "@material-ui/core/styles";
import { SnackbarProvider, SnackbarProviderProps } from "notistack";
import * as React from "react";

const ThemedSnackbarProvider: React.FC<SnackbarProviderProps> = (props) => {
  const classes = useStyles();
  return <SnackbarProvider classes={classes} {...props} />;
};

const useStyles = makeStyles((theme) => ({
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

export default ThemedSnackbarProvider;
