import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: localStorage.getItem('token'),
    authenticated: false,
    user: null,
    authenticating: true,
    signingUpIn: false,
    errors: [],
    signUpInSuccess: false
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.SIGN_IN):
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                authenticated: true,
                user: action.payload.userId,
                signingUpIn: false,
                signUpInSuccess: true,
                errors: []
            };
        case(actionTypes.CHECK_AUTH):
            const token = localStorage.getItem('token');
            let auth = {
                ...state,
                token: null,
                authenticated: false,
                user: null,
                authenticating: false,
                errors: []
            };
            if(token !== undefined && token !== null && action.payload.msg === undefined){
                auth = {
                    ...state,
                    token: token,
                    authenticated: true,
                    user: action.payload._id,
                    authenticating: false,
                    errors: []
                };
            }
            return auth;
        case(actionTypes.SIGN_OUT):
            localStorage.removeItem('token');
            return {
                ...state,
                authenticated: false,
                token: null,
                user: null,
                errors: []
            };
        case(actionTypes.INIT_SIGN_UP_IN):
            return {
                ...state,
                signingUpIn: true,
                errors: []
            };
        case(actionTypes.SIGN_UP_IN_FAILED):
            return {
                ...state,
                signingUpIn: false,
                errors: action.errors,
                signUpInSuccess: false
            };
        case(actionTypes.AUTH_NETWORK_ERROR):
            return {
                ...state,
                signingUpIn: false,
                signUpInSuccess: false,
                errors: ['Network error. Try again shortly.']
            }
        default:
            return state;
    }
}

export default reducer;