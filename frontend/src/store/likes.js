import { csrfFetch } from "./csrf";
const LOAD_USERLIKES = 'load/like';
const CREATE_LIKE = 'create/like';
const DELETE_LIKE = 'delete/like';
const UPDATE_LIKE = 'update/like';

export const loadLikes = (payload) => ({
    type: LOAD_USERLIKES,
    payload
});

export const postLike = (like) => ({
    type: CREATE_LIKE,
    like
});

export const deleteLike = (likeId) => ({
    type: DELETE_LIKE,
    likeId
});

export const updateLike = (like) => ({
    type: UPDATE_LIKE,
    like
});

export const getUserLikes = () => async (dispatch) => {

    const res = await csrfFetch("/api/likes/current");
    if (res.ok) {
      const data = await res.json();
      dispatch(loadLikes(data));
      return data;
    }
    return res;
};

export const postNewLike = (like) => async (dispatch) => {
    const resLike = await csrfFetch("/api/likes",
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(like)
        }
    );
    if (resLike.ok) {
        const newLike = await resLike.json();
        dispatch(postLike(newLike));
        return newLike;
    }
    return resLike
};

export const editLike = (like) => async (dispatch) => {
    console.log(like)
    const resLike = await csrfFetch("/api/likes",
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "PATCH",
            body: JSON.stringify(like)
        }
    );
    if (resLike.ok) {
        const editedLike = await resLike.json();
        dispatch(postLike(editedLike));
        return editedLike;
    }
    return resLike
};

const likesReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_USERLIKES:
            action.payload.Likes.forEach((like) => {
            newState[like.id] = like;
            });
            // newState["page"] = action.payload.page;
            // newState["size"] = action.payload.size;
            return newState;
        case CREATE_LIKE:
            newState[action.like.id] = {...newState[action.like.id], ...action.like}
            return newState;
        case UPDATE_LIKE:
            newState[action.like.id] = {...action.like}
            return newState;
        default:
            return state;
    }
}

export default likesReducer
