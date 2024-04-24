import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getUserLikes } from '../../../store/likes';
import { getQuestionDetails, removeQuestion } from '../../../store/questions';
import QuestionVotingComponent from './QuestionVotingComponent/QuestionVotingComponent';
import UpdateQuestionModalButton from '../UpdateQuestionModal/UpdateQuestionModalButton';
import './QuestionDetailsCard.css'

function QuestionDetailsCard({ question }) {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.session.user.id);
    // const questionLikes = useSelector((state => state.questions[question.id].Likes))
    useEffect(() => {
        dispatch(getUserLikes())
        dispatch(getQuestionDetails(question.id))
    }, [dispatch, question.id])
    let navigate = useNavigate();

    const deleteQuestion = async (e) => {
        e.preventDefault();
        dispatch(removeQuestion(question.id))
        navigate('/')
    }

    return (
        <div className='questionCard'>
            <div className='questionCardTop'>
                <span className='questionCardOwner'>{question.questionOwner.username}</span>
                {
                    question.userId === user ?
                    <div className='questionCardButtons'>
                        <button onClick={deleteQuestion}>Delete Question</button>
                        <UpdateQuestionModalButton user={user} response={question} imageableType='question' />
                    </div>

                    : null
                }
                <span className={question.type + ' questionCardType'}>{question.type}</span>
            </div>
            <div className='questionCardLikesAndTitle'>
                <QuestionVotingComponent className='questionLikes' />
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
