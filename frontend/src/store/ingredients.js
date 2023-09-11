import { csrfFetch } from "./csrf";

const LOAD_ALL_INGREDIENTS = "ingredients/LOAD_ALL_INGREDIENTS";
const LOAD_SINGLE_INGREDIENT = "ingredients/LOAD_SINGLE_INGREDIENT";
const CREATE_INGREDIENT = "ingredients/CREATE_INGREDIENT";
const CREATE_FOOD_INGREDIENT = "ingredients/CREATE_FOOD_INGREDIENT";
const UPDATE_INGREDIENT = "ingredients/UPDATE_INGREDIENT";
const UPDATE_FOOD_INGREDIENT = "ingredients/UPDATE_FOOD_INGREDIENT";
const DELETE_INGREDIENT = "ingredients/DELETE_INGREDIENT";
const DELETE_FOOD_INGREDIENT = "ingredients/DELETE_FOOD_INGREDIENT";

// AC - Action creator
const loadAllIngredientsAC = (ingredients) => ({
  type: LOAD_ALL_INGREDIENTS,
  payload: ingredients,
});

const loadSingleIngredientAC = (ingredient) => ({
  type: LOAD_SINGLE_INGREDIENT,
  payload: ingredient,
});

const createIngredientAC = (ingredient) => ({
  type: CREATE_INGREDIENT,
  payload: ingredient,
});

const createFoodIngredientAC = (ingredient) => ({
  type: CREATE_FOOD_INGREDIENT,
  payload: ingredient,
});

const updateIngredientAC = (ingredient) => ({
  type: UPDATE_INGREDIENT,
  payload: ingredient,
});

const updateFoodIngredientAC = (ingredient) => ({
  type: UPDATE_FOOD_INGREDIENT,
  payload: ingredient,
});

const deleteIngredientAC = (ingredient) => ({
  type: DELETE_INGREDIENT,
  payload: ingredient,
})

const deleteFoodIngredientAC = (ingredient) => ({
  type: DELETE_FOOD_INGREDIENT,
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

export const loadSingleIngredient = (ingredientId) => async (dispatch) => {
  const res = await csrfFetch(`/api/ingredients/${ingredientId}`);

  if (res.ok) {
    const ingredient = await res.json();
    dispatch(loadSingleIngredientAC(ingredient));
    return ingredient;
  }
};

export const createIngredient = (ingredientData) => async (dispatch) => {
  const res = await csrfFetch(`/api/ingredients`, {
    method: "POST",
    body: JSON.stringify(ingredientData),
  });

  if(res.ok) {
    const newIngredient = await res.json();
    dispatch(createIngredientAC(newIngredient));
  }
}

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

export const updateIngredient = (ingredientId, ingredientData) => async (dispatch) => {
  const res = await csrfFetch(`/api/ingredients/${ingredientId}`, {
    method: "PUT",
    body: JSON.stringify(ingredientData),
  });

  if (res.ok) {
    const updatedIngredient = await res.json();
    dispatch(updateIngredientAC(updatedIngredient));
  }
}

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

export const deleteIngredient = (ingredientId) => async (dispatch) => {
  const res = await csrfFetch(`/api/ingredients/${ingredientId}`, {
    method: "DELETE"
  });

  if (res.ok) {
    dispatch(deleteIngredientAC(ingredientId));
  }
}

export const deleteFoodIngredient = (foodId, ingredientId) => async (dispatch) => {
  const res = await csrfFetch(`/api/foods/${foodId}/ingredients/${ingredientId}`, {
    method: "DELETE"
  });

  if (res.ok) {
    dispatch(deleteFoodIngredientAC(ingredientId));
  }
}

const initialState = {};

const ingredientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_INGREDIENTS:
      return action.payload;
    case LOAD_SINGLE_INGREDIENT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_INGREDIENT:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_FOOD_INGREDIENT:
      return [...state, action.payload];
    case UPDATE_INGREDIENT:
      return {...state, [action.payload.id]: action.payload };
    case UPDATE_FOOD_INGREDIENT:
        return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default ingredientsReducer;
