import { csrfFetch } from "./csrf";

const LOAD_ALL_FOODS = "foods/LOAD_ALL_FOODS";
const LOAD_SINGLE_FOOD = "foods/LOAD_SINGLE_FOOD";
const CREATE_FOOD = "foods/CREATE_FOOD";
const UPDATE_FOOD = "foods/UPDATE_FOOD";

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
export const createFood = (foodData) => async (dispatch) => {
  const res = await csrfFetch("/api/foods", {
    method: "POST",
    body: JSON.stringify(foodData),
  });

  if (res.ok) {
    const food = await res.json();
    dispatch(createFoodAC(food));
    return food.id;
  }
};

// Edit a food
export const updateFood = (foodId, formData) => async (dispatch) => {
  const res = await csrfFetch(`/api/foods/${foodId}`, {
    method: "PUT",
    body: JSON.stringify(formData),
  });

  if (res.ok) {
    const food = await res.json();
    dispatch(updateFoodAC(food));
    return food.id;
  }
};

const initialState = {};

const foodsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_FOODS:
      return action.payload;
    case LOAD_SINGLE_FOOD:
      return { ...state, [action.payload.id]: action.payload };
    case CREATE_FOOD:
      return { ...state, [action.payload.id]: action.payload };
    case UPDATE_FOOD:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};

export default foodsReducer;
