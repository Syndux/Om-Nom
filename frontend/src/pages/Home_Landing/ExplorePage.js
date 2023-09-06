import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const Explore = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    if (!sessionUser) history.push("/");
  }, [sessionUser, history]);

  return (
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex h-[calc(100dvh-87px)] w-full flex-col items-center justify-center overflow-x-hidden overflow-y-scroll rounded-xl bg-main-bg dark:bg-main-dark-bg md:h-[calc(100dvh-72px)]">
          <p className="m-4 text-xl font-bold">Home for logged-in users</p>
        </div>
      </div>
    </div>
  );
};

export default Explore;
