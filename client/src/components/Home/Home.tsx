import * as React from "react";
import useLoans from "../../hooks/useLoans";
import LoadingIndicator from "../LoadingIndicator";

const Home: React.FunctionComponent = () => {
  const { isLoading } = useLoans();
  if (isLoading) {
    return <LoadingIndicator size="fill" />;
  } else {
    return null;
  }
};

export default Home;
