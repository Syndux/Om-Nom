import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

import * as sessionActions from "../../store/session";

const SignUpForm = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [formDisable, setFormDisable] = useState(true);
  const [serverErrors, setServerErrors] = useState([]);

  useEffect(() => {
    if (
      email &&
      username &&
      firstName &&
      lastName &&
      password &&
      confirmPassword
    ) {
      setFormDisable(false);
    } else {
      setFormDisable(true);
    }
  }, [email, username, firstName, lastName, password, confirmPassword]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        }),
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setServerErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <div className="">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="">
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {errors.email && <p className="">{errors.email}</p>}
        <div className="">
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {errors.username && <p className="">{errors.username}</p>}
        <div className="">
          <input
            type="text"
            id="firstName"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        {errors.firstName && <p className="">{errors.firstName}</p>}
        <div className="">
          <input
            type="text"
            id="lastName"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        {errors.lastName && <p className="">{errors.lastName}</p>}
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
        {errors.password && <p className="">{errors.password}</p>}
        <div className="">
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {errors.confirmPassword && <p className="">{errors.confirmPassword}</p>}
        {serverErrors.length > 0 && (
          <ul className="">
            {serverErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        )}
        <button
          type="submit"
          className="disabled:opacity-50"
          disabled={formDisable}
        >
          Sign Up
        </button>
      </form>
      <div className="">alrdy have acc? login</div>
    </div>
  );
};

export default SignUpForm;
