"use client";
import React from "react";

const layout = (props) => {
  console.log(props);
  return (
    <>
      {/* {props.teams}
      {props.analytics} */}

      {props.children}
    </>
  );
};

export default layout;
