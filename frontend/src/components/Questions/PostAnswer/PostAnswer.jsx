import { useState  } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postNewAnswer } from '../../../store/answers';
import { postNewImages } from '../../../store/images';
import { getQuestionDetails } from '../../../store/questions';
// import { useEffect } from 'react';
// import UploadImages from '../../DragAndDropImages/UploadImages';
import './PostAnswer.css'

function PostAnswer({ answers }) {
    const user = useSelector((state) => state.session.user?.id);
    // const userAnswersObj = useSelector((state) => state.answers)
    let imageableType='answer'
    const dispatch = useDispatch();
    let { questionId } = useParams();
    questionId = parseInt(questionId)
    const [description, setDescription] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [errors, setErrors] = useState({})
    let hasAnswer = answers.find(answer => answer.userId === user)

    function convertImageToBase64(file) {
        const reader = new FileReader();
        return new Promise(res => {
            reader.onload = () => {
                res(reader.result);
            };
            reader.readAsDataURL(file);
        });
    }

    // useEffect(() => {
    //     dispatch(getQuestionDetails(questionId));
    // }, [dispatch, user]);

    const onSubmit = async (e) => {
        console.log(selectedImages)
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
        if (description.length < 30) {
            errHits.description = "Description must be more than 30 characters.";
        }
        setErrors(errHits);
        if (!Object.values(errors).length) {
            const answer = await new Promise(res => dispatch(postNewAnswer(newAnswer)).then(res));
            setDescription('')
            if (selectedImages.length) {
                let imageableId = answer.id
                const base64Images = await Promise.all(selectedImages.map(convertImageToBase64));
                await new Promise(res => dispatch(postNewImages(base64Images, imageableType, imageableId)).then(res));
                setSelectedImages([])
            }

        }
        await new Promise(res => dispatch(getQuestionDetails(questionId)).then(res));
    };

    return (
        !user ? <div className='loginToPostAnswer'>Log in to post an answer!</div> :
        !hasAnswer ?
            <div className='postAnswerDiv'>
                <form onSubmit={onSubmit} className='postAnswerForm'>
                    <h3 className='responseH3'>Your Response</h3>
                    <div className='descriptionContainer'>
                        <textarea
                            className='descriptionTextarea'
                            placeholder='(30 char min)'
                            id='description'
                            type='text'
                            onChange={e => setDescription(e.target.value)}
                            value={description}
                        >
                        </textarea>
                        <div className={(description.length < 30 || description.length > 3000 ? 'tooLong' : '') + ' lengthDiv'}>Description length: {description.length}</div>
                    </div>
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
                        title=' '
                        accept="image/*"
                        size='10%'
                        onChange={(event) => {
                            setSelectedImages(selectedImages => [...selectedImages, ...event.target.files]);
                        }}
                    />
                    <button type='button' className='replacementFileUploadBtn' onClick={() => document.getElementById('file-upload-button').click()}>
                        Choose File
                    </button>
                </div>
                    <div className='submitNewAnswer'>
                        <button className='submitNewAnswerBtn' disabled={description.length < 30 || description.length > 3000} onSubmit={onSubmit}>Submit Answer</button>
                    </div>
                </form>
            </div>
            : null
  );
}

export default PostAnswer
