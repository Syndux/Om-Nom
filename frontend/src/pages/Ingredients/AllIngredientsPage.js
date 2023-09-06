import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loadAllIngredients } from "../../store/ingredients";

const AllIngredientsPage = () => {
  const dispatch = useDispatch();
  const ingredients = useSelector((state) => state.ingredients);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(loadAllIngredients());
      setLoaded(true);
    })();
  }, [dispatch]);

  return (
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex h-screen w-full flex-col items-center rounded-xl bg-main-bg dark:bg-main-dark-bg">
          {loaded && (
            <>
              <p className="m-4 text-xl font-bold">
                View all available ingredients
              </p>
              {ingredients.map((ingredient) => (
                <p>{ingredient.name}</p>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllIngredientsPage;
