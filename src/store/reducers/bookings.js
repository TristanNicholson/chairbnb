import * as actionTypes from '../actions/actionTypes';

const initialState = {
    creatingBooking: false,
    createBookingSuccess: false,
    createBookingFailure: false,
    fetchingBookings: false,
    fetchBookingsFailure: false,
    fetchBookingsSuccess: false,
    hostBookings: [],
    guestBookings: []
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.CREATE_BOOKING_SUCCESS):
            return {
                ...state,
                createBookingSuccess: true,
                createBookingFailure: false,
                creatingBooking: false
            };
        case(actionTypes.CREATE_BOOKING_FAILURE):
            return {
                ...state,
                createBookingSuccess: false,
                createBookingFailure: true,
                creatingBooking: false
            };
        case(actionTypes.INIT_CREATE_BOOKING):
            return {
                ...state,
                createBookingSuccess: false,
                createBookingFailure: false,
                creatingBooking: true
            };
        case(actionTypes.INIT_FETCH_BOOKINGS):
            return {
                ...state,
                fetchingBookings: true,
                fetchBookingsSuccess: false,
                fetchBookingsFailure: false
            };
        case(actionTypes.FETCH_BOOKINGS_SUCCESS):
            return {
                ...state,
                fetchBookingsSuccess: true,
                fetchingBookings: false,
                hostBookings: action.bookings.host,
                guestBookings: action.bookings.guest
            };
        case(actionTypes.FETCH_BOOKINGS_FAILURE):
            return {
                ...state,
                fetchBookingsSuccess: false,
                fetchingBookings: true
            };
        case(actionTypes.INIT_DENY_ACCEPT_BOOKING):
            return {
                ...state,
                denyAcceptBooking: true
            };
        case(actionTypes.DENY_ACCEPT_SUCCESS):
            return {
                ...state,
                denyAcceptBooking: false
            };
        default:
            return state;
    }
};

export default reducer;