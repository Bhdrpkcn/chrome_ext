import React from "react";
import ReactDOM from "react-dom/client";

import ContentScriptComponent from "./ContentScriptComponent";

const contentScriptDiv = document.createElement("div");
contentScriptDiv.id = "content-script";
document.body.appendChild(contentScriptDiv);

ReactDOM.createRoot(contentScriptDiv).render(
  <React.StrictMode>
    <ContentScriptComponent />
  </React.StrictMode>
);
