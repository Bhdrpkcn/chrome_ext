import React, { useState } from "react";

import Drawer from "../components/Drawer";
import "../styles/style.scss";

const ContentScriptComponent: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div>
      <button
        className={`blur-button ${isDrawerOpen ? "open" : ""}`}
        onClick={toggleDrawer}
      >
        ↓
      </button>
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
    </div>
  );
};

export default ContentScriptComponent;
