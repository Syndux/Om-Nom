import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  loadAllFoods,
  loadSingleFood,
  createFood,
  updateFood,
} from "../../store/foods";
import { loadAllIngredients, createFoodIngredient } from "../../store/ingredients";

// handle API errors: {name: "ERROR HERE" }
// render in edit mode

const FoodFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const bottomDiv = useRef(null);
  const { routeId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const foodToEdit = useSelector((state) => state.foods[routeId]);
  const ingredients = useSelector((state) => Object.values(state.ingredients));
  const isEdit = !!routeId;

  const [formData, setFormData] = useState({
    name: "",
    imgUrl: "",
    cuisine: "",
    ingredients: [
      {
        ingredientId: "",
        quantity: "",
        unit: "",
      },
    ],
  });

  useEffect(() => {
    dispatch(loadAllFoods());
    dispatch(loadAllIngredients());

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    let foodId;

    if (isEdit) {
      foodId = await dispatch(updateFood(routeId, formData));
    } else {
      foodId = await dispatch(createFood(formData));

      formData.ingredients.map((ingredientData) => {
        const { ingredientId, quantity, unit } = ingredientData;
        return dispatch(createFoodIngredient(foodId, ingredientId, { quantity, unit }));
      });
    }

    history.push(`/foods/${foodId}`);

    setFormData({
      name: "",
      imgUrl: "",
      cuisine: "",
      ingredients: [],
    });
  };

  // Add a new dropdown for selecting ingredients
  const addIngredientDropdown = () => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: [
        ...prevData.ingredients,
        {
          ingredientId: "",
          quantity: "",
          unit: "",
        },
      ],
    }));

    if (bottomDiv.current) {
      bottomDiv.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Update the selected ingredient at a specific index
  const handleIngredientChange = (index, ingredientId, quantity, unit) => {
    setFormData((prevData) => {
      const updatedIngredients = [...prevData.ingredients];
      updatedIngredients[index] = {
        ingredientId,
        quantity,
        unit,
      };
      return {
        ...prevData,
        ingredients: updatedIngredients,
      };
    });
  };

  // Remove a dropdown for selecting ingredients
  const removeIngredientDropdown = (index) => {
    setFormData((prevData) => {
      const updatedIngredients = [...prevData.ingredients];
      updatedIngredients.splice(index, 1);
      return {
        ...prevData,
        ingredients: updatedIngredients,
      };
    });
  };

  return (
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex flex-wrap items-center justify-center lg:flex-nowrap">
        <div className="m-3 flex h-[calc(100dvh-72px)] w-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden rounded-xl bg-main-bg p-4 dark:bg-main-dark-bg">
          {sessionUser ? (
            <>
              <p className="my-10 text-3xl">
                {isEdit ? "Edit Food" : "Create a new food"}
              </p>
              <form className="flex flex-col" onSubmit={handleSubmit}>
                {/* Input fields */}
                <div className="my-2 flex justify-between gap-2">
                  <div className="w-1/2">
                    <input
                      className="w-full rounded-lg bg-light-gray p-1.5 dark:bg-secondary-dark-bg"
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
                  <div className="w-1/2">
                    <input
                      className="w-full rounded-lg bg-light-gray p-1.5 dark:bg-secondary-dark-bg"
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
                </div>
                <div className="w-full">
                  <input
                    className="w-full rounded-lg bg-light-gray p-1.5 dark:bg-secondary-dark-bg"
                    placeholder="Image URL"
                    type="text"
                    id="imgUrl"
                    name="imgUrl"
                    value={formData.imgUrl}
                    onChange={(e) =>
                      setFormData({ ...formData, imgUrl: e.target.value })
                    }
                  />
                </div>

                {/* Ingredient add */}
                <div className="mt-2">
                  <div className="relative flex">
                    <select
                      className="w-1/2 rounded-lg bg-light-gray p-1 dark:bg-secondary-dark-bg"
                      id="ingredientDropdown"
                      name="selectedIngredient"
                      value={formData.ingredients[0].ingredientId || ""}
                      onChange={(e) =>
                        handleIngredientChange(0, e.target.value)
                      }
                    >
                      <option value="">Select an ingredient</option>
                      {/* Ingredient dropdown */}
                      {ingredients.map((ingredient) => (
                        <option key={ingredient.id} value={ingredient.id}>
                          {ingredient.name}
                        </option>
                      ))}
                    </select>
                    <input
                      type="text"
                      className="ml-2 w-1/4 rounded-lg bg-light-gray p-1.5 dark:bg-secondary-dark-bg"
                      placeholder="Quantity"
                      value={formData.ingredients[0].quantity || ""}
                      onChange={(e) =>
                        handleIngredientChange(
                          0,
                          formData.ingredients[0].ingredientId,
                          e.target.value,
                          formData.ingredients[0].unit,
                        )
                      }
                    />
                    <input
                      type="text"
                      className="ml-2 w-1/4 rounded-lg bg-light-gray p-1.5 dark:bg-secondary-dark-bg"
                      placeholder="Unit"
                      value={formData.ingredients[0].unit || ""}
                      onChange={(e) =>
                        handleIngredientChange(
                          0,
                          formData.ingredients[0].ingredientId,
                          formData.ingredients[0].quantity,
                          e.target.value,
                        )
                      }
                    />
                    <button
                      type="button"
                      className="px-2"
                      style={{ visibility: "hidden" }}
                    >
                      &#10005;
                    </button>
                  </div>
                </div>

                {/* More ingredient adds */}
                {formData.ingredients.slice(1).map((ingredient, index) => (
                  <div className="mt-2" key={index}>
                    <div className="relative flex">
                      <select
                        className="w-1/2 rounded-lg bg-light-gray p-1 dark:bg-secondary-dark-bg"
                        id={`ingredientDropdown_${index}`}
                        name={`selectedIngredient_${index}`}
                        value={ingredient.ingredientId || ""}
                        onChange={(e) =>
                          handleIngredientChange(
                            index + 1,
                            e.target.value,
                            ingredient.quantity,
                            ingredient.unit,
                          )
                        }
                      >
                        <option value="">Select an ingredient</option>
                        {ingredients.map((ingredient) => (
                          <option key={ingredient.id} value={ingredient.id}>
                            {ingredient.name}
                          </option>
                        ))}
                      </select>
                      <input
                        type="text"
                        className="ml-2 w-1/4 rounded-lg bg-light-gray p-1.5 dark:bg-secondary-dark-bg"
                        placeholder="Quantity"
                        value={ingredient.quantity || ""}
                        onChange={(e) =>
                          handleIngredientChange(
                            index + 1,
                            ingredient.ingredientId,
                            e.target.value,
                            ingredient.unit,
                          )
                        }
                      />
                      <input
                        type="text"
                        className="ml-2 w-1/4 rounded-lg bg-light-gray p-1.5 dark:bg-secondary-dark-bg"
                        placeholder="Unit"
                        value={ingredient.unit || ""}
                        onChange={(e) =>
                          handleIngredientChange(
                            index + 1,
                            ingredient.ingredientId,
                            ingredient.quantity,
                            e.target.value,
                          )
                        }
                      />
                      <button
                        type="button"
                        onClick={() => removeIngredientDropdown(index + 1)}
                        className="px-2 text-red-500"
                      >
                        &#10005;
                      </button>
                    </div>
                  </div>
                ))}

                {/* Form buttons */}
                <div className="my-6 flex justify-around" ref={bottomDiv}>
                  <button
                    type="button"
                    onClick={addIngredientDropdown}
                    className="text-light-gray dark:text-main-bg rounded-lg bg-blue-500 px-3 py-1 duration-100 ease-in hover:scale-105"
                  >
                    Add another ingredient
                  </button>
                  <button
                    className="text-light-gray bg-chinese-gold dark:text-main-bg rounded-lg px-3 py-1 duration-100 ease-in hover:scale-105"
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
