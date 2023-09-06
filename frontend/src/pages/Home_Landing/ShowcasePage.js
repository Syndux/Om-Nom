import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Showcase = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user); // User logged in?

  useEffect(() => {
    if (sessionUser) history.push("/home");
  }, [sessionUser, history]);

  return (
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex h-[calc(100dvh-72px)] w-full flex-col items-center justify-center overflow-x-hidden overflow-y-scroll rounded-xl bg-main-bg dark:bg-main-dark-bg">
          <p className="m-4 text-xl font-bold">Showcase for all users</p>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
