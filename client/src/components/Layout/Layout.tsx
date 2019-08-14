import { makeStyles } from "@material-ui/core";
import * as React from "react";
import Login from "../Login";
import Content from "./Content";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useUserContext } from "../../contexts/userContext";

const Layout: React.FunctionComponent = () => {
  const classes = useStyles();
  const userContext = useUserContext();
  return (
    <div className={classes.root}>
      <Navbar className={classes.navbar} />
      {userContext.isAuthenticated && (
        <>
          <Sidebar className={classes.sidebar} />
          <Content className={classes.content} />
        </>
      )}
      {!userContext.isAuthenticated && <Login />}
    </div>
  );
};

const useStyles = makeStyles({
  content: {
    gridArea: "content",
    overflow: "auto",
  },
  navbar: {
    gridArea: "navbar",
  },
  root: {
    display: "grid",
    gridTemplateAreas: `
      "navbar navbar"
      "sidebar content"
    `,
    gridTemplateColumns: "250px 1fr",
    gridTemplateRows: "min-content 1fr",
    height: "100%",
  },
  sidebar: {
    gridArea: "sidebar",
  },
});

export default Layout;
