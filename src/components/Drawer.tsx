import React from "react";

import "../styles/styles.scss";
import ChatBox from "./ChatBox";

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
          <h2>Chrome Extension App</h2>
        </header>
        <div className="chat-box-container">
          <ChatBox />
        </div>
      </div>
    </>
  );
};

export default Drawer;
