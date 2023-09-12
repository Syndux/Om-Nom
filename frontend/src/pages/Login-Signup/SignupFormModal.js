import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import * as sessionActions from "../../store/session";
import { useModal } from "../../context/ModalContext";
import { useAppContext } from "../../context/AppContext";
import { OpenModalButton } from "../../components";

import OmNomDarkLogo from "../../assets/Logos/ONDark.png";
import OmNomLightLogo from "../../assets/Logos/ONLight.png";

const initialFormData = {
  email: "",
  username: "",
  firstName: "",
  lastName: "",
  password: "",
  confirmPassword: "",
};

const SignupForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { closeModal } = useModal();
  const { currentMode } = useAppContext();
  const [formData, setFormData] = useState({ ...initialFormData });
  const [errors, setErrors] = useState({});

  const validateSignup = () => {
    const errors = {};

    if (!formData.email || !formData.email.includes("@")) {
      errors.email = "Please enter a valid email address.";
    }

    if (formData.username.length < 4) {
      errors.username = "Username must be at least 4 characters long.";
    }

    if (formData.firstName.length < 2) {
      errors.firstName = "First name must be at least 2 characters long.";
    }

    if (formData.lastName.length < 2) {
      errors.lastName = "Last name must be at least 2 characters long.";
    }

    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match.";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const signupErrors = validateSignup();

    if (Object.keys(signupErrors).length > 0) {
      setErrors(signupErrors);
      return;
    }

    try {
      await dispatch(sessionActions.signup(formData));
      closeModal();
    } catch (error) {
      const res = await error.json();
      if (res.errors) {
        setErrors(res.errors);
      }
    }
  };

  if (sessionUser) return <Redirect to="/home" />;

  const OmNomLogo = currentMode === "Dark" ? OmNomLightLogo : OmNomDarkLogo;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      <div className="mx-auto w-full">
        <img className="mx-auto h-40 w-auto" src={OmNomLogo} alt="Om Nom" />
        <h2 className="mt-8 text-center text-2xl font-bold leading-8 text-gray-700 dark:text-gray-200">
          Sign Up
        </h2>
        <div className="mt-3 flex items-center justify-center whitespace-pre-wrap text-center text-slate-200">
          {errors.length > 0 && (
            <ul>
              {Object.values(errors).map((error, index) => (
                <li key={index} className="text-red-600">
                  {error}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="mt-6 w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-lg bg-secondary-dark-bg p-1.5 dark:bg-light-gray"
              required
            />
            {errors.email && <p className="text-red-600">{errors.email}</p>}
          </div>
          <div>
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full rounded-lg bg-secondary-dark-bg p-1.5 dark:bg-light-gray"
              required
            />
            {errors.username && (
              <p className="text-red-600">{errors.username}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value })
              }
              className="w-full rounded-lg bg-secondary-dark-bg p-1.5 dark:bg-light-gray"
              required
            />
            {errors.firstName && (
              <p className="text-red-600">{errors.firstName}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value })
              }
              className="w-full rounded-lg bg-secondary-dark-bg p-1.5 dark:bg-light-gray"
              required
            />
            {errors.lastName && (
              <p className="text-red-600">{errors.lastName}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full rounded-lg bg-secondary-dark-bg p-1.5 dark:bg-light-gray"
              required
            />
            {errors.password && (
              <p className="text-red-600">{errors.password}</p>
            )}
          </div>
          <div>
            <input
              type="password"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={(e) =>
                setFormData({ ...formData, confirmPassword: e.target.value })
              }
              className="w-full rounded-lg bg-secondary-dark-bg p-1.5 dark:bg-light-gray"
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-600">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white"
          >
            Sign Up
          </button>
          <div className="mt-4 text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <OpenModalButton onClick={closeModal} buttonText="Go back to login." />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
