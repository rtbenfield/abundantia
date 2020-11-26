import { withSentryRouting } from "@sentry/react";
import { Route as ReactRouterRoute } from "react-router-dom";
export * from "react-router-dom";
export const Route = withSentryRouting(ReactRouterRoute);
