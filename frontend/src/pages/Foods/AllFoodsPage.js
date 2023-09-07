import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiOutlinePlus } from "react-icons/ai";

import { OpenModalButton } from "../../components";
import { loadAllFoods } from "../../store/foods";
import { FoodFormPage } from "../";

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
    // DEVNOTE - make component for the same divs across pages?
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex h-[calc(100dvh-72px)] w-full flex-col overflow-x-hidden overflow-y-scroll rounded-xl bg-main-bg dark:bg-main-dark-bg">
          {loaded && (
            <>
              <div className="m-4 flex items-center justify-between text-xl font-bold">
                <p>Browse all available foods</p>

                <OpenModalButton
                  modalComponent={<FoodFormPage />}
                  buttonText={<AiOutlinePlus />}
                />
              </div>
              {foods.map((food) => (
                <div className="border-t px-10 py-3 duration-100 ease-in hover:scale-[1.01] hover:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:hover:shadow-[rgba(205,_205,_150,_0.15)_0px_2px_5px_0px,_rgba(255,_255,_255,_0.3)_0px_1px_1px_0px]">
                  <p className="text-lg">{food.name}</p>
                  <p className="text-sm opacity-60">{food.cuisine}</p>
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
