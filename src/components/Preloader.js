import React from "react";

const Preloader = () => {
  return <div style={preLoaderStyle}>Loading...</div>;
};

export default Preloader;

const preLoaderStyle = {
  display: "flex",
  alignItems: "center",
  height: "50vh",
  justifyContent: "center",
  width: "50vw",
  color: "inherit",
  fontSize: "64px",
  overflow: "hidden",
  margin: "auto"
};
