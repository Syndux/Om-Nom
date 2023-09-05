import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Showcase = () => {
  const history = useHistory();
  const sessionUser = useSelector(state => state.session.user) // User logged in?

  useEffect(() => {
    if (!sessionUser) history.push("/");
  }, [sessionUser, history]);

  return (
    <div className="flex justify-center items-center h-full">
      Showcase / Landing Page
    </div>
  );
};

export default Showcase;
