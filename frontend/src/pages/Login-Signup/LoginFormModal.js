import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import * as sessionActions from "../../store/session";
import { useModal } from "../../context/ModalContext";
import { useAppContext } from "../../context/AppContext";
import { OpenModalButton } from "../../components";

import OmNomDarkLogo from "../../assets/Logos/ONDark.png";
import OmNomLightLogo from "../../assets/Logos/ONLight.png";
import { SignupFormModal } from "..";

const initialFormData = {
  credential: "",
  password: "",
};

const LoginFormModal = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();
  const { currentMode } = useAppContext();
  const [formData, setFormData] = useState({ ...initialFormData });

  const validateLogin = () => {
    const errors = [];

    if (formData.credential.length < 4) {
      errors.push("Credentials need to be at least 4 characters.");
    }

    if (formData.password.length < 6) {
      errors.push("Password needs to be at least 6 characters.");
    }

    return errors;
  }

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginValErrors = validateLogin();
    const valErrors = [...loginValErrors];

    if (valErrors.length > 0) {
      setErrors(valErrors);
      return;
    }

    try {
      const result = await dispatch(sessionActions.login( formData ));

      if (result !== null) {
        setFormData({ ...initialFormData });
        setErrors([]);
        closeModal();
      } 
    } catch (error) {
      const res = await error.json();
      if (res.errors) {
        setErrors(Object.values(res.errors));
      } else if (res.message) {
        setErrors([res.message]);
      }
    }
  };

  const loginDemo = (e) => {
    e.preventDefault();
    closeModal();
    return dispatch(
      sessionActions.login({
        credential: "demo@user.io",
        password: "password",
      }),
    );
  };

  const OmNomLogo = currentMode === "Dark" ? OmNomLightLogo : OmNomDarkLogo;

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:px-8">
      <div className="mx-auto w-full">
        <img className="mx-auto h-40 w-auto" src={OmNomLogo} alt="Om Nom" />
        <h2 className="mt-8 text-center text-2xl font-bold leading-8 text-gray-700 dark:text-gray-200">
          Sign in
        </h2>
        <div className="mt-3 flex whitespace-pre-wrap text-center justify-center items-center text-slate-200">
          {errors.length > 0 && (
            <ul>
              {errors.map((error, index) => (
                <li className="text-red-700 dark:text-red-300" key={index}>{error}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="mt-6 w-full">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="">
            <input
              type="text"
              id="credential"
              placeholder="Username or Email"
              value={formData.credential}
              onChange={(e) =>
                setFormData({ ...formData, credential: e.target.value })
              }
              className="w-full rounded-lg bg-gray-300 p-1.5 dark:bg-light-gray placeholder:text-main-dark-bg"
              required
            />
          </div>
          <div className="">
            <input
              type="password"
              id="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              required
              className="w-full rounded-lg bg-gray-300 p-1.5 dark:bg-light-gray placeholder:text-main-dark-bg"
            />
          </div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white"
          >
            Sign In
          </button>
        </form>
      </div>
      <div
        className="mt-3 flex w-full justify-center rounded-md bg-green-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white"
        onClick={loginDemo}
      >
        Demo User
      </div>
      <div className="mt-4 text-gray-600 dark:text-gray-300">
        Don't have an account?{" "}
        <OpenModalButton onClick={closeModal} buttonText="Sign up." modalComponent={<SignupFormModal />}/>
      </div>
    </div>
  );
};

export default LoginFormModal;
