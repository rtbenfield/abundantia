import * as React from "react";
import ReactGA from "react-ga";
import { RouteComponentProps, withRouter } from "react-router-dom";

const RouteAnalytics: React.FC<RouteComponentProps> = ({ location }) => {
  React.useEffect(() => {
    ReactGA.pageview(location.pathname + location.search);
  }, [location.pathname, location.search]);

  // Don't actually render anything
  return null;
};

export default withRouter(RouteAnalytics);
