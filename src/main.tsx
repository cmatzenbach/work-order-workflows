import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App.tsx";
import { ReactFlowProvider } from "@xyflow/react";

const root = document.getElementById("root");
if (!root) {
  throw new Error("root element not found");
}
createRoot(root).render(
  <StrictMode>
    <ReactFlowProvider>
      <App />
    </ReactFlowProvider>
  </StrictMode>,
);
