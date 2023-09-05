import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadAllFoods } from "../../store/foods";

const AllFoodsPage = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.foods);

  useEffect(() => {
    (async () => {
      await dispatch(loadAllFoods());
    })();
  }, [dispatch]);

  return (
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex h-screen w-full flex-col items-center justify-center rounded-xl bg-main-bg dark:bg-main-dark-bg">
          <p className="m-4 text-xl font-bold">Browse all available foods</p>
          {foods?.map((food) => (
            <p>{food?.name}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllFoodsPage;
