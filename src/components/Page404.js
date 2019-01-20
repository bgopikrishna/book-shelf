import React from "react";
import { Link } from "react-router-dom";

const Page404 = () => {
  return (
    <div style={{textAlign:"center"}}>
      <h3>I think you lost somewhere</h3>
      <p>
        Go To <Link to="/">Home Page</Link>
      </p>

      <p>This page maybe in undercontruction</p>
    </div>
  );
};

export default Page404;
