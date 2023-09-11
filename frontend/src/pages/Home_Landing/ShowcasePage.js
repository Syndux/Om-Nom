import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { useAppContext } from "../../context/AppContext";
import homeLight from "../../assets/home_light.png";
import homeDark from "../../assets/home_dark.png";

const ShowcasePage = () => {
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const { currentMode } = useAppContext();

  useEffect(() => {
    if (sessionUser) history.push("/home");
  }, [sessionUser, history]);

  const homeSrc = currentMode === "Dark" ? homeDark : homeLight;

  return (
    <div className="bg-light-gray text-secondary-dark-bg dark:bg-secondary-dark-bg dark:text-light-gray">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex h-[calc(100dvh-71px)] w-full flex-col items-center overflow-hidden rounded-xl bg-main-bg text-center dark:bg-main-dark-bg">
          <h2 className="mt-24 text-3xl font-bold tracking-tight text-main-dark-bg dark:text-main-bg sm:text-4xl">
            Streamline your dinner decision.
            <br />
            Effortless ingredient planning.
          </h2>
          <p className="mx-10 mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300 sm:mx-28">
            Let Om Nom help you bring your next food closer to you.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6 sm:gap-x-28 lg:justify-start">
            <a
              href="#"
              className="text-md rounded-md bg-blue-600 px-3.5 py-2.5 font-semibold text-gray-200 shadow-sm hover:bg-blue-500"
            >
              Get started
            </a>
            <a
              href="#"
              className="text-md font-semibold leading-6 text-black dark:text-white"
            >
              About the dev →
            </a>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img src={homeSrc} className="absolute -left-[30rem] w-[90rem] top-10 max-w-none rounded-md border shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:shadow-[rgba(233,_233,_224,_0.1)_0px_0px_16px]"/>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ShowcasePage;
