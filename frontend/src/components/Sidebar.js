import React from "react";
import { Link, NavLink } from "react-router-dom";
import OmNomDarkLogo from "../assets/Logos/OmNomDark.png";

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
        </>
      )}
    </div>
  );
};

export default Sidebar;
