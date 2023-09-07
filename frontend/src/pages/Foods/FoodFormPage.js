import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  loadAllFoods,
  loadSingleFood,
  createFood,
  updateFood,
} from "../../store/foods";

// Require auth, handle API errors: {name: "ERROR HERE" }

const FoodFormPage = () => {
  const dispatch = useDispatch();
  const { routeId } = useParams();
  const isEdit = !!routeId;
  const foodToEdit = useSelector((state) => state.foods[routeId]);
  const sessionUser = useSelector((state) => state.session.user);

  const [formData, setFormData] = useState({
    name: "",
    imgUrl: "",
    cuisine: "",
    ingredients: [],
  });

  useEffect(() => {
    dispatch(loadAllFoods());

    if (isEdit) {
      dispatch(loadSingleFood(routeId));
    }
  }, [dispatch, isEdit, routeId]);

  useEffect(() => {
    if (isEdit && foodToEdit) {
      setFormData({
        name: foodToEdit.name,
        imgUrl: foodToEdit.imgUrl,
        cuisine: foodToEdit.cuisine,
        ingredients: foodToEdit.ingredients,
      });
    }
  }, [isEdit, foodToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isEdit) {
      dispatch(updateFood(routeId, formData));
    } else {
      dispatch(createFood(formData));
    }

    setFormData({
      name: "",
      imgUrl: "",
      cuisine: "",
      ingredients: [],
    });
  };

  return (
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex h-[calc(100dvh-48px)] flex-wrap items-center justify-center lg:flex-nowrap">
        <div className="m-3 flex h-3/4 w-3/4 flex-col items-center justify-center overflow-y-auto overflow-x-hidden rounded-xl bg-main-bg dark:bg-main-dark-bg">
          {sessionUser ? (
            <>
              <p className="mb-10 text-3xl">
                {isEdit ? "Edit Food" : "Create a new food"}
              </p>
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <div className="my-2">
                  <input
                    className="rounded-lg bg-light-gray p-1.5 dark:bg-secondary-dark-bg"
                    placeholder="Name"
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="my-2">
                  <input
                    className="rounded-lg bg-light-gray p-1.5 dark:bg-secondary-dark-bg"
                    placeholder="Image url"
                    type="text"
                    id="imgUrl"
                    name="imgUrl"
                    value={formData.imgUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imgUrl: e.target.value })
                    }
                  />
                </div>
                <div className="my-2">
                  <input
                    className="rounded-lg bg-light-gray p-1.5 dark:bg-secondary-dark-bg"
                    placeholder="Cuisine"
                    type="text"
                    id="cuisine"
                    name="cuisine"
                    value={formData.cuisine}
                    onChange={(e) =>
                      setFormData({ ...formData, cuisine: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="mt-5 flex justify-center">
                  <button
                    className="text-light-gray dark:bg-chinese-gold dark:text-main-bg rounded-lg bg-[#3454D1] px-3 py-1 duration-100 ease-in hover:scale-105"
                    type="submit"
                  >
                    {isEdit ? "Update this food" : "Create this food"}
                  </button>
                </div>
              </form>
            </>
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

export default FoodFormPage;
