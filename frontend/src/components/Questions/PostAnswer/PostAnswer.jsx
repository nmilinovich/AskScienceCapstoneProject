import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import UploadImages from '../../DragAndDropImages/UploadImages';
import './PostAnswer.css'

function PostAnswer() {
    const dispatch = useDispatch();
    let { questionId } = useParams();
    questionId = parseInt(questionId)
    const [description, setDescription] = useState('');
    const [urlImages, setUrlImages] = useState([...Array(5)].map(_ => ''));
    const [errors, setErrors] = useState({})
    const onSubmit = e => {
        e.preventDefault();
        setErrors({});
        const newAnswer = {
            questionId,
            description,
        };
        if (!questionId) {
            errHits.questionId = "Related Question could not be found";
        }
        let errHits = {}
        if (!urlImages[0]) {
            errHits.urlImages = "You must provide a preview image for your spot.";
        }
        if (description.length < 30) {
            errHits.description = "Description must be more than 30 characters.";
        }
        setErrors(errHits);
        if (!Object.values(errHits).length) {
            // return dispatch(postNewSpot(newAnswer, urlImages.filter((url) => url)))
            // .catch(async (res) => {
            //     const data = await res.json();
            //     console.log(errors);
            //     console.log(errHits)
            //     return setErrors(errors)
            // });
        }
    };

    return (
        <div >
            <form onSubmit={onSubmit} className='postAnswerForm'>
            <h3 className='responseH3'>Your Response</h3>
                <label htmlFor='description'>
                    <textarea
                        placeholder='Please write at least 30 characters'
                        id='description'
                        type='text'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    >
                    </textarea>
                </label>
                <UploadImages />
                {console.log(UploadImages.selectedImages)}
                <button onSubmit={onSubmit}>Submit Answer</button>
            </form>
        </div>
  );
}

export default PostAnswer
