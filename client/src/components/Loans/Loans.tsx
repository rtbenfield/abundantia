import { AppBar, Dialog, IconButton, Slide, Toolbar, Typography } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import { TransitionProps } from "@material-ui/core/transitions";
import * as React from "react";
import { Link, Route, RouteComponentProps, Switch } from "react-router-dom";
import AddLoanDialog from "./AddLoanDialog";
import DeleteLoanDialog from "./DeleteLoanDialog";
import EditLoanDialog from "./EditLoanDialog";
import Explore from "./Explore";
import LoanOverview from "./LoanOverview";

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Loans: React.FunctionComponent<RouteComponentProps> = ({ history, match }) => {
  return (
    <Switch>
      <Route path={`${match.path}/add`}>
        {({ match: m }) => (
          <AddLoanDialog
            onClose={() => history.push(match.path)}
            onLoanAdded={loan => history.push(`${match.path}/${loan.id}`)}
            open={!!m}
          />
        )}
      </Route>
      <Route
        path={`${match.path}/:id`}
        render={({ match: m }) => (
          <>
            <LoanOverview
              editPath={`${m.url}/edit`}
              explorePath={`${m.url}/explore`}
              deletePath={`${m.url}/delete`}
              loanId={m.params.id}
            />
            <Route path={`${m.path}/delete`}>
              {({ match: m2 }) => (
                <DeleteLoanDialog
                  onClose={() => history.push(m.url)}
                  onLoanDeleted={() => history.push(match.url)}
                  loanId={m.params.id}
                  open={!!m2}
                />
              )}
            </Route>
            <Route path={`${m.path}/edit`}>
              {({ match: m2 }) => (
                <EditLoanDialog onClose={() => history.push(m.url)} loanId={m.params.id} open={!!m2} />
              )}
            </Route>
            <Route path={`${m.path}/explore`}>
              {({ match: m2 }) => (
                <Dialog fullScreen onClose={() => history.push(m.url)} open={!!m2} TransitionComponent={Transition}>
                  <AppBar style={{ position: "relative" }}>
                    <Toolbar>
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        component={Link as any}
                        edge="start"
                        {...{ to: m.url }}
                      >
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="h6" color="inherit">
                        Explore
                      </Typography>
                    </Toolbar>
                  </AppBar>
                  <Explore loanId={m.params.id} />
                </Dialog>
              )}
            </Route>
          </>
        )}
      />
    </Switch>
  );
};

export default Loans;
