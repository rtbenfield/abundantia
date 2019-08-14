import { ListItem } from "@material-ui/core";
import * as React from "react";
import { Link, Route } from "react-router-dom";

interface ListItemLinkProps {
  children: React.ReactNode;
  to: string;
}

const ListItemLink: React.FunctionComponent<ListItemLinkProps> = ({ children, to }) => {
  return (
    <Route path={to}>
      {({ match }) => (
        <ListItem button component={Link as any} {...{ to }} selected={!!match}>
          {children}
        </ListItem>
      )}
    </Route>
  );
};

export default ListItemLink;
