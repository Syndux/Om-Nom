import { csrfFetch } from "./csrf";

const LOAD_ALL_CUISINES = "cuisines/LOAD_ALL_CUISINES";

// AC - Action Creator
const loadAllCuisinesAC = (cuisines) => ({
    type: LOAD_ALL_CUISINES,
    payload: cuisines,
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
export const createCuisine = () => async (dispatch) => {
    return null;
}

// Edit a cuisine
export const updateCuisine = () => async (dispatch) => {
    return null;
}

// Delete a cuisine
export const deleteCuisine = () => async (dispatch) => {
    return null;
}

const initialState = {};

const cuisinesReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_ALL_CUISINES:
            const cuisinesMap = {};
            action.payload.forEach((cuisine) => {
                cuisinesMap[cuisine.id] = cuisine;
            });
            return cuisinesMap;
        default:
            return state;
    }
};

export default cuisinesReducer;