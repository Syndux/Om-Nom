import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="pt-1 dark:bg-main-dark-bg">
      <p className="mx-5 text-sm text-gray-700 dark:text-gray-200 pb-1">
      <Link to="/about">About The Dev</Link>
        © 2023 Huey Nguyen. All rights reserved.
      </p>

    </div>
  );
};

export default Footer;
