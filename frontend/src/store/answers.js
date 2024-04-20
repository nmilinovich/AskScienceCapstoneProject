import { csrfFetch } from "./csrf";
const LOAD_USERANSWERS = 'load/answer';
const CREATE_ANSWER = 'create/answer';
const UPDATE_ANSWER = 'update/answer';
const DELETE_ANSWER = 'delete/answer';

export const loadUserAnswers = (payload) => ({
    type: LOAD_USERANSWERS,
    payload
});

export const postAnswer = (answer) => ({
    type: CREATE_ANSWER,
    answer
});

export const updateAnswer = (answer) => ({
    type: UPDATE_ANSWER,
    answer
});

export const deleteAnswer = (answerId) => ({
    type: DELETE_ANSWER,
    answerId
});

export const getUserAnswers = () => async (dispatch) => {

    const res = await csrfFetch("/api/answers/current");
    if (res.ok) {
      const data = await res.json();
      dispatch(loadUserAnswers(data));
      return data;
    }
    return res;
};

export const postNewAnswer = (answer) => async (dispatch) => {
    console.log(answer)
    const resAnswer = await csrfFetch("/api/answers",
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(answer)
        }
    );
    if (resAnswer.ok) {
        const newAnswer = await resAnswer.json();
        dispatch(postAnswer(newAnswer));
        return newAnswer;
    }
    return resAnswer
};

export const editAnswer = (answer) => async (dispatch) => {
    const resAnswer = await csrfFetch("/api/answers",
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "PATCH",
            body: JSON.stringify(answer)
        }
    );
    if (resAnswer.ok) {
        const editedAnswer = await resAnswer.json();
        dispatch(updateAnswer(editedAnswer));
        return editAnswer;
    }
    return resAnswer
};

export const removeAnswer = (answerId) => async (dispatch) => {
    const deletedAnswer = await csrfFetch(`/api/answers/${answerId}`,
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "DELETE",
        }
    );
    await dispatch(deleteAnswer(answerId));
    return deletedAnswer;
}

const answersReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_USERANSWERS:
            action.payload.Answers.forEach((answer) => {
            newState[answer.id] = answer;
            });
            // newState["page"] = action.payload.page;
            // newState["size"] = action.payload.size;
            return newState;
        case CREATE_ANSWER:
            newState[action.answer.id] = {...newState[action.answer.id], ...action.answer}
            return newState;
        case UPDATE_ANSWER:
            newState[action.answer.id] = {...action.answer}
            return newState;
            case DELETE_ANSWER:
                delete newState[action.answerId]
                return newState;
        default:
            return state;
    }
}

export default answersReducer
