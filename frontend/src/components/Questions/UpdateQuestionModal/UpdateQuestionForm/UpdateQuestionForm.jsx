import { useState  } from 'react';
// import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getQuestionDetails, postNewQuestion } from '../../../../store/questions';
import postNewImages from '../../../../store/images'
// import { useNavigate } from "react-router-dom"
// import { getQuestionDetails } from '../../../store/questions';
// import UploadImages from '../../DragAndDropImages/UploadImages';
// import './PostQuestionPage.css'

function UpdateQuestionForm(user, response, imageableType) {
    // const navigate = useNavigate()
    const dispatch = useDispatch();
    const [title, setTitle] = useState(response.title || '');
    const [description, setDescription] = useState(response.description || '');
    const [type, setType] = useState(response.type || '');
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

    // useEffect(() => {
    //     dispatch(getQuestionDetails(questionId));
    // }, [dispatch, questionId]);

    const onSubmit = async (e) => {
        console.log(selectedImages)
        e.preventDefault();
        setErrors({});
        const updatedQuestion = {
            title,
            description,
            type,
        };
        let errHits = {}
        // if (description.length < 30) {
        //     errHits.description = "Description must be more than 30 characters.";
        // }
        setErrors(errHits);
        if (!Object.values(errors).length) {
            const question = await new Promise(res => dispatch(postNewQuestion(updatedQuestion)).then(res));
            setDescription('')
            if (selectedImages.length) {
                let imageableId = question.id
                const base64Images = await Promise.all(selectedImages.map(convertImageToBase64));
                await new Promise(res => dispatch(postNewImages(base64Images, imageableType, imageableId)).then(res));
                setSelectedImages([])
            }
            await new Promise(res => dispatch(getQuestionDetails(question.id)).then(res));
            // navigate(`/questions/${question.id}`)
        }
    };

    return (
        user ?
            <div >
                <button onClick={() => setType('biology')}>Biology</button>
                <button onClick={() => setType('chemistry')}>Chemistry</button>
                <button onClick={() => setType('physics')}>Physics</button>
                {console.log(type)}
                <form onSubmit={onSubmit} className='postQuestionForm'>
                    <h3 className='responseH3'>Your Question</h3>
                    <label htmlFor='description'>
                        <input
                            placeholder='Please write at least 30 characters'
                            id='title'
                            type='text'
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                        />
                    </label>
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
                    <button disabled={!description} onSubmit={onSubmit}>Submit Question</button>
                </form>
            </div>
        :
        <div>Log in to post a question!</div>
  );
}

export default UpdateQuestionForm
