import * as actionTypes from '../actions/actionTypes';

const initialState = {
    center: [0,0]
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.SET_CENTER_MAP):
            let latLng = [action.center[1], action.center[0]];

            return {
                ...state,
                center: latLng
            };
        default:
            return state;
    }
}

export default reducer;