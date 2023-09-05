import { csrfFetch } from './csrf';

const GET_FOODS = 'meals/GET_FOODS';


const initialState = {};

const foodsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SOME_CASE:
      return newState;
    default:
      return state;
  }
};

export default foodsReducer;
