import * as actionTypes from '../actions/actionTypes';

const initialState = {
    listings: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.FETCH_USER_LISTINGS):
        console.log(action.payload);
            return {
                ...state,
                listings: action.payload
            };
        default:
            return state;
    }
};

export default reducer;