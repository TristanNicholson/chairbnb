import * as actionTypes from './actionTypes';

export const setCenterMap = (center) => {
    return {
        type: actionTypes.SET_CENTER_MAP,
        center: center
    }
};
