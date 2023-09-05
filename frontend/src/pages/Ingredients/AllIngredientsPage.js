import React from "react";

const AllIngredientsPage = () => {
  return (
    <div className="my-2">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="dark:text-light-gray text-main-dark-bg m-3 flex h-screen w-full flex-col items-center justify-center rounded-xl bg-light-gray dark:bg-secondary-dark-bg">
          <p className="m-4 text-xl font-bold">
            View all available ingredients
          </p>
        </div>
      </div>
    </div>
  );
};

export default AllIngredientsPage;
