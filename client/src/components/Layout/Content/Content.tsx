import { makeStyles } from "@material-ui/core";
import classNames from "classnames";
import * as React from "react";
import { Route } from "react-router";
import Home from "../../Home";
import Loans from "../../Loans";

interface ContentProps {
  className?: string;
}

const Content: React.FunctionComponent<ContentProps> = ({ className }) => {
  const classes = useStyles();
  return (
    <main className={classNames(classes.root, className)}>
      <Route exact path="/" component={Home} />
      <Route path="/loans" component={Loans} />
    </main>
  );
};

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
  },
}));

export default Content;
