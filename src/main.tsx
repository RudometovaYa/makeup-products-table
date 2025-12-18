import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
/* import "./index.css"; */
import App from "../src/App";
import { Toaster } from "react-hot-toast";
import "antd/dist/reset.css";

import "modern-normalize";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Toaster position="top-center" reverseOrder={false} />
  </StrictMode>
);
