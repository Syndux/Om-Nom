import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { FaBars } from "react-icons/fa6";
import { AiOutlineSearch } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa6";
import { IoNotifications } from "react-icons/io";
import { BsSunFill } from "react-icons/bs";
import { FaMoon } from "react-icons/fa6";
import { FaAngleDown } from "react-icons/fa6";

import { useAppContext } from "../context/AppContext";

const Navbar = () => {
  const sessionUser = useSelector((state) => state.session.user);
  const { sidebarOpen, setSidebarOpen } = useAppContext();

  return (
    <div className="relative mx-5 flex justify-between p-2">
      <button
        type="button"
        onClick={() => setSidebarOpen(true)}
        className={`text-secondary-dark-bg dark:text-light-gray text-l mt-4 transition-transform duration-300 hover:scale-110 ${
          sidebarOpen ? "md:hidden" : ""
        }`}
      >
        <FaBars />
      </button>
    </div>
  );
};

export default Navbar;
