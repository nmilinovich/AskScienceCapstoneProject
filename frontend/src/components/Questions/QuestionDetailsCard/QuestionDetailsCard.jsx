import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { getUserLikes } from '../../../store/likes';
import { getQuestionDetails, removeQuestion } from '../../../store/questions';
import QuestionVotingComponent from './QuestionVotingComponent/QuestionVotingComponent';
import UpdateQuestionModalButton from '../UpdateQuestionModal/UpdateQuestionModalButton';
import QuestionCommentsCard from '../QuestionCommentsCard/QuestionCommentsCard';
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
        <div className={question.type + 'QuestionCard'}>
            <div className='questionCardTop'>
                <span className='questionCardOwner'>{question.questionOwner.username}</span>
                <div className='questionCardButtons'>
                {
                question.userId === user ?
                <div>
                    <button className={question.type + 'CardType' + ' deleteQuestionButton'} onClick={deleteQuestion}>Delete Question</button>
                    <UpdateQuestionModalButton user={user} response={question} />
                </div>
                : null
                }
                </div>
                <div className={question.type + 'Type questionType'}>{question.type}</div>
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
            <h3 className='commentsH3'>Comments</h3>
            <QuestionCommentsCard question={question}/>
        </div>
    )
}


export default QuestionDetailsCard
