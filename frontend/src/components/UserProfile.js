import React from "react";
import { OpenModalButton } from ".";
import { LoginFormModal, SignupFormModal } from "../pages";

const UserProfile = () => {
  return (
    <div>
      <OpenModalButton modalComponent={<LoginFormModal />} buttonText="Login" />
      <OpenModalButton modalComponent={<SignupFormModal />} buttonText="Signup" />
    </div>
  );
};

export default UserProfile;
