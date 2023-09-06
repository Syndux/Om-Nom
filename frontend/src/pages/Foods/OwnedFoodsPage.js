import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadAllFoods } from "../../store/foods";

const OwnedFoodsPage = () => {
  const dispatch = useDispatch();
  const foods = useSelector((state) => state.foods);
  const [loaded, setLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(loadAllFoods());
      setLoaded(true);
    })();
  }, [dispatch]);

  return (
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex h-screen w-full flex-col rounded-xl bg-main-bg dark:bg-main-dark-bg">
          {sessionUser ? (
            loaded && (
              <>
                <p className="m-4 text-xl font-bold">All owned foods</p>
                {foods
                  .filter((food) => food.creatorId === sessionUser.id)
                  .map((food) => (
                    <div className="px-10 border-b">
                      <p>{food.name}</p>
                      <p>{food.cuisine}</p>
                    </div>
                  ))}
              </>
            )
          ) : (
            <p className="m-4 text-xl font-bold">
              Must be logged-in to view this page.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnedFoodsPage;
