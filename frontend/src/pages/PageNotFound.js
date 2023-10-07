import React from "react";

const PageNotFound = () => {
  return (
    <div className="m-3 flex h-[calc(100dvh-100px)] w-full flex-col items-center justify-center overflow-x-hidden overflow-y-scroll rounded-xl bg-main-bg shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:bg-main-dark-bg dark:shadow-[rgba(233,_233,_224,_0.1)_0px_0px_16px]">
      <p className="m-4 text-xl font-bold">Page not found :(</p>
      <img
        src="https://media.tenor.com/YJFYm5-uHwMAAAAC/jaw-dropped-om-nom.gif"
        alt="OmNom jaw drop"
        width="100dvh"
      />
    </div>
  );
};

export default PageNotFound;
