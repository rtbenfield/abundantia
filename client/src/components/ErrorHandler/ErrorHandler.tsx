import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import * as Sentry from "@sentry/browser";
import * as React from "react";

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
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Dialog hideBackdrop open>
          <DialogTitle>Big Oof</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Congratulations! You've found a problem that we haven't fixed yet. Some of the error details have already
              been sent to us, but we would appreciate if you took a minute to give us more details.
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
