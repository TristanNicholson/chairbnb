import * as actionTypes from './actionTypes';

export const fetchListings = () => {
    return dispatch => {
        console.log('here');
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('x-auth-token', localStorage.getItem('token'));
        fetch('http://localhost:5000/api/listings/manage/all', {
            method: "GET",
            headers: myHeaders,
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dispatch(saveListings(data));
        })
        .catch(err=>console.error(err));
    };
};

export const saveListings = (payload) => {
    return {
        type: actionTypes.FETCH_USER_LISTINGS,
        payload: payload
    }
}