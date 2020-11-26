import * as Sentry from "@sentry/react";

export interface UseErrorCaptureResult {
  captureError(error: Error): void;
}

function captureError(error: Error) {
  Sentry.captureException(error);
}

export function useErrorCapture(): UseErrorCaptureResult {
  return {
    captureError,
  };
}
