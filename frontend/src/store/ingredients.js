import { csrfFetch } from "./csrf";

const LOAD_ALL_INGREDIENTS = "ingredients/LOAD_ALL_INGREDIENTS";
const CREATE_FOOD_INGREDIENT = "ingredients/CREATE_FOOD_INGREDIENT";
const UPDATE_FOOD_INGREDIENT = "ingredients/UPDATE_FOOD_INGREDIENT";

// AC - Action creator
const loadAllIngredientsAC = (ingredients) => ({
  type: LOAD_ALL_INGREDIENTS,
  payload: ingredients,
});

const createFoodIngredientAC = (ingredient) => ({
  type: CREATE_FOOD_INGREDIENT,
  payload: ingredient,
});

const updateFoodIngredientAC = (ingredient) => ({
  type: UPDATE_FOOD_INGREDIENT,
  payload: ingredient,
});

// Thunk AC
export const loadAllIngredients = () => async (dispatch) => {
  const res = await csrfFetch("/api/ingredients");

  if (res.ok) {
    const ingredients = await res.json();
    dispatch(loadAllIngredientsAC(ingredients));
    return ingredients;
  }
};

export const createFoodIngredient = (foodId, ingredientId, ingredientData) => async (dispatch) => {
    const res = await csrfFetch(`/api/foods/${foodId}/ingredients/${ingredientId}`, {
        method: "POST",
        body: JSON.stringify(ingredientData),
    });

    if (res.ok) {
        const newFoodIngredient = await res.json();
        dispatch(createFoodIngredientAC(newFoodIngredient));
        //return newFoodIngredient;
    }
};

export const updateFoodIngredient = (foodId, ingredientId, ingredientData) => async (dispatch) => {
  const res = await csrfFetch(`/api/foods/${foodId}/ingredients/${ingredientId}`, {
      method: "PUT",
      body: JSON.stringify(ingredientData),
  });

  if (res.ok) {
      const updatedFoodIngredient = await res.json();
      dispatch(updateFoodIngredientAC(updatedFoodIngredient));
      //return updatedFoodIngredient;
  }
};

const initialState = {};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_INGREDIENTS:
      return action.payload;
    case CREATE_FOOD_INGREDIENT:
      return [...state, action.payload];
    case UPDATE_FOOD_INGREDIENT:
        return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default ingredientsReducer;
