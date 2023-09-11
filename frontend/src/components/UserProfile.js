import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import * as sessionActions from "../store/session";
import { OpenModalButton } from ".";
import { LoginFormModal, SignupFormModal } from "../pages";

const UserProfile = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const ulRef = useRef();
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    closeMenu();
    history.push("/");
  };

  const ulClassName =
    "absolute top-10 right-0 bg:bg-main-bg whitespace-nowrap list-none w-auto" +
    (showMenu ? "" : " hidden");
  const linkClasses =
    "flex m-1 font-semibold text-base dark:hover:bg-slate-500 rounded-lg pl-2";
  return (
    <div className="z-100 relative rounded-lg p-1.5 text-xl text-secondary-dark-bg hover:bg-light-gray dark:text-light-gray dark:hover:bg-secondary-dark-bg dark:hover:text-light-gray">
      <button
        className="flex flex-row items-center justify-center gap-2"
        onClick={openMenu}
      >
        <FaUserCircle />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <div className="mx-5 bg-slate-200 px-4 py-3 text-lg text-gray-700 shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:bg-secondary-dark-bg dark:text-slate-300 dark:shadow-[0_3px_10px_rgb(255,255,255,0.1)]">
            <li className="font-bold">Hello, {user.username}</li>
            <li className="font-light">{user.email}</li>
            <hr />
            <li>
              <Link to="/profile" className={linkClasses} onClick={closeMenu}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/following" className={linkClasses} onClick={closeMenu}>
                Following
              </Link>
            </li>
            <li>
              <Link to="/reviews" className={linkClasses} onClick={closeMenu}>
                Reviews
              </Link>
            </li>
            <li>
              <Link to="/messages" className={linkClasses} onClick={closeMenu}>
                Messages
              </Link>
            </li>
            <hr />
            <div className="flex justify-center">
              <button
                className="mt-2 rounded-xl bg-red-500 px-2 text-gray-200"
                onClick={logout}
              >
                Log Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-start mx-5 bg-slate-200 px-4 py-3 text-base text-gray-700 shadow-[0_3px_10px_rgb(0,0,0,0.2)] dark:bg-secondary-dark-bg dark:text-slate-300 dark:shadow-[0_3px_10px_rgb(255,255,255,0.1)]">
            <OpenModalButton
              modalComponent={<LoginFormModal />}
              onClick={closeMenu}
              buttonText="Login"
              className="font-bold py-1 transition-transform duration-300 hover:scale-110"
            />

            <OpenModalButton
              modalComponent={<SignupFormModal />}
              onClick={closeMenu}
              buttonText="Signup"
              className="font-bold py-1 transition-transform duration-300 hover:scale-110"
            />
          </div>
        )}
      </ul>
    </div>
  );
};

export default UserProfile;
