

import React from "react";
import ButtonList from "./ButtonList";
import VideoContainer from "./VideoContainer";

const MainContainer = () => {
  return (
    <div className="p-4">
      <ButtonList />
      <VideoContainer className = "mx-auto"/>
    </div>
  );
};

export default MainContainer;