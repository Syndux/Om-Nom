import React from "react";
import { Link, NavLink } from "react-router-dom";

import { FaXmark } from "react-icons/fa6";
import { FaHouse } from "react-icons/fa6";
import { MdMenuBook } from "react-icons/md";
import { PiBowlFoodFill } from "react-icons/pi";
import { AiFillHeart } from "react-icons/ai";
import { FaBookmark } from "react-icons/fa6";
import { FaCarrot } from "react-icons/fa6";
import { FaAppleWhole } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";

import OmNomDarkLogo from "../assets/Logos/ONDark.png";
import OmNomLightLogo from "../assets/Logos/ONLight.png";

import { useAppContext } from "../context/AppContext";

const sidebarItems = [
  {
    text: "Home",
    icon: <FaHouse />,
    link: "home",
  },
  {
    text: "Foods",
    icon: null,
  },
  {
    text: "All Foods",
    icon: <MdMenuBook />,
    link: "foods",
  },
  {
    text: "Owned Foods",
    icon: <PiBowlFoodFill />,
    link: "foods/current",
  },
  {
    text: "Liked Foods",
    icon: <AiFillHeart />,
    link: "foods/liked",
  },
  {
    text: "Cuisines",
    icon: <FaBookmark />,
    link: "foods/cuisines",
  },
  {
    text: "Ingredients",
    icon: null,
  },
  {
    text: "All Ingredients",
    icon: <FaCarrot />,
    link: "ingredients",
  },
  {
    text: "Owned Ingredients",
    icon: <FaAppleWhole />,
    link: "ingredients/current"
  },
  {
    text: "Food Planning",
    icon: null,
  },
  {
    text: "Food Schedule",
    icon: <FaCalendarDays />,
    link: "food-plan",
  },
];

const activePage =
  "flex items-center gap-4 pl-3 pt-2 pb-2 rounded-lg text-md text-secondary-dark-bg dark:text-light-gray bg-light-gray dark:bg-secondary-dark-bg m-2";
const inactivePage =
  "flex items-center gap-4 pl-3 pt-2 pb-2 rounded-lg text-md text-secondary-dark-bg dark:text-light-gray dark:hover:bg-secondary-dark-bg hover:bg-light-gray m-2 ease-in duration-100 hover:scale-105";

const Sidebar = () => {
  const { sidebarOpen, setSidebarOpen, currentMode, screenSize } =
    useAppContext();

  const handleCloseSidebar = () => {
    if (sidebarOpen && screenSize <= 768) {
      setSidebarOpen(false);
    }
  };

  const logoSrc = currentMode === "Dark" ? OmNomLightLogo : OmNomDarkLogo;

  return (
    <div className="mx-2 h-screen overflow-auto md:overflow-hidden">
      {sidebarOpen && (
        <>
          <div className="relative flex items-center justify-center">
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className=" text-secondary-dark-bg dark:text-light-gray absolute left-3 top-3 rounded-full p-1 text-xl transition-transform duration-300 hover:scale-110 hover:bg-light-gray dark:hover:bg-secondary-dark-bg"
            >
              <FaXmark />
            </button>
            <Link to="/" onClick={handleCloseSidebar} className="mt-5">
              <img src={logoSrc} alt="Om Nom logo" className="w-32" />
            </Link>
          </div>
          <div className="mt-8">
            {sidebarItems.map(({ text, icon, link }) => {
              if (!icon) {
                return (
                  <div key={text}>
                    <p className="text-secondary-dark-bg dark:text-light-gray m-3 ml-2 mt-4 font-bold">
                      {text}
                    </p>
                  </div>
                );
              }

              return (
                <NavLink
                  exact
                  to={`/${link}`}
                  key={text}
                  onClick={handleCloseSidebar}
                  // style={isActive => ({
                  //   backgroundColor: isActive ? "#2E3238" : "",
                  // })}
                  className={(isActive) =>
                    isActive ? activePage : inactivePage
                  }
                >
                  {icon}
                  <span>{text}</span>
                </NavLink>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
