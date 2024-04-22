import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { removeQuestion } from '../../../store/questions';
import VotingComponent from '../../VotingComponent/VotingComponent'
import './QuestionDetailsCard.css'

function QuestionDetailsCard({ question }) {
    const user = useSelector((state) => state.session.user.id);
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const deleteQuestion = (e) => {
        e.preventDefault();
        dispatch(removeQuestion(question.id))
        navigate('/')
    }
    // console.log(userLikes)

    return (
        <div className='questionCard'>
            <div className='questionCardTop'>
                <span className='questionCardOwner'>{question.questionOwner.username}</span>
                {
                    question.userId === user ?
                    <button onClick={deleteQuestion}>Delete Question</button>
                    : null
                }
                <span className='questionCardType'>{question.type}</span>
            </div>
            <div className='questionCardLikesAndTitle'>
                <VotingComponent className='questionLikes' key={question.id} response={question} likeableType='question' />
                <h1 className='questionCardTitle'>{question.title}</h1>
            </div>
            <div>
                <p className='questionCardDescription'>{question.description}</p>
            </div>
            <div className='questionImgsContainer'>
                {question.Images?.map((image) => {
                    return (
                        <div key={image.id} className='questionImgDiv'>
                            <img className='questionCardImg' src={`${image['url']}`} alt='image'/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default QuestionDetailsCard
