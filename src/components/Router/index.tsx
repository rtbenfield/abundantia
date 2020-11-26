import * as Sentry from "@sentry/react";
import { Route as ReactRouterRoute } from "react-router-dom";
export * from "react-router-dom";
export const Route = Sentry.withSentryRouting(ReactRouterRoute);
