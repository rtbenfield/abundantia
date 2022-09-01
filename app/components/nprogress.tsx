import {
  NavigationProgress,
  resetNavigationProgress,
  startNavigationProgress,
} from "@mantine/nprogress";
import { useTransition } from "@remix-run/react";
import { useEffect } from "react";

export function RemixNavigationProgress() {
  const { state } = useTransition();
  useEffect(() => {
    switch (state) {
      case "idle":
        resetNavigationProgress();
        break;
      case "loading":
      case "submitting":
        startNavigationProgress();
        break;
    }
  }, [state]);
  return <NavigationProgress />;
}
