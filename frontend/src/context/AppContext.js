import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

// Navbar icon states
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

  const setMode = (mode) => {
    setCurrentMode(mode);
    localStorage.setItem("themeSetting", mode);
  };

  const handleClick = (clicked) =>
    setIsClicked((prevClicked) => ({
      ...initialState,
      [clicked]: !prevClicked[clicked],
    }));

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
        setMode,
        handleClick,
        initialState,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
