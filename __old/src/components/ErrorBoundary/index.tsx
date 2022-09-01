import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import * as Sentry from "@sentry/react";
import * as React from "react";

interface ErrorBoundaryState {
  hasError: boolean;
}

export default class ErrorBoundary extends React.Component<
  {},
  ErrorBoundaryState
> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(errorInfo as Record<string, any>);
      Sentry.captureException(error);
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Dialog hideBackdrop open>
          <DialogTitle>Big Oof</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Congratulations! You've found a problem that we haven't fixed yet.
              The details have already been sent to us. Sorry for the
              inconvenience!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              color="primary"
              onClick={() => window.location.reload()}
              variant="contained"
            >
              Reload the Page
            </Button>
          </DialogActions>
        </Dialog>
      );
    } else {
      return this.props.children;
    }
  }
}
