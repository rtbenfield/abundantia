import { withSentryRouting } from "@sentry/react";
import { Route as ReactRouterRoute } from "react-router-dom";
export * from "react-router-dom";
// @ts-ignore type mismatch exists between RouteProps
export const Route = withSentryRouting(ReactRouterRoute);
