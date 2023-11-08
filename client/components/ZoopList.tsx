import React from "react";
import { Outlet } from "react-router-dom";

const ZoopsList = () => {
  return (
    <>
      <p>I am the Zoops List</p>
      
      <Outlet />
    </>

  );
};

export default ZoopsList;
