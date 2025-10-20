

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { SocketProvider } from "./context/SocketContext";
import { LoteProvider } from "./context/LoteContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SocketProvider>
      <LoteProvider>
        <App />
      </LoteProvider>
    </SocketProvider>
  </React.StrictMode>
);
