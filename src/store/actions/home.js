import * as actionTypes from './actionTypes';

export const fetchHome = (id) => {
    return dispatch => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        console.log(id);
        fetch('https://chairbnb123-backend.herokuapp.com/api/listings/'+id+'/page', {
            method: "GET",
            headers: myHeaders,
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            dispatch(setCurrentHome(data));
            dispatch(setCenterMap(data.address.location.coordinates));
        })
        .catch(err=>console.error(err));
    };
};

export const setCurrentHome = (data) => {
    return {
        type: actionTypes.SET_CURRENT_HOME,
        home: data
    }
}

export const setHomeCheckInDate = (date) => {
    return {
        type: actionTypes.SET_HOME_CHECK_IN_DATE,
        date: date
    };
};

export const setHomeCheckOutDate = (date) => {
    return {
        type: actionTypes.SET_HOME_CHECK_OUT_DATE,
        date: date
    };
};

export const clearHomeCheckOutDate = () => {
    return {
        type: actionTypes.CLEAR_HOME_CHECK_OUT_DATE
    };
};

export const clearHomeCheckInDate = () => {
    return {
        type: actionTypes.CLEAR_HOME_CHECK_IN_DATE
    };
}

export const setCenterMap = (center) => {
    return {
        type: actionTypes.SET_CENTER_MAP,
        center: center
    };
}