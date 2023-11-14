import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { NextUIProvider } from "@nextui-org/react";
import { TaskProvider } from "./context/task.context.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <NextUIProvider>
    <TaskProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </TaskProvider>
  </NextUIProvider>
);
