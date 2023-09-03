import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Explore = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  if (!sessionUser) history.push("/");

  return <div>Home (Discove/Explore page)</div>;
};

export default Explore;
