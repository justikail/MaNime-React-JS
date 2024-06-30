import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("manime")).render(
  <HelmetProvider>
    <App />
  </HelmetProvider>
);
