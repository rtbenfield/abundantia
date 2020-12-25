import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
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
        {isLoading ? (
          <List className={classes.list}>
            <ListItem>
              <ListItemText
                primary="xxxxxxx"
                primaryTypographyProps={{
                  "aria-hidden": true,
                  className: classes.listItemLoading,
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="xxxx"
                primaryTypographyProps={{
                  "aria-hidden": true,
                  className: classes.listItemLoading,
                }}
              />
            </ListItem>
            <ListItem>
              <ListItemText
                primary="xxxxxxxxx"
                primaryTypographyProps={{
                  "aria-hidden": true,
                  className: classes.listItemLoading,
                }}
              />
            </ListItem>
          </List>
        ) : (
          <List className={classes.list}>
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
        <Divider />
        <Typography
          className={classes.version}
          component="span"
          title={`Version ${
            import.meta.env.SNOWPACK_PUBLIC_VERSION || "LOCAL"
          }`}
          variant="subtitle1"
        >
          Version{" "}
          {(import.meta.env.SNOWPACK_PUBLIC_VERSION || "LOCAL").substr(0, 8)}
        </Typography>
      </Paper>
    );
  }
};

const useStyles = makeStyles((theme) => ({
  list: {
    flex: 1,
  },
  listItemLoading: {
    display: "inline-block",
    backgroundColor: theme.palette.text.primary,
    borderRadius: theme.shape.borderRadius,
    color: "transparent",
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    opacity: 0.5,
    userSelect: "none",
  },
  root: {
    display: "flex",
    flexDirection: "column",
    zIndex: theme.zIndex.drawer,
  },
  version: {
    margin: theme.spacing(),
  },
}));

export default Sidebar;
