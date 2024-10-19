import React, { useState } from "react";
import Drawer from "../components/Drawer";
import "../styles/styles.scss";

const ContentScriptComponent: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="App">
      <button className="blur-button" onClick={toggleDrawer}></button>
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
    </div>
  );
};

export default ContentScriptComponent;
