import { csrfFetch } from './csrf';

const GET_ALL_FOODS = 'foods/GET_ALL_FOODS';


const initialState = {};

const foodsReducer = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case GET_ALL_FOODS:
      return newState;
    default:
      return state;
  }
};

export default foodsReducer;
