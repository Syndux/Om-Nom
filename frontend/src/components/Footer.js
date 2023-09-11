import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="pt-2 dark:bg-main-dark-bg">
      <p className="mx-5 text-sm text-gray-700 dark:text-gray-200 pb-1">
        <Link to="/about">About The Dev</Link>
      </p>
      <hr />
      <p className="mx-5 pb-5 pt-1 text-sm text-gray-600 dark:text-gray-200">
        © 2023 Huey Nguyen. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
