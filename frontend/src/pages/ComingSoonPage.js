import React from "react";

const ComingSoon = () => {
  return (
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
      <div className="justify-center items-center m-3 flex h-[calc(100vh-73px)] w-full flex-col overflow-y-scroll rounded-xl bg-main-bg dark:bg-main-dark-bg">
          <p className="m-4 text-xl font-bold">Coming soon!</p>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
