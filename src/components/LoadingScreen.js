import React from "react";
import ReactLoading from "react-loading";
import classes from "./LoadingScreen.module.css";

const LoadingScreen = () => {
  return (
    <div className={classes.main}>
      <ReactLoading type="bubbles" color="white" height={200} width={100} />
    </div>
  );
};

export default LoadingScreen;
