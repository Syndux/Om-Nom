import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { FaBars } from "react-icons/fa6";
import { AiOutlineSearch } from "react-icons/ai";
import { FaCartShopping } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io5";
import { BsSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";

import { GroceryList, Notification, UserProfile } from ".";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const {
    isClicked,
    screenSize,
    setScreenSize,
    sidebarOpen,
    setSidebarOpen,
    currentMode,
    handleClick,
    setMode,
  } = useAppContext();

  const buttonClasses =
    "text-secondary-dark-bg dark:text-light-gray dark:hover:text-secondary-dark-bg relative rounded-lg p-1.5 text-xl transition-transform duration-300 hover:scale-110 hover:bg-light-gray";

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 768) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true);
    }
  }, [screenSize]);

  return (
    <div className="relative mx-2 flex justify-between p-2">
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className={buttonClasses}
          style={{ visibility: sidebarOpen ? "hidden" : "visible" }}
        >
          <FaBars />
        </button>
        <button type="button" onClick={() => {}} className={buttonClasses}>
          <AiOutlineSearch />
        </button>
      </div>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => handleClick("groceryList")}
          className={buttonClasses}
        >
          <FaCartShopping />
        </button>
        <button
          type="button"
          onClick={() => handleClick("notification")}
          className={buttonClasses}
        >
          <IoNotifications />
        </button>
        {currentMode === "Light" ? (
          <button
            type="button"
            onClick={() => setMode("Dark")}
            value="Dark"
            className={buttonClasses}
          >
            <FaMoon />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setMode("Light")}
            value="Light"
            className={buttonClasses}
          >
            <BsSunFill />
          </button>
        )}
        <div
          className="text-secondary-dark-bg dark:text-light-gray dark:hover:text-secondary-dark-bg relative flex items-center gap-1 rounded-lg px-1.5 transition-transform duration-200 hover:scale-105 hover:bg-light-gray"
          onClick={() => handleClick("userProfile")}
        >
          {sessionUser ? (
            <div className="flex items-center gap-2">
              <img // DEVNOTE - All users should have imgUrl apart from seeded
                src={sessionUser.imgUrl ? sessionUser.imgUrl : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"}
                alt="user-profile"
                className="h-5 rounded-full"
              />
              <p>Hi, {`${sessionUser.username}`}</p>
              <FaAngleDown />
            </div>
          ) : (
            <p className="font-bold">Login/Signup</p>
          )}
        </div>
        {isClicked.groceryList && (<GroceryList />)}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile user={sessionUser} />)}
      </div>
    </div>
  );
};

export default Navbar;
