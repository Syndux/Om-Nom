import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Showcase = () => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user) // User logged in?

  if (sessionUser) history.push("/home");

  return (
    <div className="flex justify-center items-center h-full">
      Showcase / Landing Page
    </div>
  );
};

export default Showcase;
