import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadAllFoods } from "../../store/foods";

const FoodCuisines = () => {
  const dispatch = useDispatch();
  const allFoods = useSelector((state) => Object.values(state.foods));
  const sessionUser = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadFoods = async () => {
      await dispatch(loadAllFoods());
      setLoaded(true);
    };

    loadFoods();
  }, [dispatch]);

  const cuisines = loaded
    ? [...new Set(allFoods.map((food) => food.cuisine).sort())]
    : [];

  return (
    <div className="m-3 flex h-[calc(100dvh-100px)] w-full flex-col overflow-x-hidden overflow-y-scroll rounded-xl bg-main-bg shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:bg-main-dark-bg dark:shadow-[rgba(233,_233,_224,_0.1)_0px_0px_16px]">
      {loaded && (
				<>
				<div className="m-4 flex items-center justify-between text-xl font-bold">
					<p>Food Cuisines</p>
				</div>
        {cuisines.map((cuisine) => (
          <div key={cuisine} className="flex justify-between border-t px-10 py-3 duration-100 ease-in hover:scale-[1.01] hover:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:hover:shadow-[rgba(205,_205,_150,_0.15)_0px_2px_5px_0px,_rgba(255,_255,_255,_0.3)_0px_1px_1px_0px]">
            <div className="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">
              {cuisine}
            </div>
          </div>
        ))}
				</>
			)}
    </div>
  );
};

export default FoodCuisines;
