import { useState  } from 'react';
import { useDispatch } from 'react-redux';
import { getQuestionDetails } from '../../../store/questions';
import { editComment } from '../../../store/comments';
import { useModal } from '../../../context/Modal';
// import { useNavigate } from "react-router-dom"
// import UploadImages from '../../DragAndDropImages/UploadImages';

function UpdateCommentForm({user, comment }) {
    // const navigate = useNavigate()
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
    const { closeModal } = useModal()
    const [errors, setErrors] = useState({})
    let url = window.location.href.split('/');
    let questionId = parseInt(url[url.length -1]);
    console.log(questionId)
    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const newComment = {
            description
        };
        let errHits = {}
        if (description.length < 5 || description.length > 3000) {
            errHits.description = "Comment must be between 5 and 3,000 characters.";
        }
        setErrors(errHits);
        console.log(errors)
        if (!Object.values(errors).length) {
            await dispatch(editComment(newComment, comment.id));
            dispatch(getQuestionDetails(questionId));
            closeModal();
        }
    };
    return (
        user ?
        <div className='formDiv'>
            <form onSubmit={onSubmit} className='postAnswerCommentForm'>
                <h1 className='responseH1'>Update Your Comment</h1>
                <div className='typeSelector'>
                </div>
                <div className='newQDescription'>Question Description</div>
                <textarea
                    className='descriptionTextarea'
                    placeholder='Your Comment'
                    id='description'
                    type='text'
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                >
                </textarea>
                <div className='submitQuestionDiv'>
                    <button disabled={!description} onSubmit={onSubmit} className='submitQuestionButton'>Submit Question</button>
                </div>
            </form>
        </div>
        :
        <div>Log in to post a comment!</div>
  );
}

export default UpdateCommentForm
