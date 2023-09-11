import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const ShowcasePage = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user); // User logged in?

  useEffect(() => {
    if (sessionUser) history.push("/home");
  }, [sessionUser, history]);

  return (
    <div className="bg-light-gray text-secondary-dark-bg dark:bg-secondary-dark-bg dark:text-light-gray">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex h-[calc(100dvh-71px)] w-full items-center flex-col overflow-x-hidden overflow-y-scroll rounded-xl bg-main-bg text-center dark:bg-main-dark-bg">
          <h2 className="mt-32 text-3xl font-bold tracking-tight text-main-dark-bg sm:text-4xl dark:text-main-bg">
            Streamline your dinner decision.
            <br />
            Effortless ingredient planning.
          </h2>
          <p className="mx-10 sm:mx-28 mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
            Let Om Nom help you bring your next food closer to you.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 sm:gap-x-28 lg:justify-start">
            <a
              href="#"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-md font-semibold text-gray-200 shadow-sm hover:bg-blue-500"
            >
              Get started
            </a>
            <a href="#" className="text-md font-semibold leading-6 text-black dark:text-white">
              Learn more →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShowcasePage;
