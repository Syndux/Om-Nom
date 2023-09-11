import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { loadAllIngredients } from "../../store/ingredients";

const AllIngredientsPage = () => {
  const dispatch = useDispatch();

  const allIngredients = useSelector((state) => Object.values(state.ingredients));
  const ingredients = allIngredients.sort((a, b) => a.name.localeCompare(b.name));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(loadAllIngredients());
    })();
    setLoaded(true);
  }, [dispatch]);

  return (
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex h-[calc(100dvh-71px)] w-full flex-col overflow-x-hidden overflow-y-scroll rounded-xl bg-main-bg dark:bg-main-dark-bg">
          {loaded && (
            <>
              <div className="m-4 flex items-center justify-between text-xl font-bold">
                <p>All Ingredients</p>
                <Link
                  className="dark:text-light-gray bg-maya-blue dark:bg-dm-maya-blue text-main-dark-bg rounded-lg p-1.5 text-base duration-100 ease-in hover:scale-105"
                  to="/ingredients/new"
                >
                  New Ingredient
                </Link>
              </div>
              {ingredients.map((ingredient) => (
                <div key={ingredient.id} className="border-t px-10 py-3 duration-100 ease-in hover:scale-[1.01] hover:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:hover:shadow-[rgba(205,_205,_150,_0.15)_0px_2px_5px_0px,_rgba(255,_255,_255,_0.3)_0px_1px_1px_0px]">
                  <p className="text-lg">{ingredient.name}</p>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllIngredientsPage;
