import { useState  } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserAnswers, postNewAnswer } from '../../../store/answers';
import { postNewImages } from '../../../store/images';
import { getQuestionDetails } from '../../../store/questions';
import { useEffect } from 'react';
// import UploadImages from '../../DragAndDropImages/UploadImages';
import './PostAnswer.css'

function PostAnswer() {
    let { questionId } = useParams();
    questionId = parseInt(questionId)
    const user = useSelector((state) => state.session.user?.id);
    const userAnswersObj = useSelector((state) => state.answers);
    let hasAnswer = Object.values(userAnswersObj).find((answer) => answer.userId === user && answer.questionId === questionId)
    let imageableType='answer'
    const dispatch = useDispatch();

    const [description, setDescription] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [errors, setErrors] = useState({})
    function convertImageToBase64(file) {
        const reader = new FileReader();
        return new Promise(res => {
            reader.onload = () => {
                res(reader.result);
            };
            reader.readAsDataURL(file);
        });
    }

    useEffect(() => {
        dispatch(getUserAnswers());
    }, [dispatch]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const newAnswer = {
            questionId,
            description,
        };

        let errHits = {}
        if (!questionId) {
            errHits.questionId = "Related Question could not be found";
        }
        if (description.length < 100 || description.length > 3000) {
            errHits.description = "Answer must be between 100 and 3,000 characters.";
        }
        setErrors(errHits);
        if (!Object.values(errHits).length) {
            const answer = await new Promise(res => dispatch(postNewAnswer(newAnswer)).then(res));
            setDescription('')
            if (selectedImages.length) {
                let imageableId = answer.id
                const base64Images = await Promise.all(selectedImages.map(convertImageToBase64));
                await new Promise(res => dispatch(postNewImages(base64Images, imageableType, imageableId)).then(res));
                setSelectedImages([])
            }

        }
        await dispatch(getUserAnswers())
        await new Promise(res => dispatch(getQuestionDetails(questionId)).then(res));
    };

    return (
        !user ? <div className='loginToPostAnswer'>Log in to post an answer!</div>
        : !hasAnswer ?
            <div className='postAnswerSection'>
                <form onSubmit={onSubmit} className='postAnswerForm'>
                    <h3 className='responseH3'>Your Response</h3>
                    <label htmlFor='description'>
                        <textarea
                            placeholder='Describe the question in great detail. Length (100-2500 characters)'
                            className='postAnswerDescription'
                            id='description'
                            type='text'
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                        >
                        </textarea>
                        <div className={(description.length < 100 || description.length > 3000 ? 'tooLong' : '')}>Answer length: {description.length}</div>
                    </label>
                    <div>{errors.description && <div className='error'>{errors.description}</div>}</div>
                    <div className='uploadedImagesDiv'>
                        {selectedImages.map(img => (
                        <div key={img} className='uploadedImgDivs'>
                            <img
                                className='uploadedImg'
                                alt="not found"
                                // width={"250px"}
                                src={URL.createObjectURL(img)}
                            />
                            <span onClick={() => setSelectedImages(selectedImages.filter((keptImgs) => keptImgs !== img))} className='removeQImageButton'>Remove Image</span>
                        </div>
                        ))}
                    </div>
                    <div className='imageUploadDiv'>
                        <input
                            id='file-upload-button'
                            type="file"
                            accept="image/*"
                            size='10%'
                            onChange={(event) => {
                            setSelectedImages(selectedImages => [...selectedImages, ...event.target.files]);
                            }}
                        />
                    </div>
                    <div>
                        <button disabled={!description} onSubmit={onSubmit} className='submitAnswerBtn'>Submit Answer</button>
                    </div>
                </form>
            </div>
        : null
  );
}

export default PostAnswer
