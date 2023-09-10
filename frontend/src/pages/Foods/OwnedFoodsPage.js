import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

import { loadAllFoods } from "../../store/foods";

import { OpenModalButton } from "../../components";
import ConfirmDeleteFoodModal from "../ConfirmDeleteFoodModal";

const OwnedFoodsPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const foods = useSelector((state) => Object.values(state.foods));
  const [loaded, setLoaded] = useState(false);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    (async () => {
      await dispatch(loadAllFoods());
      setLoaded(true);
    })();
  }, [dispatch]);

  const handleEdit = (foodId) => {
    history.push(`/foods/${foodId}/edit`);
  };

  return (
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex flex-wrap justify-center lg:flex-nowrap">
        <div className="m-3 flex h-[calc(100dvh-71px)] w-full flex-col overflow-x-hidden overflow-y-scroll rounded-xl bg-main-bg dark:bg-main-dark-bg">
          {sessionUser ? (
            loaded && (
              <>
                <p className="m-4 flex items-center justify-between text-xl font-bold">
                  All owned foods
                </p>
                {foods
                  .filter((food) => food.creatorId === sessionUser.id)
                  .map((food) => (
                    <div
                      key={food.id}
                      className="flex justify-between border-t px-10 py-3 duration-100 ease-in hover:scale-[1.01] hover:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:hover:shadow-[rgba(205,_205,_150,_0.15)_0px_2px_5px_0px,_rgba(255,_255,_255,_0.3)_0px_1px_1px_0px]"
                    >
                      <div>
                        <p className="text-lg">{food.name}</p>
                        <p className="text-sm opacity-60">{food.cuisine}</p>
                      </div>
                      {sessionUser && sessionUser?.id === food.creatorId && (
                        <div className="flex flex-row gap-4">
                          <div className="text-secondary-dark-bg dark:text-light-gray flex justify-center rounded-lg px-2 duration-100 ease-in hover:scale-110 hover:bg-light-gray dark:hover:bg-secondary-dark-bg">
                            <button
                              className="text-xl"
                              onClick={() => handleEdit(food.id)}
                            >
                              <FaEdit />
                            </button>
                          </div>
                          <div className="text-secondary-dark-bg dark:text-light-gray flex justify-center rounded-lg px-2 duration-100 ease-in hover:scale-110 hover:bg-light-gray dark:hover:bg-secondary-dark-bg">
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
            <p className="m-4 flex justify-center text-xl font-bold">
              Must be logged-in to view this page.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OwnedFoodsPage;
