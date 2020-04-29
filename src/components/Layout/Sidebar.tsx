import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";
import clsx from "clsx";
import * as React from "react";
import { useLoans } from "../../hooks/useLoans";
import SidebarLink from "./SidebarLink";

interface SidebarProps {
  className?: string;
  onAddClick(): void;
}

const Sidebar: React.FC<SidebarProps> = ({ className, onAddClick }) => {
  const classes = useStyles();
  const { error, isLoading, loans } = useLoans();
  if (error) {
    throw error;
  } else {
    return (
      <Paper className={clsx(classes.root, className)} elevation={16} square>
        {!isLoading && (
          <List>
            {[...loans]
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((l) => (
                <SidebarLink key={l.id} to={`/loans/${l.id}`}>
                  <ListItemText primary={l.name} />
                </SidebarLink>
              ))}
            {loans.length > 0 && <Divider />}
            <ListItem button onClick={onAddClick}>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Add New Loan" />
            </ListItem>
          </List>
        )}
      </Paper>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  root: {
    zIndex: theme.zIndex.drawer,
  },
}));

export default Sidebar;
