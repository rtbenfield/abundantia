import * as React from "react";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import useLoans from "../../hooks/useLoans";
import LoadingIndicator from "../LoadingIndicator";

const Home: React.FC = () => {
  useDocumentTitle("Home");
  const { isLoading } = useLoans();
  if (isLoading) {
    return <LoadingIndicator size="fill" />;
  } else {
    return null;
  }
};

export default Home;
