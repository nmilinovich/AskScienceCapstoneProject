import { csrfFetch } from "./csrf";
const LOAD_QUESTIONS = 'load/questions';
const LOAD_QUESTION = 'load/question';
const CREATE_QUESTION = 'create/question';
const DELETE_QUESTION = 'delete/question';
const UPDATE_QUESTION = 'update/question';

// action creators
export const loadQuestions = (payload) => ({
    type: LOAD_QUESTIONS,
    payload
});

export const loadQuestion = (question) => ({
    type: LOAD_QUESTION,
    question
});

export const postQuestion = (question) => ({
    type: CREATE_QUESTION,
    question
});

export const deleteQuestion = (questionId) => ({
    type: DELETE_QUESTION,
    questionId
});

export const updateQuestion = (question) => ({
    type: UPDATE_QUESTION,
    question
});

// thunks
export const getQuestions = () => async (dispatch) => {
    const res = await csrfFetch("/api/questions");
    if (res.ok) {
      const data = await res.json();
      dispatch(loadQuestions(data));
      return data;
    }
    return res;
};

export const getQuestionDetails = (questionId) => async (dispatch) => {
    const res = await csrfFetch(`/api/questions/${questionId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadQuestion(data));
        return data;
    }
    return res;
};

export const postNewQuestion = (question, imageURLs) => async (dispatch) => {

    const res = await csrfFetch("/api/questions/current",
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(question)
        }
    );
    const newQuestion = await res.json();
    const questionImgs = [];
    for (let i = 0; i < imageURLs.length; i++) {
        const imgURL = imageURLs[i];
        const newImage = await csrfFetch(`/api/images`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({
                    imageableType: 'question',
                    imageableId: question.id,
                    url: imgURL
                })
            }
        );
        if (res.ok) {
            questionImgs.push(newImage);
        }
    }
    newQuestion.Images = questionImgs;
    dispatch(postQuestion(newQuestion));
    return newQuestion;
};

export const removeQuestion = (questionId) => async (dispatch) => {

    const deletedQuestion = await csrfFetch(`/api/questions/${questionId}`,
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "DELETE",
        }
    );
    await dispatch(deleteQuestion(questionId));
    return deletedQuestion;
}

export const editQuestion = (question) => async (dispatch) => {
    const resQuestion = await csrfFetch(`/api/question/${question.id}`,
        {
            headers: {
            'Content-Type': 'application/json'
            },
            method: "PUT",
            body: JSON.stringify(question)
        }
    );
    const editedQuestion = await resQuestion.json();
    // const questionImgs = [];
    // for (let i = 0; i < imageURLs.length; i++) {
    //     const imgURL = imageURLs[i];
    //     const newImage = await csrfFetch(`/api/spots/${editedSpot.id}/images`,
    //         {
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             method: "POST",
    //             body: JSON.stringify({
    //                 url: imgURL,
    //                 preview: i === 0,
    //             })
    //         }
    //     );
    //     spotImgs.push(newImage);
    // }
    // editedSpot.SpotImages = spotImgs;
    dispatch(updateQuestion(editedQuestion));
    return editedQuestion;
};

const questionsReducer = (state = {}, action) => {
    const newState = {...state}
    switch (action.type) {
        case LOAD_QUESTIONS:
            action.payload.Questions.forEach((question) => {
            newState[question.id] = question;
            });
            // newState["page"] = action.payload.page;
            // newState["size"] = action.payload.size;
            return newState;
        case LOAD_QUESTION:
            newState[action.question.id] = {...newState[action.question.id], ...action.question}
            return newState;
        case CREATE_QUESTION:
            newState[action.question.id] = {...newState[action.question.id], ...action.question}
            return newState;
        case UPDATE_QUESTION:
            newState[action.question.id] = {...action.question}
            return newState;
        case DELETE_QUESTION:
            delete newState[action.questionId];
            return newState;
        default:
            return state;
    }
}

export default questionsReducer
