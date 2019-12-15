import { CircularProgress, makeStyles } from "@material-ui/core";
import * as React from "react";

interface LoadingIndicatorProps {
  size: "fill";
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};

const useStyles = makeStyles({
  root: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    justifyContent: "center",
  },
});

export default LoadingIndicator;
