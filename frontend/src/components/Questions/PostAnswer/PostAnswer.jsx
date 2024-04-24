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
        e.preventDefault();
        setErrors({});
        const newAnswer = {
            questionId,
            description,
        };

        let errHits = {}
        // if (!questionId) {
        //     errHits.questionId = "Related Question could not be found";
        // }
        // if (description.length < 30) {
        //     errHits.description = "Description must be more than 30 characters.";
        // }
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
        !user ? <div>Log in to post an answer!</div> :
        !hasAnswer ?
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
                    <div className="imageUploadContainer">
                        {selectedImages.map(img => (
                            <div key={img}>
                            <img
                                alt="not found"
                                width={"250px"}
                                src={URL.createObjectURL(img)}
                            />
                            <br />
                            <button onClick={() => setSelectedImages(selectedImages.filter((keptImgs) => keptImgs !== img))}>Remove</button>
                            </div>
                        ))}
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(event) => {
                            setSelectedImages(selectedImages => [...selectedImages, ...event.target.files]);
                            }}
                        />
                    </div>
                    <button disabled={!description} onSubmit={onSubmit}>Submit Answer</button>
                </form>
            </div>
            : null
  );
}

export default PostAnswer
