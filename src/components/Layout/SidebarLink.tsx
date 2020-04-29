import ListItem from "@material-ui/core/ListItem";
import * as React from "react";
import { Link, useRouteMatch } from "react-router-dom";

interface ListItemLinkProps {
  children: React.ReactNode;
  to: string;
}

const ListItemLink: React.FC<ListItemLinkProps> = ({ children, to }) => {
  const match = useRouteMatch(to);
  return (
    <ListItem button component={Link} selected={!!match} to={to}>
      {children}
    </ListItem>
  );
};

export default ListItemLink;
