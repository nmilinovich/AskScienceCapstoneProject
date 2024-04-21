import { csrfFetch } from "./csrf";
const CREATE_IMAGES = 'create/image';
// const UPDATE_IMAGES = 'update/image';

export const postImages = (image) => ({
    type: CREATE_IMAGES,
    image
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

    // return imageURLs.forEach( async (image) => {
    //     const resImage = csrfFetch('/api/images/',
    //         {
    //             headers: {
    //             'Content-Type': 'application/json'
    //             },
    //             method: "POST",
    //             body: JSON.stringify(
    //                 {
    //                     url: image,
    //                     imageableType,
    //                     imageableId
    //                 }
    //             )
    //         }
    //     );
    //     if (resImage.ok) {
    //         const newImage = await resImage.json();
    //         dispatch(postImages(newImage));
    //         return newImage;
    //     }
    //     return resImage;
    // })
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
