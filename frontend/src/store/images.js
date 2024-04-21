import { csrfFetch } from "./csrf";
const CREATE_IMAGES = 'create/image';
const UPDATE_IMAGES = 'update/image';

export const postImages = (imageURLs) => ({
    type: CREATE_IMAGES,
    imageURLs
});

export const postNewImages = (imageURLs, imageableType, imageableId) => async (dispatch) => {

    imageURLs.forEach(async (image) => {
        const resImage = await csrfFetch('/api/images/',
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
        console.log(resImage)
        return resImage
    })
};

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
        default:
            return state;
    }
}

export default imagesReducer