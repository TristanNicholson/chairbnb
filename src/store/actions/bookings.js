import * as actionTypes from './actionTypes';

export const initCreateBooking = () => {
    return {
        type: actionTypes.INIT_CREATE_BOOKING
    };
}
export const createBooking = (listingId, startDate, endDate, guests) => {
    return dispatch => {
        dispatch(initCreateBooking());
        console.log(listingId +' '+ startDate+' '+ endDate+' '+ guests.adults);
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('x-auth-token', localStorage.getItem('token'));
        fetch('https://chairbnb123-backend.herokuapp.com/api/bookings', {
            method: "POST",
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify({
                listingId: listingId,
                startDate: startDate,
                endDate: endDate,
                guests: guests
            })
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dispatch(createBookingSuccess());
        })
        .catch(err=>console.error(err));
    };
};

export const createBookingSuccess = () => {
    return {
        type: actionTypes.CREATE_BOOKING_SUCCESS
    };
}

export const createBookingFailure = () => {
    return {
        type: actionTypes.CREATE_BOOKING_FAILURE
    };
}

export const fetchBookings = () => {
    return dispatch => {
        dispatch(initFetchBookings());
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('x-auth-token', localStorage.getItem('token'));
        fetch('https://chairbnb123-backend.herokuapp.com/api/bookings', {
            method: "GET",
            headers: myHeaders,
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(data.bookings){
                dispatch(fetchBookingsSuccess(data.bookings));
            }
        })
        .catch(err=>console.error(err));
    };
};

export const initFetchBookings = () => {
    return {
        type: actionTypes.INIT_FETCH_BOOKINGS
    };
};

export const fetchBookingsSuccess = (bookings) => {
    return {
        type: actionTypes.FETCH_BOOKINGS_SUCCESS,
        bookings: bookings
    };
}

export const fetchBookingsFail = () => {
    return {
        type: actionTypes.FETCH_BOOKINGS_FAILURE
    };
}

export const initDenyAcceptBookings = () => {
    return {
        type: actionTypes.INIT_DENY_ACCEPT_BOOKING
    };
}

export const denyAcceptSuccess = () => {
    return {
        type: actionTypes.DENY_ACCEPT_SUCCESS
    }
}

export const denyBooking = (bookingId) => {
    console.log('Denying: '+bookingId);
    return dispatch => {
        dispatch(initDenyAcceptBookings());
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('x-auth-token', localStorage.getItem('token'));
        fetch('https://chairbnb123-backend.herokuapp.com/api/bookings/'+bookingId+'/deny', {
            method: "PUT",
            headers: myHeaders,
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            if(data.bookings){
                dispatch(denyAcceptSuccess(data.bookings));
            }
        })
        .catch(err=>console.error(err));
    };
};

export const acceptBooking = (bookingId) => {
    console.log('Accepting: '+bookingId);
    return dispatch => {
        dispatch(initDenyAcceptBookings());
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('x-auth-token', localStorage.getItem('token'));
        fetch('https://chairbnb123-backend.herokuapp.com/api/bookings/'+bookingId+'/accept', {
            method: "PUT",
            headers: myHeaders,
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            if(data.bookings){
                dispatch(denyAcceptSuccess(data.bookings));
            }
        })
        .catch(err=>console.error(err));
    };
};