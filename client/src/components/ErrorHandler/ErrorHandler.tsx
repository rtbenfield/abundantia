import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import * as Sentry from "@sentry/browser";
import * as React from "react";

interface ErrorHandlerState {
  hasError: boolean;
  eventId?: string;
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
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
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
            <Button color="primary" onClick={() => window.location.reload()} variant="outlined">
              Reload the Page
            </Button>
            <Button
              color="primary"
              onClick={() => Sentry.showReportDialog({ eventId: this.state.eventId })}
              variant="contained"
            >
              Send Feedback
            </Button>
          </DialogActions>
        </Dialog>
      );
    } else {
      return this.props.children;
    }
  }
}
