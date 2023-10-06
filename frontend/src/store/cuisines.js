import { csrfFetch } from "./csrf";
import ingredientsReducer from "./ingredients";

const LOAD_ALL_CUISINES = "cuisines/LOAD_ALL_CUISINES";
const CREATE_CUISINE = "cuisines/CREATE_CUISINE";
const UPDATE_CUISINE = "cuisines/UPDATE_CUISINE";
const DELETE_CUISINE = "cuisines/DELETE_CUISINE";

// AC - Action Creator
const loadAllCuisinesAC = (cuisines) => ({
  type: LOAD_ALL_CUISINES,
  payload: cuisines,
});

const createCuisineAC = (cuisine) => ({
  type: CREATE_CUISINE,
  payload: cuisine,
});

const updateCuisineAC = (cuisine) => ({
  type: UPDATE_CUISINE,
  payload: cuisine,
});

const deleteCuisineAC = (cuisine) => ({
  type: DELETE_CUISINE,
  payload: cuisine,
});

// Thunk AC
// Load all cuisines
export const loadAllCuisines = () => async (dispatch) => {
  const res = await csrfFetch("/api/cuisines/");

  if (res.ok) {
    const cuisines = await res.json();
    dispatch(loadAllCuisinesAC(cuisines));
    return cuisines;
  }
};

// Create a cuisine
export const createCuisine = (cuisineData) => async (dispatch) => {
  const res = await csrfFetch("/api/cuisines", {
    method: "POST",
    body: JSON.stringify(cuisineData),
  });

  if (res.ok) {
    const newCuisine = await res.json();
    dispatch(createCuisineAC(newCuisine));
  }
};

// Edit a cuisine
export const updateCuisine = (cuisineId, cuisineData) => async (dispatch) => {
  const res = await csrfFetch(`/api/cuisines/${cuisineId}`, {
    method: "PUT",
    body: JSON.stringify(cuisineData),
  });

  if (res.ok) {
    const updatedCuisine = await res.json();
    dispatch(updateCuisineAC(updatedCuisine));
  }
};

// Delete a cuisine
export const deleteCuisine = (cuisineId) => async (dispatch) => {
    const res = await csrfFetch(`/api/cuisines/${cuisineId}`, {
        method: "DELETE"
      });
    
      if (res.ok) {
        dispatch(deleteCuisineAC(cuisineId));
      }
};

const initialState = {};

const cuisinesReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ALL_CUISINES:
      const cuisinesMap = {};
      action.payload.forEach((cuisine) => {
        cuisinesMap[cuisine.id] = cuisine;
      });
      return cuisinesMap;
    case CREATE_CUISINE:
        return { ...state, [action.payload.id]: action.payload };
    case UPDATE_CUISINE:
        return { ...state, [action.payload.id]: action.payload };
    case DELETE_CUISINE:
        let newState = {...state};
        delete newState[action.payload.id];
        return newState;
    default:
      return state;
  }
};

export default cuisinesReducer;
