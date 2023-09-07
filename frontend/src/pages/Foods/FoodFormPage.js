import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import {
  loadAllFoods,
  loadSingleFood,
  createFood,
  updateFood,
} from "../../store/foods";
import { loadAllIngredients } from "../../store/ingredients";

// ingredients on creation
// handle API errors: {name: "ERROR HERE" }
// render in edit mode

const FoodFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { routeId } = useParams();
  const sessionUser = useSelector((state) => state.session.user);
  const foodToEdit = useSelector((state) => state.foods[routeId]);
  const ingredients = useSelector((state) => Object.values(state.ingredients));
  const isEdit = !!routeId;

  const [formData, setFormData] = useState({
    name: "",
    imgUrl: "",
    cuisine: "",
    ingredients: [],
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
      ingredients: [...prevData.ingredients, ""],
    }));
  };

  // Update the selected ingredient at a specific index
  const handleIngredientChange = (index, value) => {
    setFormData((prevData) => {
      const updatedIngredients = [...prevData.ingredients];
      updatedIngredients[index] = value;
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
      <div className="flex h-[calc(100dvh-48px)] flex-wrap items-center justify-center lg:flex-nowrap">
        <div className="m-3 flex h-3/4 w-3/4 flex-col items-center justify-start overflow-y-auto overflow-x-hidden rounded-xl bg-main-bg dark:bg-main-dark-bg">
          {sessionUser ? (
            <>
              <p className="my-10 text-3xl ">
                {isEdit ? "Edit Food" : "Create a new food"}
              </p>
              <form className="flex flex-col" onSubmit={handleSubmit}>
                {/* Input fields */}
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
                {/* Ingredient dropdown */}
                <div className="my-2">
                  <select
                  className="rounded-lg bg-light-gray p-1.5 dark:bg-secondary-dark-bg w-full"
                    id="ingredientDropdown"
                    name="selectedIngredient"
                    value={formData.ingredients[0] || ""}
                    onChange={(e) => handleIngredientChange(0, e.target.value)}
                  >
                    <option value="">Select an ingredient...</option>
                    {ingredients.map((ingredient) => (
                      <option key={ingredient.id} value={ingredient.id}>
                        {ingredient.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* More ingredient dropdowns */}
                {formData.ingredients.slice(1).map((ingredientId, index) => (
                  <div className="my-2" key={index}>
                    <div className="flex relative">
                      <select
                      className="rounded-lg bg-light-gray p-1.5 dark:bg-secondary-dark-bg w-full"
                        id={`ingredientDropdown_${index}`}
                        name={`selectedIngredient_${index}`}
                        value={ingredientId || ""}
                        onChange={(e) =>
                          handleIngredientChange(index + 1, e.target.value)
                        }
                      >
                        <option value="">Select an ingredient...</option>
                        {ingredients.map((ingredient) => (
                          <option key={ingredient.id} value={ingredient.id}>
                            {ingredient.name}
                          </option>
                        ))}
                      </select>
                      <button
                        type="button"
                        onClick={() => removeIngredientDropdown(index)}
                        className="ml-2 text-red-500 absolute left-48 bottom-1"
                      >
                        &#10005;
                      </button>
                    </div>
                  </div>
                ))}
                {/* Add more ingredient dropdown button */}
                <button
                  type="button"
                  onClick={addIngredientDropdown}
                  className="mt-2 rounded bg-blue-500 px-2 py-1 text-white"
                >
                  Add Ingredient
                </button>
                {/* Submit button */}
                <div className="my-5 flex justify-center">
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
