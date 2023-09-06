import { csrfFetch } from './csrf';

const LOAD_ALL_FOODS = 'foods/LOAD_ALL_FOODS';

// AC - Action Creator
const loadAllFoodsAC = (foods) => ({
  type: LOAD_ALL_FOODS,
  payload: foods,
});

// Thunk Action Creator
export const loadAllFoods = () => async dispatch => {
  const res = await csrfFetch("/api/foods");

  if (res.ok) {
    const foods = await res.json();
    dispatch(loadAllFoodsAC(foods));
    return foods;
  }
}

const initialState = {};

const foodsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case LOAD_ALL_FOODS:
      return action.payload;
    default:
      return state;
  }
};

export default foodsReducer;
