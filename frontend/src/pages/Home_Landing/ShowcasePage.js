import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Showcase = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user); // User logged in?

  useEffect(() => {
    if (!sessionUser) history.push("/");
  }, [sessionUser, history]);

  return (
    <div className="my-2">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="dark:text-light-gray text-main-dark-bg m-3 flex h-screen w-full flex-col items-center justify-center rounded-xl bg-light-gray dark:bg-secondary-dark-bg">
          <p className="m-4 text-xl font-bold">Showcase for all users</p>
        </div>
      </div>
    </div>
  );
};

export default Showcase;
