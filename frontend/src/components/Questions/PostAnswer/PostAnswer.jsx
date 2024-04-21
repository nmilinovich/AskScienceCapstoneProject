import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { postNewAnswer } from '../../../store/answers';
import { postNewImages } from '../../../store/images';
import { getQuestionDetails } from '../../../store/questions';
// import UploadImages from '../../DragAndDropImages/UploadImages';
import './PostAnswer.css'

function convertImageToBase64(file) {
    const reader = new FileReader();
    return new Promise(res => {
        reader.onload = () => {
            res(reader.result);
        };
        reader.readAsDataURL(file);
    });
};

function PostAnswer() {
    let imageableType='answer'
    const dispatch = useDispatch();
    let { questionId } = useParams();
    questionId = parseInt(questionId)
    const [description, setDescription] = useState('');
    const [selectedImages, setSelectedImages] = useState([]);
    const [errors, setErrors] = useState({})
    const onSubmit = async (e) => {
        console.log(selectedImages)
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
        // if (description.length < 30) {
        //     errHits.description = "Description must be more than 30 characters.";
        // }
        setErrors(errHits);
        if (!Object.values(errors).length) {
            const answer = await new Promise(res => dispatch(postNewAnswer(newAnswer)).then(res));
            if (selectedImages.length) {
                let imageableId = answer.id
                const base64Images = await Promise.all(selectedImages.map(convertImageToBase64));
                console.log(base64Images);
                const newImages = await new Promise(res => dispatch(postNewImages(base64Images, imageableType, imageableId)).then(res));
            }
            if (answer.ok) {
                await new Promise(res => dispatch(getQuestionDetails()).then(res));
            }
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
                <div className="imageUploadContainer">
      {selectedImages.map(img => (
        <div key={img}>
          <img
            alt="not found"
            width={"250px"}
            src={URL.createObjectURL(img)}
          />
          <br />
          {console.log(selectedImages)}
          <button onClick={() => setSelectedImages(selectedImages.filter((keptImgs) => keptImgs !== img))}>Remove</button>
        </div>
      ))}
      <input
        type="file"
        name="myImage"
        accept="image/*"
        onChange={(event) => {
          console.log(event.target.files[0]);
          setSelectedImages(selectedImages => [...selectedImages, ...event.target.files]);
        }}
      />
    </div>
                <button disabled={!description} onSubmit={onSubmit}>Submit Answer</button>
            </form>
        </div>
  );
}

export default PostAnswer
