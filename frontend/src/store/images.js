import { csrfFetch } from "./csrf";
const CREATE_IMAGES = 'create/image';
const UPDATE_IMAGES = 'update/image';
const DELETE_IMAGE = 'delete/image';

export const postImages = (image) => ({
    type: CREATE_IMAGES,
    image
});

export const deleteImage = (imageId) => ({
    type: DELETE_IMAGE,
    imageId
});

export const postNewImages = (imageURLs, imageableType, imageableId) => async () => {
    return await Promise.all(imageURLs.map((image) => {
        return csrfFetch('/api/images/',
            {
                headers: {
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(
                    {
                        url: image,
                        imageableType,
                        imageableId
                    }
                )
            }
        );
    }));
};

export const editImages = (imageURLs, imageableType, imageableId, imageId) => async () => {
    return await Promise.all(imageURLs.map((image) => {
        return csrfFetch(`/api/images/${imageId}`,
            {
                headers: {
                'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify(
                    {
                        url: image,
                    }
                )
            }
        );
    }));
};

export const removeImage = (imageId) => async (dispatch) => {
    const deletedImage = await csrfFetch(`/api/images/${imageId}`,
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "DELETE",
        }
    );
    dispatch(deleteImage(imageId));
    return deletedImage;
}

const imagesReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case CREATE_IMAGES:
            action.payload.Images.forEach((image) => {
            newState[image.id] = image;
            });
            // newState["page"] = action.payload.page;
            // newState["size"] = action.payload.size;
            return newState;
        case UPDATE_IMAGES:
            return newState
        case DELETE_IMAGE:
            delete newState[action.imageId]
            return newState
        default:
            return state;
    }
}

export default imagesReducer
