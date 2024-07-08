import { csrfFetch } from "./csrf";
// const LOAD_USERANSWERS = 'load/answer';
const CREATE_COMMENT = 'create/comment';
const UPDATE_COMMENT = 'update/comment';
const DELETE_COMMENT = 'delete/comment';

// export const loadUserAnswers = (payload) => ({
//     type: LOAD_USERANSWERS,
//     payload
// });

export const postComment = (comment) => ({
    type: CREATE_COMMENT,
    comment
});

export const updateComment = (comment) => ({
    type: UPDATE_COMMENT,
    comment
});

export const deleteComment = (commentId) => ({
    type: DELETE_COMMENT,
    commentId
});

// export const getUserAnswers = () => async (dispatch) => {

//     const res = await csrfFetch("/api/answers/current");
//     if (res.ok) {
//       const data = await res.json();
//       dispatch(loadUserAnswers(data));
//       return data;
//     }
//     return res;
// };

export const postNewComment = (comment) => async (dispatch) => {
    const resComment = await csrfFetch("/api/comments",
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(comment)
        }
    );
    console.log(resComment)
    if (resComment.ok) {
        const newComment = await resComment.json();
        dispatch(postComment(newComment));
        return newComment;
    }
    return resComment
};

export const editComment = (comment, commentId) => async (dispatch) => {
    const resComment = await csrfFetch(`/api/comments/${commentId}`,
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "PATCH",
            body: JSON.stringify(comment)
        }
    );
    if (resComment.ok) {
        const editedComment = await resComment.json();
        await dispatch(updateComment(editedComment));
        return await editedComment;
    }
    return resComment
};

export const removeComment = (commentId) => async (dispatch) => {
    const deletedComment = await csrfFetch(`/api/comment/${commentId}`,
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "DELETE",
        }
    );
    await dispatch(deleteComment(commentId));
    return deletedComment;
}

const commentsReducer = async (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        // case LOAD_USERANSWERS:

        //     action.payload.Answers.map((answer) => {
        //         newState[answer.id] = answer
        //     });

        //     // export function rootLevelReducer(state, action){
        //     //     return {
        //     //         ...state,
        //     //         firstLevel: {
        //     //             ...state.firstLevel,
        //     //             secondLevel: {
        //     //                 ...state.firstLevel.secondLevel,
        //     //                 thirdLevel: {
        //     //                     ...state.firstLevel.secondLevel.thirdLevel,
        //     //                     property1: action.data
        //     //                 }
        //     //             }
        //     //         }
        //     //     }
        //     // }
        //     // action.payload.Answersanswer.Images.forEach((image) => {
        //     //     newState.images[image.id] = {id: image.id, userId: image.userId, url: image.url, imageableType: image.imageableType, imageableId: image.imageableId}
        //     // })
        //     // answer.Images.forEach((image) => {
        //     //     newState[answer.Id].Images[image?.id] = {...newState[answer.Id].Images[image.id], ...image}
        //     // })
        //     // newState["page"] = action.payload.page;
        //     // newState["size"] = action.payload.size;
        //     return newState;
        case CREATE_COMMENT:
            newState[action.comment.id] = {...newState[action.comment.id], ...action.comment}
            return newState;
        case UPDATE_COMMENT:
            newState[action.comment.id] = {...newState[action.comment.id], ...action.comment}
            return newState;
            case DELETE_COMMENT:
                delete newState[action.commentId]
                return newState;
        default:
            return state;
    }
}

export default commentsReducer
