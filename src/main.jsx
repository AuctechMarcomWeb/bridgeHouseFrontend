import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Toaster } from "react-hot-toast";
import { ProfileProvider } from "./context/ProfileContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
        <ProfileProvider>
    <App />
    
        </ProfileProvider>
        
    <Toaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        style: {
          marginTop: "60px", 
        },
      }}
    />

  </StrictMode>
);
