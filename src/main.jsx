import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthContextProvider } from "./context/authContext/AuthContext.jsx";
import { UserContextProvider } from "./context/userContext/UserContext.jsx";
import { AppContextProvider } from "./context/appContext/AppContext.jsx";
import { RestaurantContextProvider } from "./context/restaurantContext/RestaurantContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <AppContextProvider>
          <RestaurantContextProvider>
            <App />
          </RestaurantContextProvider>
        </AppContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
