import { withProfiler } from "@sentry/react";
import * as React from "react";

const Home: React.FC = () => {
  return <></>;
};

export default withProfiler(Home, { name: "Home" });
