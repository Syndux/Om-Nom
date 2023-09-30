import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";

import { loadAllFoods } from "../../store/foods";
import { loadAllIngredients } from "../../store/ingredients";
import { OpenModalButton } from "../../components";
import {
  ConfirmDeleteFoodModal,
  IngredientFormModal,
  ConfirmDeleteIngredientModal,
} from "../../pages";

const Explore = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const allFoods = useSelector((state) => Object.values(state.foods));
  const allIngredients = useSelector((state) =>
    Object.values(state.ingredients),
  );
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!sessionUser) history.push("/");
  }, [sessionUser, history]);

  useEffect(() => {
    (async () => {
      await dispatch(loadAllFoods());
      await dispatch(loadAllIngredients());
      setLoaded(true);
    })();
  }, [dispatch]);

  const foods = loaded
    ? allFoods.sort((a, b) => a.name.localeCompare(b.name))
    : [];
  const ingredients = loaded
    ? allIngredients.sort((a, b) => a.name.localeCompare(b.name))
    : [];

  return (
    <div className="bg-light-gray text-secondary-dark-bg dark:bg-secondary-dark-bg dark:text-light-gray">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 h-[calc(100dvh-100px)] w-full overflow-x-hidden overflow-y-scroll rounded-xl bg-main-bg dark:bg-main-dark-bg">
          {sessionUser ? (
            loaded && (
              <>
                <div className="m-4 flex items-center justify-between text-xl font-bold">
                  <p>Owned Foods</p>
                  <Link
                    className="rounded-lg bg-blue-700 p-1.5 text-sm font-semibold text-main-bg duration-100 ease-in hover:scale-105"
                    to="/foods/new"
                  >
                    New Food
                  </Link>
                </div>
                {foods
                  .filter((food) => food.creatorId === sessionUser.id)
                  .map((food) => (
                    <div
                      key={food.id}
                      className="flex justify-between border-t px-10 py-3 duration-100 ease-in hover:scale-[1.01] hover:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:hover:shadow-[rgba(205,_205,_150,_0.15)_0px_2px_5px_0px,_rgba(255,_255,_255,_0.3)_0px_1px_1px_0px]"
                    >
                      <div>
                        <p className="text-lg font-semibold">{food.name}</p>
                        <p className="text-sm opacity-60">{food.cuisine}</p>
                      </div>
                      {sessionUser && sessionUser?.id === food.creatorId && (
                        <div className="flex flex-row gap-4">
                          <div className="flex items-center justify-center rounded-lg px-2 text-secondary-dark-bg duration-100 ease-in hover:scale-110 hover:bg-light-gray dark:text-light-gray dark:hover:bg-secondary-dark-bg">
                            <Link
                              className="text-xl"
                              to={`/foods/${food.id}/edit`}
                            >
                              <AiFillEdit />
                            </Link>
                          </div>
                          <div className="flex items-center justify-center rounded-lg px-2 text-secondary-dark-bg duration-100 ease-in hover:scale-110 hover:bg-light-gray dark:text-light-gray dark:hover:bg-secondary-dark-bg">
                            <OpenModalButton
                              modalComponent={
                                <ConfirmDeleteFoodModal foodId={food.id} />
                              }
                              buttonText={<FaTrash />}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="m-3 h-[calc(100dvh-135px)] w-full overflow-x-hidden overflow-y-scroll rounded-xl bg-main-bg dark:bg-main-dark-bg">
          {sessionUser ? (
            loaded && (
              <>
                <div className="m-4 flex items-center justify-between text-xl font-bold">
                  <p>Owned Ingredients</p>
                  <OpenModalButton
                    modalComponent={<IngredientFormModal />}
                    buttonText="New Ingredient"
                    className="rounded-lg bg-blue-700 p-1.5 text-sm font-semibold text-main-bg duration-100 ease-in hover:scale-105"
                  />
                </div>
                {ingredients
                  .filter(
                    (ingredient) => ingredient.creatorId === sessionUser.id,
                  )
                  .map((ingredient) => (
                    <div
                      key={ingredient.id}
                      className="flex justify-between border-t px-10 py-3 duration-100 ease-in hover:scale-[1.01] hover:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:hover:shadow-[rgba(205,_205,_150,_0.15)_0px_2px_5px_0px,_rgba(255,_255,_255,_0.3)_0px_1px_1px_0px]"
                    >
                      <div className="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">
                        <p className="text-lg font-semibold">
                          {ingredient.name}
                        </p>
                      </div>
                      {sessionUser &&
                        sessionUser?.id === ingredient.creatorId && (
                          <div className="flex flex-row gap-4">
                            <OpenModalButton
                              modalComponent={
                                <IngredientFormModal
                                  ingredientId={ingredient.id}
                                />
                              }
                              buttonText={<AiFillEdit />}
                              className="flex items-center justify-center rounded-lg px-2 text-xl text-secondary-dark-bg duration-100 ease-in hover:scale-110 hover:bg-light-gray dark:text-light-gray dark:hover:bg-secondary-dark-bg"
                            />

                            <OpenModalButton
                              modalComponent={
                                <ConfirmDeleteIngredientModal
                                  ingredientId={ingredient.id}
                                />
                              }
                              buttonText={<FaTrash />}
                              className="flex items-center justify-center rounded-lg px-2 text-base text-secondary-dark-bg duration-100 ease-in hover:scale-110 hover:bg-light-gray dark:text-light-gray dark:hover:bg-secondary-dark-bg"
                            />
                          </div>
                        )}
                    </div>
                  ))}
              </>
            )
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Explore;
