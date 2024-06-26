import { useState  } from 'react';
// import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
// import { getQuestionDetails, editQuestion } from '../../../../store/questions';
import { getUserAnswers, editAnswer } from '../../../../../../store/answers';
import { postNewImages } from '../../../../../../store/images';
// import { useNavigate } from "react-router-dom"
// import UploadImages from '../../DragAndDropImages/UploadImages';

function UpdateAnswerForm({user, answer }) {
    // const navigate = useNavigate()
    const dispatch = useDispatch();
    const [description, setDescription] = useState(answer.description || '');
    const [selectedImages, setSelectedImages] = useState([]);
    const [errors, setErrors] = useState({})

    function convertImageToBase64(file) {
        const reader = new FileReader();
        return new Promise(res => {
            reader.onload = () => {
                res(reader.result);
            };
            reader.readAsDataURL(file);
        })
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        const updatedAnswer = {
            description
        };
        let errHits = {}
        if (description.length < 100 || description.length > 3000) {
            errHits.description = "Description must be between 100 and 3,000 characters.";
        }
        setErrors(errHits);
        console.log(errors)
        if (!Object.values(errors).length) {
            await new Promise(res => dispatch(editAnswer(updatedAnswer, answer.id)).then(res));

            if (selectedImages.length) {
                const base64Images = await Promise.all(selectedImages.map(convertImageToBase64));
                await new Promise(res => dispatch(postNewImages(base64Images, 'answer', answer.id)).then(res));
                setSelectedImages([])
            }
            await new Promise(res => dispatch(getUserAnswers()).then(res));
        }
    };
    return (
        user ?
        <div className='formDiv'>
            <form onSubmit={onSubmit} className='postQuestionForm'>
                <h1 className='responseH1'>Update Your Answer</h1>
                <div className='typeSelector'>
                </div>
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
                <div className={(description.length < 100 || description.length > 3000 ? 'tooLong' : '') + ' lengthDiv'}>Description length: {description.length}</div>
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
        :
        <div>Log in to change your answer!</div>
  );
}

export default UpdateAnswerForm
