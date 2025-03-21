import React, { useEffect } from "react";
import { useLoading } from "../../contexts/LoadingContext";
import Loader from "../ui/Loader";

const LoaderWrapper = ({ children }) => {
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    });

    return () => clearTimeout(timer);
  }, [setIsLoading]);

  if (isLoading) {
    return <Loader />;
  }
  return <>{children}</>;
};

export default LoaderWrapper;
