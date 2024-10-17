import React, { useState } from "react";
import ReactDOM from "react-dom/client";

import "./App.css";
import logo from "./assets/react.svg";
import Button from "./components/Button";

function Popup() {
  const [count, setCount] = useState(0);

  return (
    <div className="App" style={{ height: 300, width: 300 }}>
      <header className="App-header">
        <img
          src={chrome.runtime.getURL(logo)}
          className="App-logo"
          alt="logo"
        />
        <p>Hello Vite + React!</p>
        <p>
          <Button type="button" onClick={() => setCount((count) => count + 1)}>
            count is: {count}
          </Button>
        </p>
        <p>
          Edit <code>App.tsx</code> and save to test HMR updates.
        </p>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {" | "}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Popup />
  </React.StrictMode>
);
