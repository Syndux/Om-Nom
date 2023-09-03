import React from "react";
import { Link, NavLink } from "react-router-dom";

import { FaHouse } from "react-icons/fa6";
import { BiSolidFoodMenu } from "react-icons/bi";
import { PiBowlFood } from "react-icons/pi";
import { FaBookmark } from "react-icons/fa6";
import { FaCarrot } from "react-icons/fa6";
import { FaCalendarDays } from "react-icons/fa6";

import OmNomDarkLogo from "../assets/Logos/ONDark.png";

const sidebarItems = [
  {
    text: "Home",
    icon: <FaHouse />,
  },
  {
    text: "Meals",
    icon: null,
  },
  {
    text: "All Meals",
    icon: <BiSolidFoodMenu />,
  },
  {
    text: "Your Meals",
    icon: <PiBowlFood />,
  },
  {
    text: "Your Saved Meals",
    icon: <FaBookmark />,
  },
  {
    text: "Ingredients",
    icon: null,
  },
  {
    text: "All Ingredients",
    icon: <FaCarrot />,
  },
  {
    text: "Meal Planning",
    icon: null,
  },
  {
    text: "Meal Schedule",
    icon: <FaCalendarDays />,
  },
];

// Temp vars
const sidebarOpen = true;

const Sidebar = () => {
  return (
    <div className="ml-3 h-screen overflow-auto pb-10 md:overflow-hidden md:hover:overflow-auto">
      {sidebarOpen && (
        <>
          <div className="flex items-center justify-between">
            <Link to="/">
              <img src={OmNomDarkLogo} alt="Om Nom logo" />
            </Link>
          </div>
          <div className="mt-10">
            {sidebarItems.map(({ text, icon }) => {
              if (!icon) {
                return (
                  <div key={text}>
                    <p className="m-3 mt-4 uppercase text-gray-400 dark:text-gray-400">
                      {text}
                    </p>
                  </div>
                );
              }
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
