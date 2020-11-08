import AppBar from "@material-ui/core/AppBar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import * as React from "react";
import { Link, Redirect, Route, Switch, useHistory } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Home = React.lazy(() => import("../Home"));
const Loan = React.lazy(() => import("../Loan"));
const LoanAddDialog = React.lazy(() => import("../LoanAddDialog"));
const LoanExplore = React.lazy(() => import("../LoanExplore"));

const PageLoading: React.FC = () => {
  return (
    <div
      style={{
        alignContent: "center",
        display: "flex",
        flex: 1,
        height: "100%",
        justifyContent: "center",
      }}
    >
      <CircularProgress size="5rem" style={{ alignSelf: "center" }} />
    </div>
  );
};

const Layout: React.FC = () => {
  const history = useHistory();
  const classes = useStyles();
  const [addOpen, setAddOpen] = React.useState(false);

  return (
    <div className={classes.root}>
      <Navbar className={classes.navbar} />
      <Sidebar
        className={classes.sidebar}
        onAddClick={() => setAddOpen(true)}
      />
      <main className={classes.content}>
        <React.Suspense fallback={<PageLoading />}>
          <Switch>
            <Route component={Home} exact path="/" />
            <Route component={Loan} path="/loans/:id" />
            <Redirect to="/" />
          </Switch>
          <Route path="/loans/:id/explore">
            {({ match }) => (
              <Dialog
                fullScreen
                onClose={() => history.push(`/loans/${match?.params.id}`)}
                open={!!match}
              >
                <AppBar style={{ position: "relative" }}>
                  <Toolbar>
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      component={Link}
                      edge="start"
                      to={`/loans/${match?.params.id}`}
                    >
                      <CloseIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit">
                      Explore
                    </Typography>
                  </Toolbar>
                </AppBar>
                <LoanExplore />
              </Dialog>
            )}
          </Route>
        </React.Suspense>
      </main>
      <React.Suspense fallback={null}>
        <LoanAddDialog
          onClose={() => setAddOpen(false)}
          onLoanAdded={(id) => {
            history.push(`/loans/${id}`);
            setAddOpen(false);
          }}
          open={addOpen}
        />
      </React.Suspense>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  content: {
    gridArea: "content",
    overflow: "auto",
    padding: theme.spacing(2),
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
}));

export default Layout;
