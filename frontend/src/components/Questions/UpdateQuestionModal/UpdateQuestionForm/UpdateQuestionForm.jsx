import { useState  } from 'react';
import { useModal } from '../../../../context/Modal';
import { useDispatch } from 'react-redux';
import { getQuestionDetails, editQuestion } from '../../../../store/questions';
import { postNewImages } from '../../../../store/images';
import './UpdateQuestionForm.css'
// import { useNavigate } from "react-router-dom"
// import UploadImages from '../../DragAndDropImages/UploadImages';
// import './PostQuestionPage.css'

function UpdateQuestionForm({ response }) {
    // const navigate = useNavigate()
    const dispatch = useDispatch();
    const [title, setTitle] = useState(response.title || '');
    const [description, setDescription] = useState(response.description || '');
    const [type, setType] = useState(response.type || '');
    const [selectedImages, setSelectedImages] = useState([]);
    const [errors, setErrors] = useState({})

    const { closeModal } = useModal()

    function convertImageToBase64(file) {
        const reader = new FileReader();
        return new Promise(res => {
            reader.onload = () => {
                res(reader.result);
            };
            reader.readAsDataURL(file);
        })
    }

    // useEffect(() => {
    //     dispatch(getQuestionDetails(questionId));
    // }, [dispatch, questionId]);

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const updatedQuestion = {
            title,
            description,
            type,
        };
        let errHits = {}
        if (title.length < 20 || title.length > 300) {
            errHits.title = "Title must be between 20 and 300 characters.";
        }
        if (description.length < 100 || description.length > 2500) {
            errHits.description = "Description must be between 100 and 2,500 characters.";
        }
        if (!type) {
            errHits.type = "You must select a science subject."
        }
        setErrors(errHits);
        console.log(errors)
        if (!Object.values(errHits).length) {
            // const editedQuestion =
            await new Promise(res => dispatch(editQuestion(updatedQuestion, response.id)).then(res));

            if (selectedImages.length) {
                // let imageableId = question.id
                const base64Images = await Promise.all(selectedImages.map(convertImageToBase64));
                await new Promise(res => dispatch(postNewImages(base64Images, 'question', response.id)).then(res));
                setSelectedImages([])
            }
            await new Promise(res => dispatch(getQuestionDetails(response.id)).then(res)).then(closeModal)
        }
    };
    return (
        <div className='formDiv'>
            <form onSubmit={onSubmit} className='postQuestionForm'>
                <h1 className='responseH1'>Update Your Question</h1>
                <div className='typeSelector'>
                    <div className='selectTypeRequestDiv'>Please select a science field</div>
                    <span onClick={() => setType('biology')} className={(type==='biology' ? 'bioSelect' : '') + ' typeButton'}>Biology</span>
                    <span onClick={() => setType('chemistry')} className={(type==='chemistry' ? 'chemSelect' : '') + ' typeButton'}>Chemistry</span>
                    <span onClick={() => setType('physics')} className={(type==='physics' ? 'physSelect' : '') + ' typeButton'}>Physics</span>
                </div>
                <div className='newQTitle'>Question Title</div>
                <textarea
                        className='titleTextarea'
                        placeholder='Give your question a clear and concise title. Length (20-300 characters)'
                        id='title'
                        type='text'
                        onChange={e => setTitle(e.target.value)}
                        value={title}
                />
                <div>{errors.title && <div className='error'>{errors.title}</div>}</div>
                <div className={(title.length < 20 || title.length > 300 ? 'tooLong' : '') + ' lengthDiv'}>Title length: {title.length}</div>
                <div className='newQDescription'>Question Description</div>
                <textarea
                    className='descriptionTextarea'
                    placeholder='Describe the question in great detail. Length (100-2500 characters)'
                    id='description'
                    type='text'
                    onChange={e => setDescription(e.target.value)}
                    value={description}
                >
                </textarea>
                <div>{errors.description && <div className='error'>{errors.description}</div>}</div>
                <div className={(description.length < 100 || description.length > 2500 ? 'tooLong' : '') + ' lengthDiv'}>Description length: {description.length}</div>
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
                <div className='submitQuestionDiv'>
                    <button disabled={!description} onSubmit={onSubmit} className='submitQuestionButton'>Submit Question</button>
                </div>
            </form>
        </div>
  );
}

export default UpdateQuestionForm
