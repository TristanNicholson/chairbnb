import * as actionTypes from './actionTypes';

export const setLocation = (location) => {
    return {
        type: actionTypes.SET_LOCATION,
        location: location
    };
};

export const addGuest = (guestType) => {
    return {
        type: actionTypes.ADD_GUEST,
        guestType: guestType
    };
};

export const removeGuest = (guestType) => {
    return {
        type: actionTypes.REMOVE_GUEST,
        guestType: guestType
    };
};

export const clearGuests = () => {
    return {
        type: actionTypes.CLEAR_GUESTS
    };
};

export const setCheckInDate = (date) => {
    return {
        type: actionTypes.SET_CHECK_IN_DATE,
        date: date
    };
};

export const setCheckOutDate = (date) => {
    return {
        type: actionTypes.SET_CHECK_OUT_DATE,
        date: date
    };
};