import * as actionTypes from './actionTypes';

export const createListing = () => {
    return dispatch => {
        var myHeaders = new Headers();
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('x-auth-token', localStorage.getItem('token'));
        fetch('https://chairbnb123-backend.herokuapp.com/api/listings/create', {
            method: "GET",
            headers: myHeaders,
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            dispatch(createListingSuccess(data));
        })
        .catch(err=>console.error(err));
    }
}

export const createListingSuccess = (id) => {
    return {
        listingId: id,
        type: actionTypes.CREATE_LISTING
    }
}

export const uploadingImage = () => {
    return {
        action: actionTypes.UPLOADING_IMAGE
    }
}

export const uploadImage = (listingId, image) => {
    return dispatch => {
        var myHeaders = new Headers();
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('x-auth-token', localStorage.getItem('token'));
        let formData = new FormData();
        formData.append('listingImage',image);

        fetch('https://chairbnb123-backend.herokuapp.com/api/listings/'+listingId+'/manage/addImage', {
            method: "POST",
            headers: myHeaders,
            mode: 'cors',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            dispatch(uploadSuccess(data));
        })
        .catch(err=>console.error(err));
    };
}

export const uploadSuccess = (data) => {
    return {
        type: actionTypes.UPLOAD_IMAGE,
        images: data
    };
};

export const setListingSuccess = (data) => {
    return {
        type: actionTypes.SET_LISTING,
        listingId: data._id,
        payload: data
    }
};

export const setListing = (listingId) => {
    return dispatch => {
        var myHeaders = new Headers();
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('x-auth-token', localStorage.getItem('token'));
        fetch('https://chairbnb123-backend.herokuapp.com/api/listings/'+listingId+'/manage/listing', {
            method: "GET",
            headers: myHeaders,
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dispatch(setListingSuccess(data));
        })
        .catch(err=>console.error(err));
    };
}

export const initSaveListing = () => {
    return {
        type: actionTypes.INIT_SAVE_LISTING
    };
}

export const saveListing = (listingId, data) => {
    return dispatch => {
        var myHeaders = new Headers();
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('x-auth-token', localStorage.getItem('token'));
        myHeaders.append('Content-Type', 'application/json');
        fetch('https://chairbnb123-backend.herokuapp.com/api/listings/'+listingId+'/manage/save', {
            method: "POST",
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dispatch(saveListingSuccess(data));
        })
        .catch(err=>{
            console.error(err);
            dispatch(saveListingSuccess())
        });
    };
}

export const saveListingSuccess = (data) => {
    return {
        type: actionTypes.SAVE_LISTING,
        listing: data
    }
}

export const saveListingFail = () => {

}

export const deleteImage = (listingId, image) => {
    return dispatch => {
        console.log(image);
        var myHeaders = new Headers();
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('x-auth-token', localStorage.getItem('token'));
        myHeaders.append('Content-Type', 'application/json');

        fetch('https://chairbnb123-backend.herokuapp.com/api/listings/'+listingId+'/manage/deleteImage', {
            method: "DELETE",
            headers: myHeaders,
            mode: 'cors',
            body: JSON.stringify({image: image})
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dispatch(deleteSuccess(data));
        })
        .catch(err=>{
            console.error(err);
            dispatch(deleteSuccess());
        });
    };
}

export const deleteSuccess = (data) => {
    return {
        type: actionTypes.DELETE_IMAGE,
        images: data
    }
}

export const deleteListing = (listingId) => {
        var myHeaders = new Headers();
        myHeaders.append('Access-Control-Allow-Origin', '*');
        myHeaders.append('x-auth-token', localStorage.getItem('token'));
        myHeaders.append('Content-Type', 'application/json');

        fetch('https://chairbnb123-backend.herokuapp.com/api/listings/'+listingId+'/manage/delete', {
            method: "DELETE",
            headers: myHeaders,
            mode: 'cors'
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(err=>{
            console.error(err);
        });
}

export const activateListing = (listingId) => {
    var myHeaders = new Headers();
    console.log('Activate: '+listingId);
    myHeaders.append('Access-Control-Allow-Origin', '*');
    myHeaders.append('x-auth-token', localStorage.getItem('token'));
    myHeaders.append('Content-Type', 'application/json');

    fetch('https://chairbnb123-backend.herokuapp.com/api/listings/'+listingId+'/manage/activate', {
        method: "POST",
        headers: myHeaders,
        mode: 'cors'
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(err=>{
        console.error(err);
    });
}