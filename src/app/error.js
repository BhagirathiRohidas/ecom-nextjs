"use client";
import { useEffect } from "react";

const Error = ({ error, reset }) => {
  useEffect(() => {
    console.log(error);
  }, [error]);
  return (
    <>
      <p>Something went wrong...</p>
    </>
  );
};

export default Error;
