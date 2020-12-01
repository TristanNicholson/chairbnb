import * as actionTypes from './actionTypes';

export const signIn = (data) => {
    return dispatch => {
        dispatch(initSignUpIn());
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Access-Control-Allow-Origin', '*');
        fetch('https://chairbnb123-backend.herokuapp.com/api/auth', {
            method: "POST",
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.errors){
                dispatch(signUpInFailed(data.errors));
            }else if(data.token && data.userId){
                dispatch(saveLoginToken(data));
            }else{
                dispatch(signUpInFailed(['Something went wrong']));
            }
        })
        .catch(err=>console.error(err));
    };
};

export const signUp = (form) => {
    return dispatch => {
        dispatch(initSignUpIn());
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Access-Control-Allow-Origin', '*');
        fetch('https://chairbnb123-backend.herokuapp.com/api/users', {
            method: "POST",
            mode: 'cors',
            headers: myHeaders,
            body: JSON.stringify({
                email: form.email,
                password: form.password,
                name: form.name
            })
        })
        .then(response => response.json())
        .then(data => {
            if(data.errors){
                dispatch(signUpInFailed(data.errors));
            }else if(data.token && data.userId){
                dispatch(saveLoginToken(data));
            }else{
                dispatch(signUpInFailed(['Something went wrong']));
            }
        })
        .catch(err=>{
            console.error(err);
            dispatch(authNetworkError());
        });
    };
};

export const signUpInFailed = (err) => {
    return {
        type: actionTypes.SIGN_UP_IN_FAILED,
        errors: err
    };
}

export const authNetworkError = (err) => {
    return {
        type: actionTypes.AUTH_NETWORK_ERROR
    };
}

export const initSignUpIn = () => {
    return {
        type: actionTypes.INIT_SIGN_UP_IN
    };
}

export const saveLoginToken = (payload) =>{
    return {
        type: actionTypes.SIGN_IN,
        payload: payload
    };
};

export const checkAuth = () => {
    return dispatch => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('x-auth-token', localStorage.getItem('token'));
        fetch('https://chairbnb123-backend.herokuapp.com/api/auth/', {
            method: "GET",
            headers: myHeaders,
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            dispatch(setAuth(data));
        })
        .catch(err=>console.error(err));
    };
}

export const setAuth = (data) => {
    return {
        type: actionTypes.CHECK_AUTH,
        payload: data
    }
}

export const signOut = () => {
    console.log('sign out');
    return {
        type: actionTypes.SIGN_OUT
    };
}