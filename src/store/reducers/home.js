import * as actionTypes from '../actions/actionTypes';

const initialState = {
    home: null,
    checkOutDate: '',
    checkInDate: ''
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.SET_CURRENT_HOME):
            return {
                ...state,
                home: action.home
            };
        case(actionTypes.SET_HOME_CHECK_IN_DATE):
            return {
                ...state,
                checkInDate: action.date
            };
        case(actionTypes.SET_HOME_CHECK_OUT_DATE):
            return {
                ...state,
                checkOutDate: action.date
            };
        case(actionTypes.CLEAR_HOME_CHECK_IN_DATE):
            return {
                ...state,
                checkInDate: ''
            };
        case(actionTypes.CLEAR_HOME_CHECK_OUT_DATE):
            return {
                ...state,
                checkOutDate: ''
            };
        default:
            return state;
    }
};

export default reducer;