import * as actionTypes from '../actions/actionTypes';

const initialState = {
    location: '',
    checkInDate: '',
    checkOutDate: '',
    guests: {
        adults: 0,
        children: 0,
        infants: 0
    },
    listings: [],
    refinedLocation: '',
    totalListings: 0
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.SET_LOCATION):
            return {
                ...state,
                guests: {...state.guests},
                location: action.location
            };
        case(actionTypes.SET_CHECK_IN_DATE):
            let newCheckOut = state.checkOutDate;
            let newCheckIn = action.date;
            
            if((new Date(action.date)) > (new Date(state.checkOutDate))){
                newCheckOut = '';
                newCheckIn = action.date;
            }
            return {
                ...state,
                guests: {...state.guests},
                checkInDate: newCheckIn,
                checkOutDate: newCheckOut
            };
        case(actionTypes.SET_CHECK_OUT_DATE):
            let newCheckOutDate = action.date;
            let newCheckInDate = state.checkInDate;
            
            if((new Date(action.date)) < (new Date(state.checkInDate))){
                newCheckOutDate = '';
                newCheckInDate = action.date;
            }
            return {
                ...state,
                guests: {...state.guests},
                checkOutDate: newCheckOutDate,
                checkInDate: newCheckInDate
            };
        case(actionTypes.ADD_GUEST):
            if(state.guests[action.guestType] === 16 && action.guestType === 'adults'){
                return state;
            }
            if(state.guests[action.guestType] === 5 && action.guestType === 'children'){
                return state;
            }
            if(state.guests[action.guestType] === 5 && action.guestType === 'infants'){
                return state;
            }
            return {
                ...state,
                guests: {
                    ...state.guests,
                    [action.guestType]: state.guests[action.guestType] + 1
                }        
            };
        case(actionTypes.REMOVE_GUEST):
            if(state.guests[action.guestType] === 0){
                return state;
            }
            return {
                ...state,
                guests: {
                    ...state.guests,
                    [action.guestType]: state.guests[action.guestType] - 1
                }        
            };
        case(actionTypes.SET_GUESTS):
            return {
                ...state,
                guests: action.guests
            };
        case(actionTypes.CLEAR_GUESTS):
            return {
                ...state,
                guests: {
                    adults: 0,
                    children: 0,
                    infants: 0
                }
            };
        case(actionTypes.SUBMIT_SEARCH):
            
            return {
                ...state,
                listings: action.listings.data,
                refinedLocation: action.listings.name,
                totalListings: action.listings.totalListings
            };
        default:
            return state;
    }
};

export default reducer;