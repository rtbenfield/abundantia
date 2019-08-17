import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import * as Sentry from "@sentry/browser";
import * as React from "react";
import ReactGA from "react-ga";

interface ErrorHandlerState {
  hasError: boolean;
}

export default class ErrorHandler extends React.Component<{}, ErrorHandlerState> {
  public state: ErrorHandlerState = {
    hasError: false,
  };

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    Sentry.withScope(scope => {
      scope.setExtras(errorInfo);
      Sentry.captureException(error);
    });
    ReactGA.exception({
      description: error.message,
      fatal: true,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Dialog hideBackdrop open>
          <DialogTitle>Big Oof</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Congratulations! You've found a problem that we haven't fixed yet. The details have already been sent to
              us. Sorry for the inconvenience!
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => window.location.reload()} variant="contained">
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
