import React from "react";
import "../styles/globals.css";

const MyApp: React.FunctionComponent<{ Component; pageProps }> = ({
  Component,
  pageProps,
}) => {
  return <Component {...pageProps} />;
};

export default MyApp;
