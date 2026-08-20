import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";
import "./pwa.css";
import "./refinement.css";
import "./immersive-swipe.css";

if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register(`${import.meta.env.BASE_URL}service-worker.js`, { scope: import.meta.env.BASE_URL }).then((registration) => registration.update()).catch(() => undefined);
  });
}

createRoot(document.getElementById("root")!).render(<App />);
