import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Explore = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!sessionUser) history.push("/");
  }, [sessionUser, history]);


  return <div>Home (Discove/Explore page)</div>;
};

export default Explore;
