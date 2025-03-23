import React, { useEffect } from "react";
import { useLoading } from "../../contexts/LoadingContext";
import Loader from "../ui/Loader";

const LoaderWrapper = ({ children }) => {
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }
  return <>{children}</>;
};

export default LoaderWrapper;
