import { csrfFetch } from "./csrf";
const LOAD_USERLIKES = 'load/like';
const CREATE_LIKE = 'create/like';
const UPDATE_LIKE = 'update/like';
const DELETE_LIKE = 'delete/like';

export const loadLikes = (payload) => ({
    type: LOAD_USERLIKES,
    payload
});

export const postLike = (like) => ({
    type: CREATE_LIKE,
    like
});

export const updateLike = (like) => ({
    type: UPDATE_LIKE,
    like
});

export const deleteLike = (likeId) => ({
    type: DELETE_LIKE,
    likeId
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
    console.log(like)
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
        dispatch(updateLike(editedLike));
        return editedLike;
    }
    return resLike
};

export const removeLike = (likeId) => async (dispatch) => {
    console.log('LIKEID', likeId)
    const deletedLike = await csrfFetch(`/api/likes/${likeId}`,
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "DELETE",
        }
    );
    await dispatch(deleteLike(likeId));
    return deletedLike;
}

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
            case DELETE_LIKE:
                delete newState[action.likeId]
                return newState;
        default:
            return state;
    }
}

export default likesReducer
