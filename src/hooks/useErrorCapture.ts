export interface UseErrorCaptureResult {
  captureError(error: Error): void;
}

function captureError(error: Error) {
  // TODO: capture error
  console.error(error);
}

export function useErrorCapture(): UseErrorCaptureResult {
  return {
    captureError,
  };
}
