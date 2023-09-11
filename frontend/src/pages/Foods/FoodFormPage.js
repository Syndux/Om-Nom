import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import { loadSingleFood, createFood, updateFood } from "../../store/foods";
import { loadAllIngredients } from "../../store/ingredients";

const initialFormData = {
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
};

const FoodFormPage = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const bottomDiv = useRef(null);
  const { foodId } = useParams();
  const isEdit = !!foodId;
  const sessionUser = useSelector((state) => state.session.user);
  const foodToEdit = useSelector((state) => state.foods[foodId]);
  const ingredients = useSelector((state) => Object.values(state.ingredients));

  const [validationErrors, setValidationErrors] = useState([]);
  const [ready, setReady] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [formData, setFormData] = useState({ ...initialFormData });

  useEffect(() => {
    // dispatch(loadAllFoods());
    (async () => {
      await dispatch(loadAllIngredients());
      if (isEdit) {
        await dispatch(loadSingleFood(foodId));
        setReady(true);
      }
    })();
    setLoaded(true);
  }, [dispatch]);

  useEffect(() => {
    if (isEdit && foodToEdit && ready) {
      const ingredientData = foodToEdit.ingredients.map((ingredientObj) => ({
        ingredientId: ingredientObj.id,
        quantity: ingredientObj.FoodIngredients.quantity,
        unit: ingredientObj.FoodIngredients.unit,
      }));
      setFormData({
        name: foodToEdit.name,
        imgUrl: foodToEdit.imgUrl,
        cuisine: foodToEdit.cuisine,
        ingredients: ingredientData,
      });
    }
  }, [isEdit, foodToEdit, ready]);

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

  const validateFood = () => {
    const errors = [];
    const imageUrlRegex = /\.(png|svg|jpg|jpeg)$/i;

    if (formData.name.length < 2 || formData.name.length > 120) {
      errors.push("Name must be between 2 and 120 characters.");
    }

    if (formData.cuisine.length < 3 || formData.cuisine.length > 20) {
      errors.push("Cuisine must be between 3 and 20 characters.");
    }

    if (formData.imgUrl && !imageUrlRegex.test(formData.imgUrl)) {
      errors.push("Image URL must end with .png, .svg, .jpg, or .jpeg");
    }

    return errors;
  };

  const validateIngredients = () => {
    const errors = [];

    const quantityRegex = /^\d+(\.\d{1,2})?$/;
    const unitRegex = /^[a-zA-Z]+$/;
    const ingredientSet = new Set();

    formData.ingredients.forEach((ingredient, index) => {
      if (!ingredient.ingredientId) {
        errors.push(`Ingredient ${index + 1}: Ingredient is required.`);
      }

      if (!ingredient.quantity) {
        errors.push(`Ingredient ${index + 1}: Quantity is required.`);
      } else if (!quantityRegex.test(ingredient.quantity)) {
        errors.push(
          `Ingredient ${
            index + 1
          }: Quantity must be a valid integer or decimal (e.g., 1, 1.23).`,
        );
      } else if (parseFloat(ingredient.quantity) === 0) {
        errors.push(`Ingredient ${index + 1}: Quantity cannot be zero.`);
      }

      if (!ingredient.unit) {
        errors.push(`Ingredient ${index + 1}: Unit is required.`);
      } else if (!unitRegex.test(ingredient.unit)) {
        errors.push(
          `Ingredient ${
            index + 1
          }: Unit must consist of only alphabet characters.`,
        );
      }

      const ingredientKey = `${ingredient.ingredientId}`;
      if (ingredientSet.has(ingredientKey)) {
        errors.push(`Ingredient ${index + 1}: Duplicate ingredient.`);
      } else {
        ingredientSet.add(ingredientKey);
      }
    });

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const foodValErrors = validateFood();
    const ingredientValErrors = validateIngredients();
    const valErrors = [...foodValErrors, ...ingredientValErrors];

    if (valErrors.length > 0) {
      setValidationErrors(valErrors);
      return;
    }

    let newFoodId;

    try {
      if (isEdit) {
        newFoodId = await dispatch(updateFood(foodId, formData));
      } else {
        newFoodId = await dispatch(createFood(formData));
      }

      if (newFoodId !== null) {
        setFormData({ ...initialFormData });
        setValidationErrors([]);
        // Go to food details page - Coming soon
        // history.push(`/foods/${newFoodId}`);
        history.push(`/foods/current`);
      }
    } catch (error) {
      const res = await error.json();
      if (res.errors) {
        setValidationErrors(Object.values(res.errors));
      } else if (res.message) {
        setValidationErrors([res.message]);
      }
    }
  };

  return (
    <div className="dark:text-light-gray text-secondary-dark-bg bg-light-gray dark:bg-secondary-dark-bg">
      <div className="flex flex-wrap items-center justify-center lg:flex-nowrap">
        <div className="m-3 flex h-[calc(100dvh-72px)] w-full flex-col items-center justify-start overflow-y-auto overflow-x-hidden rounded-xl bg-main-bg p-4 dark:bg-main-dark-bg">
          {sessionUser && loaded ? (
            <>
              <p className="my-10 text-3xl">
                {isEdit ? "Edit Food" : "Create a new food"}
              </p>
              {validationErrors.length > 0 && (
                <div className="mb-5 flex flex-col items-center justify-center text-center text-red-500">
                  {validationErrors.map((error, index) => (
                    <div className="m-0.5" key={index}>
                      {error}
                    </div>
                  ))}
                </div>
              )}
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
                      {ingredients.map((ingredient) => {
                        return (
                          <option key={ingredient.id} value={ingredient.id}>
                            {ingredient.name}
                          </option>
                        );
                      })}
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
                        {ingredients.map((ingredient) => {
                          return (
                            <option key={ingredient.id} value={ingredient.id}>
                              {ingredient.name}
                            </option>
                          );
                        })}
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
                    className="text-main-bg dark:text-main-bg rounded-lg bg-blue-700 px-3 py-1 duration-100 ease-in hover:scale-105"
                  >
                    Add another ingredient
                  </button>
                  <button
                    className="text-main-bg bg-emerald-800 dark:text-main-bg rounded-lg px-3 py-1 duration-100 ease-in hover:scale-105"
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
