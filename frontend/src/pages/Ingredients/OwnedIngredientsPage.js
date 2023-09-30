import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";

import { loadAllIngredients } from "../../store/ingredients";

import { OpenModalButton } from "../../components";
import { IngredientFormModal, ConfirmDeleteIngredientModal } from "../";

const OwnedIngredientsPage = () => {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const allIngredients = useSelector((state) => Object.values(state.ingredients));
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      await dispatch(loadAllIngredients());
      setLoaded(true);
    })();
  }, [dispatch]);

  const ingredients = loaded
  ? allIngredients.sort((a, b) => a.name.localeCompare(b.name))
  : [];

  return (
    <div className="bg-light-gray text-secondary-dark-bg dark:bg-secondary-dark-bg dark:text-light-gray">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex h-[calc(100dvh-135px)] w-full flex-col overflow-x-hidden overflow-y-scroll rounded-xl bg-main-bg dark:bg-main-dark-bg">
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
            <p className="m-4 flex justify-center text-xl font-bold">
              Must be logged-in to view this page.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnedIngredientsPage;
