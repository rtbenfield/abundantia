import * as Sentry from "@sentry/browser";
import ReactGA from "react-ga";

export interface UseErrorHandlerResult {
  captureError(error: Error): void;
}

function captureError(error: Error) {
  Sentry.captureException(error);
  ReactGA.exception({
    description: error.message,
    fatal: false,
  });
}

export function useErrorHandler(): UseErrorHandlerResult {
  return {
    captureError,
  };
}
