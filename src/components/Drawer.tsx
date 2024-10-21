import React from "react";

import ChatBox from "./ChatBox";
import "../styles/style.scss";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {isOpen && <div className="dark-overlay" onClick={onClose}></div>}
      <div className={`drawer ${isOpen ? "open" : ""}`}>
        <header className="header">
          <h2>What do you want to do ?</h2>
        </header>
        <ChatBox />
      </div>
    </>
  );
};

export default Drawer;
