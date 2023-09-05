import React from "react";

const FavoriteFoodsPage = () => {
  return (
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex h-screen w-full flex-col items-center justify-center rounded-xl bg-main-bg dark:bg-main-dark-bg">
          <p className="m-4 text-xl font-bold">
            Your favorite foods all in one place!
          </p>
          <p className="text-lg font-bold">Coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default FavoriteFoodsPage;
