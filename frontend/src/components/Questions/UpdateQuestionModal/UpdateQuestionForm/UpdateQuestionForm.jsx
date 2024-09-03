import { useState  } from 'react';
import { useModal } from '../../../../context/Modal';
// import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { getQuestionDetails, editQuestion } from '../../../../store/questions';
// import { postNewImages } from '../../../../store/images';
// import { useNavigate } from "react-router-dom"
// import UploadImages from '../../DragAndDropImages/UploadImages';
// import './PostQuestionPage.css'

function UpdateQuestionForm({user, response }) {
    const { closeModal } = useModal()
    // const navigate = useNavigate()
    const dispatch = useDispatch();
    const [title, setTitle] = useState(response.title || '');
    const [description, setDescription] = useState(response.description || '');
    const [type, setType] = useState(response.type || '');
    // const [selectedImages, setSelectedImages] = useState([]);
    const [errors, setErrors] = useState({})

    // function convertImageToBase64(file) {
    //     const reader = new FileReader();
    //     return new Promise(res => {
    //         reader.onload = () => {
    //             res(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     })
    // }

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
        console.log(type)
        setErrors(errHits);
        if (!Object.values(errors).length) {
            await new Promise(res => dispatch(editQuestion(updatedQuestion, response.id)).then(res));
            await dispatch(getQuestionDetails(response.id)).then(closeModal);
            // if (selectedImages.length) {
            //     // let imageableId = question.id
            //     const base64Images = await Promise.all(selectedImages.map(convertImageToBase64));
            //     await new Promise(res => dispatch(postNewImages(base64Images, 'answer', response.id)).then(res));
            //     setSelectedImages([])
            // }
            // await new Promise(res => dispatch(getQuestionDetails(response.id)).then(res));
        }
    };
    return (
        user ?
        <div className='formDiv'>
            <form onSubmit={onSubmit} className='postQuestionForm'>
                <h1 className='responseH1'>Update Your Question</h1>
                <div className='typeSelector'>
                    <div className='selectTypeRequestDiv'>Please select a science field</div>
                    <span onClick={() => setType('biology')} className={(type==='biology' ? 'bioSelect' : '') + ' typeButton'}>Biology</span>
                    <span onClick={() => setType('chemistry')} className={(type==='chemistry' ? 'chemSelect' : '') + ' typeButton'}>Chemistry</span>
                    <span onClick={() => setType('physics')} className={(type==='physics' ? 'physSelect' : '') + ' typeButton'}>Physics</span>
                </div>
                <div className='titleContainer'>
                    <input
                            className='titleInput'
                            placeholder='Question Title. Length (20-300 characters)'
                            id='title'
                            type='text'
                            onChange={e => setTitle(e.target.value)}
                            value={title}
                    />
                    <div className={(title.length < 20 || title.length > 300 ? 'tooLong' : '') + ' lengthDiv'}>Title length: {title.length}</div>
                </div>
                <div className='descriptionContainer'>
                    <textarea
                        className='descriptionTextarea'
                        placeholder='Question Description. Length (100-2500 characters)'
                        id='description'
                        type='text'
                        onChange={e => setDescription(e.target.value)}
                        value={description}
                    >
                    </textarea>
                    <div className={(description.length < 100 || description.length > 2500 ? 'tooLong' : '') + ' lengthDiv'}>Description length: {description.length}</div>
                </div>
                    {/* <div className='uploadedImagesDiv'>
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
                    </div> */}
                <div className='submitQuestionDiv'>
                    <button disabled={!description} onSubmit={onSubmit} className='submitQuestionButton'>Submit Question</button>
                </div>
            </form>
        </div>
        :
        <div>Log in to post a question!</div>
  );
}

export default UpdateQuestionForm
