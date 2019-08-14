import { Divider, List, ListItemIcon, ListItemText, makeStyles, Paper } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import classNames from "classnames";
import * as React from "react";
import useLoans from "../../../hooks/useLoans";
import ListItemLink from "./ListItemLink";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FunctionComponent<SidebarProps> = ({ className }) => {
  const classes = useStyles();
  const { error, loading, loans } = useLoans();
  if (error) {
    return <h1>{error.message}</h1>;
  } else {
    return (
      <Paper className={classNames(classes.root, className)} elevation={16} square>
        {!loading && (
          <List>
            {loans.map(l => (
              <ListItemLink key={l.id} to={`/loans/${l.id}`}>
                <ListItemText primary={l.name} />
              </ListItemLink>
            ))}
            {loans.length > 0 && <Divider />}
            <ListItemLink to="/loans/add">
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add New Loan" />
            </ListItemLink>
          </List>
        )}
      </Paper>
    );
  }
};

const useStyles = makeStyles(theme => ({
  root: {
    zIndex: theme.zIndex.drawer,
  },
}));

export default Sidebar;
