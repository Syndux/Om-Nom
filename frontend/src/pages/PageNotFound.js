import React from "react";

const PageNotFound = () => {
  return (
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex h-[calc(100dvh-100px)] w-full flex-col items-center justify-center overflow-x-hidden overflow-y-scroll rounded-xl bg-main-bg dark:bg-main-dark-bg">
          <p className="m-4 text-xl font-bold">Page not found :(</p>
        <img
          src="https://media.tenor.com/YJFYm5-uHwMAAAAC/jaw-dropped-om-nom.gif"
          alt="OmNom jaw drop"
          width="100dvh"
        />
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
