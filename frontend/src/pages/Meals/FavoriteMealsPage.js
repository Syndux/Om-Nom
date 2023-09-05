import React from "react";

const FavoriteMealsPage = () => {
  return (
    <div className="my-2">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="flex flex-col justify-center items-center dark:text-light-gray text-main-dark-bg m-3 h-screen w-full rounded-xl bg-light-gray dark:bg-secondary-dark-bg">
          <p className="m-4 text-xl font-bold">Your favorite meals all in one place!</p>
          <p className="text-lg font-bold">Coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default FavoriteMealsPage;
