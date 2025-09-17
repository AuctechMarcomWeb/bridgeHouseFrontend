// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { ProfileProvider } from "./context/ProfileContext.jsx";
import { PropertyProvider } from "./context/propertyContext.jsx";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>
    <ProfileProvider>
      <PropertyProvider>
        <App />
      </PropertyProvider>
    </ProfileProvider>
  </>
  // {/* </StrictMode> */}
);
