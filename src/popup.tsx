import React from "react";
import ReactDOM from "react-dom/client";
import ChatBox from "./components/ChatBox";

function Popup() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "400px",
        width: "300px",
      }}
    >
      <ChatBox />
    </div>
  );
}
const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <Popup />
    </React.StrictMode>
  );
}
