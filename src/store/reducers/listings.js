import * as actionTypes from '../actions/actionTypes';

const initialState = {
    uploaded: false,
    uploading: false,
    listingId: '',
    listing: {
        images: {
            gallery: []
        }
    },
    saving: false
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case(actionTypes.CREATE_LISTING):
            return {
                ...state,
                listingId: action.listingId
            };
        case(actionTypes.UPLOADING_IMAGE):
            return {
                ...state,
                uploading: true
            };
        case(actionTypes.UPLOAD_IMAGE):
            return {
                ...state,
                uploaded: true,
                uploading: false,
                listing: {
                    ...state.listing,
                    images: {
                        ...state.listing.images,
                        pictureUrl:  action.images.pictureUrl,
                        thumbnailUrl: action.images.thumbnailUrl,
                        gallery: [...state.listing.images.gallery, action.images.gallery[action.images.gallery.length - 1]]
                    }
                }
            };
        case(actionTypes.SET_LISTING):
            return {
                ...state,
                listingId: action.listingId,
                listing: action.payload
            };
        case(actionTypes.INIT_SAVE_LISTING):
            return {
                ...state,
                saving: true
            };
        case(actionTypes.SAVE_LISTING):
            return {
                ...state,
                saving: false,
                listing: action.listing
            };
        case(actionTypes.DELETE_IMAGE):
            return {
                ...state,
                listing: {
                    ...state.listing,
                    images: action.images
                }
            };
        default:
            return state;
    }
};

export default reducer;