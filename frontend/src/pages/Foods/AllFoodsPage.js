import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa6";

import { loadAllFoods } from "../../store/foods";

import { OpenModalButton } from "../../components";
import ConfirmDeleteFoodModal from "../ConfirmDeleteFoodModal";

const AllFoodsPage = () => {
  const dispatch = useDispatch();
  const allFoods = useSelector((state) => Object.values(state.foods));
  const sessionUser = useSelector((state) => state.session.user);
  const [loaded, setLoaded] = useState(false);
  const [selectedCuisine, setSelectedCuisine] = useState("All");

  useEffect(() => {
    (async () => {
      await dispatch(loadAllFoods());
      setLoaded(true);
    })();
  }, [dispatch]);

  const foods = loaded
    ? allFoods.sort((a, b) => a.name.localeCompare(b.name))
    : [];

  const uniqueCuisines = [
    ...new Set(allFoods.map((food) => food["cuisine.name"]).sort()),
  ];

  const filteredFoods =
    selectedCuisine === "All"
      ? foods
      : foods.filter((food) => food["cuisine.name"] === selectedCuisine);

  const handleCuisineChange = (event) => {
    setSelectedCuisine(event.target.value);
  };

  return (
    <div className="m-3 flex h-[calc(100dvh-100px)] w-full flex-col overflow-x-hidden overflow-y-scroll rounded-xl bg-main-bg shadow-[rgba(17,_17,_26,_0.1)_0px_0px_16px] dark:bg-main-dark-bg dark:shadow-[rgba(233,_233,_224,_0.1)_0px_0px_16px]">
      {loaded && (
        <>
          <div className="m-4 flex items-center justify-between text-xl font-bold">
            <p className="whitespace-nowrap">All Foods</p>
            {sessionUser && (
              <Link
                className="whitespace-nowrap rounded-lg bg-blue-700 p-1.5 text-sm font-semibold text-main-bg duration-100 ease-in hover:scale-105"
                to="/foods/new"
              >
                New Food
              </Link>
            )}
          </div>

          <div className="mb-2">
            <label htmlFor="cuisineDropdown" className="ml-4 mr-2">
              Filter by Cuisine:
            </label>
            <select
              id="cuisineDropdown"
              value={selectedCuisine}
              onChange={handleCuisineChange}
              className="bg-light-gray text-secondary-dark-bg dark:bg-secondary-dark-bg dark:text-light-gray"
            >
              <option value="All">All</option>
              {uniqueCuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine}
                </option>
              ))}
            </select>
          </div>

          {filteredFoods.map((food) => (
            <div
              key={food.id}
              className="flex justify-between border-t px-10 py-3 duration-100 ease-in hover:scale-[1.01] hover:shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] dark:hover:shadow-[rgba(205,_205,_150,_0.15)_0px_2px_5px_0px,_rgba(255,_255,_255,_0.3)_0px_1px_1px_0px]"
            >
              <div className="max-w-sm overflow-hidden text-ellipsis whitespace-nowrap">
                <p className="text-lg font-semibold">{food.name}</p>
                <p className="text-sm opacity-60">{food["cuisine.name"]}</p>
              </div>
              {sessionUser && sessionUser?.id === food.creatorId && (
                <div className="flex flex-row gap-4">
                  <Link
                    className="flex items-center justify-center rounded-lg px-2 text-xl text-secondary-dark-bg duration-100 ease-in hover:scale-110 hover:bg-light-gray dark:text-light-gray dark:hover:bg-secondary-dark-bg"
                    to={`/foods/${food.id}/edit`}
                  >
                    <AiFillEdit />
                  </Link>

                  <OpenModalButton
                    modalComponent={<ConfirmDeleteFoodModal foodId={food.id} />}
                    buttonText={<FaTrash />}
                  />
                </div>
              )}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default AllFoodsPage;
