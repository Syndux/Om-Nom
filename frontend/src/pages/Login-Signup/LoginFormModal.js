import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import * as sessionActions from "../../store/session";
import { useModal } from "../../context/ModalContext";

function LoginFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formDisable, setFormDisable] = useState(true);
  const { closeModal } = useModal();

  useEffect(() => {
    if (credential.length >= 4 && password.length >= 6) {
      setFormDisable(false);
    } else {
      setFormDisable(true);
    }
  }, [credential, password]);

  if (sessionUser) return <Redirect to="/home" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    try {
      dispatch(sessionActions.login({ credential, password }));
      closeModal();
    } catch (res) {
      const data = await res.json();
      if (data.message) data.errors = { credential: data.message };
      if (data && data.errors) setErrors(data.errors);
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

  return (
    <div className="">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit} className="">
        {errors.credential && (
          <p className="">{errors.credential}</p>
        )}
        <div className="">
          <input
            type="text"
            id="credential"
            placeholder="Username or Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </div>
        <div className="">
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="disabled:opacity-50"
          disabled={formDisable}
        >
          Log In
        </button>
      </form>
      <div className="" onClick={loginDemo}>
        Demo User
      </div>
    </div>
  );
}

export default LoginFormModal;
