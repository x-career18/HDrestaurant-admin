import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <AppContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </AppContext.Provider>
  );
};
