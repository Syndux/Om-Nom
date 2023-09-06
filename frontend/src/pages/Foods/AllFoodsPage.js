import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadAllFoods } from "../../store/foods";

const AllFoodsPage = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.foods);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(loadAllFoods());
      setLoaded(true);
    })();
  }, [dispatch]);

  return (
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex w-full flex-col rounded-xl bg-main-bg dark:bg-main-dark-bg overflow-hidden overflow-y-scroll">
          {loaded && (
            <>
              <p className="m-4 text-xl font-bold">
                Browse all available foods
              </p>
              {foods.map((food) => (
                <div className="px-10 border-t">
                <p>{food.name}</p>
                <p>{food.cuisine}</p>
              </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllFoodsPage;
