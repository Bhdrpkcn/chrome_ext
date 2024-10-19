import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Button from "../components/Button";
import ChatBox from "../components/ChatBox";

const Drawer = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        right: isOpen ? 0 : "-300px",
        width: "300px",
        height: "100%",
        backgroundColor: "#fff",
        boxShadow: "rgba(0, 0, 0, 0.2) 0px 0px 10px",
        transition: "right 0.3s ease",
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
      }}
    >
      <header>
        <h2>Drawer Header</h2>
        <Button onClick={onClose}>Close</Button>
      </header>
      <div style={{ marginTop: "1rem" }}>
        <ChatBox />
      </div>
    </div>
  );
};

function ContentScript() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="App">
      <header
        className="App-header"
        style={{ position: "fixed", top: 50, right: 0, zIndex: 9999 }}
      >
        <Button onClick={toggleDrawer} style={{ padding: "10px 20px" }}>
          {isDrawerOpen ? "Close Extension" : "Open Extension"}
        </Button>
      </header>
      <Drawer isOpen={isDrawerOpen} onClose={toggleDrawer} />
    </div>
  );
}

const index = document.createElement("div");
index.id = "content-script";
document.body.appendChild(index);

ReactDOM.createRoot(index).render(
  <React.StrictMode>
    <ContentScript />
  </React.StrictMode>
);
