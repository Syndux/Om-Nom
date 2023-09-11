import { csrfFetch } from "./csrf";
import { createFoodIngredient, updateFoodIngredient } from "./ingredients";

const LOAD_ALL_FOODS = "foods/LOAD_ALL_FOODS";
const LOAD_SINGLE_FOOD = "foods/LOAD_SINGLE_FOOD";
const CREATE_FOOD = "foods/CREATE_FOOD";
const UPDATE_FOOD = "foods/UPDATE_FOOD";
const DELETE_FOOD = "foods/DELETE_FOOD";

// AC - Action Creator
const loadAllFoodsAC = (foods) => ({
  type: LOAD_ALL_FOODS,
  payload: foods,
});

const loadSingleFoodAC = (food) => ({
  type: LOAD_SINGLE_FOOD,
  payload: food,
});

const createFoodAC = (food) => ({
  type: CREATE_FOOD,
  payload: food,
});

const updateFoodAC = (food) => ({
  type: UPDATE_FOOD,
  payload: food,
});

const deleteFoodAC = (food) => ({
  type: DELETE_FOOD,
  payload: food,
})

// THUNK ACTION CREATOR
// Get all foods
export const loadAllFoods = () => async (dispatch) => {
  const res = await csrfFetch("/api/foods");

  if (res.ok) {
    const foods = await res.json();
    dispatch(loadAllFoodsAC(foods));
    return foods;
  }
};

// Get food details
export const loadSingleFood = (foodId) => async (dispatch) => {
  const res = await csrfFetch(`/api/foods/${foodId}`);

  if (res.ok) {
    const food = await res.json();
    dispatch(loadSingleFoodAC(food));
    //return food.id;
  }
};

// Create new food
export const createFood = ({ ingredients, ...foodData }) => async (dispatch) => {
  const res = await csrfFetch("/api/foods", {
    method: "POST",
    body: JSON.stringify(foodData),
  });

  if (res.ok) {
    const food = await res.json();
    dispatch(createFoodAC(food));

    for (const ingredient of ingredients) {
      const { ingredientId, quantity, unit } = ingredient;
      await dispatch(createFoodIngredient(food.id, ingredientId, { quantity, unit }));
    }
    return food.id;
  }
};

// Edit a food
export const updateFood = (foodId, {ingredients, ...formData}) => async (dispatch) => {
  const res = await csrfFetch(`/api/foods/${foodId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });

  if (res.ok) {
    const food = await res.json();
    dispatch(updateFoodAC(food));

    for (const ingredient of ingredients) {
      const { ingredientId, quantity, unit } = ingredient;
      await dispatch(updateFoodIngredient(food.id, ingredientId, { quantity, unit }));
    }
    return food.id;
  }
};

// Delete a food
export const deleteFood = (foodId) => async (dispatch) => {
  const res = await csrfFetch(`/api/foods/${foodId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    dispatch(deleteFoodAC(foodId));
  }
};

const initialState = {};

const foodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_FOODS:
      const foodsMap = {};
      action.payload.forEach((food) => {
        foodsMap[food.id] = food;
      });
      return foodsMap;
    case LOAD_SINGLE_FOOD:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_FOOD:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_FOOD:
      return {
        ...state,
        foods: {
          ...state.foods,
          [action.payload.id]: action.payload,
        },
      };
    case DELETE_FOOD:
      let newState = {...state};
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
};

export default foodsReducer;
