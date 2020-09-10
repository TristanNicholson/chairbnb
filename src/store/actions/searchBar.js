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

export const setGuests = (guests) => {
    return {
        type: actionTypes.SET_GUESTS,
        guests: guests
    };   
}

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

export const setListings = (listings) => {
    return {
        type: actionTypes.SUBMIT_SEARCH,
        listings: listings
    };
};

export const setCenterMap = (center) => {
    return {
        type: actionTypes.SET_CENTER_MAP,
        center: center
    };
}

export const searchFailed = () => {
    console.log('Search Failed');
};

export const submitSearch = (search) => {
    return dispatch => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        fetch('http://localhost:5000/api/listings', {
            method: "POST",
            body: JSON.stringify(search),
            headers: myHeaders,
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            dispatch(setListings(data));
            dispatch(setCenterMap(data.center));
        })
        .catch(err=>console.error(err));
    }
};