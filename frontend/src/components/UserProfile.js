import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { OpenModalButton } from ".";
import { LoginFormModal, SignupFormModal } from "../pages";
import * as sessionActions from "../store/session";

const UserProfile = ({ user }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push("/");
  };

  return (
    <>
      {user ? (
        <div>
          <button className="" onClick={logout}>
            Log Out
          </button>
        </div>
      ) : (
        <div>
          <OpenModalButton
            modalComponent={<LoginFormModal />}
            buttonText="Login"
          />
          <OpenModalButton
            modalComponent={<SignupFormModal />}
            buttonText="Signup"
          />
        </div>
      )}
    </>
  );
};

export default UserProfile;
