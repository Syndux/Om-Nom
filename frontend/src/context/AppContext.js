import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

const initialState = {
  groceryList: false,
  notification: false,
  userProfile: false,
};

export const AppProvider = ({ children }) => {
  const [isClicked, setIsClicked] = useState(initialState);
  const [screenSize, setScreenSize] = useState(undefined);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentMode, setCurrentMode] = useState("Light");
  const [themeSettings, setThemeSettings] = useState(false);

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem("themeSetting", e.target.value);
  };

  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  return (
    <AppContext.Provider
      value={{
        isClicked,
        setIsClicked,
        screenSize,
        setScreenSize,
        sidebarOpen,
        setSidebarOpen,
        currentMode,
        setCurrentMode,
        themeSettings,
        setThemeSettings,
        setMode,
        handleClick,
        initialState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
