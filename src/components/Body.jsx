

import React from "react";
import { Outlet } from "react-router";
import Sidebar from "./Sidebar";
import MainContainer from "./MainContainer";

const Body = () => {
  
  return (
    
    <div className="flex ">
      <Sidebar />
      
      {/* <Outlet /> */}
      <MainContainer />
      
    </div>
  );
};

export default Body;