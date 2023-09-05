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

import { OpenModalButton } from ".";
import { LoginFormModal } from "../pages";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const { sidebarOpen, setSidebarOpen, handleClick, currentMode, setMode } =
    useAppContext();

  const buttonClasses =
    "text-secondary-dark-bg dark:text-light-gray dark:hover:text-secondary-dark-bg relative rounded-lg p-1.5 text-xl transition-transform duration-300 hover:scale-110 hover:bg-light-gray";

  return (
    <div className="relative mx-2 flex justify-between p-3 pt-5">
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
              <img
                src={sessionUser.imgUrl}
                alt="user-profile"
                className="h-5 rounded-full"
              />
              <p>Hi, {`${sessionUser.username}`}</p>
              <FaAngleDown />
            </div>
          ) : (
            <OpenModalButton
              modalComponent={<LoginFormModal />}
              buttonText="Login/Signup"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
