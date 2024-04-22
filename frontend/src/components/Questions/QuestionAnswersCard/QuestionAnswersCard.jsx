import { useSelector, useDispatch } from 'react-redux'
import { removeAnswer } from '../../../store/answers';
import { getQuestionDetails } from '../../../store/questions';
import VotingComponent from '../../VotingComponent/VotingComponent'
import PostAnswer from '../PostAnswer/PostAnswer';
import './QuestionAnswersCard.css'
import { useEffect } from 'react';

function QuestionAnswersCard({ question }) {

    const user = useSelector((state) => state.session.user.id);
    const dispatch = useDispatch();
    let answers = useSelector((state) => state.questions[question.id].Answers)
    console.log(answers)
    // const deleteAnswer = (e) => {
    //     e.preventDefault();

    //     dispatch(removeAnswer(question.id))
    // }

    // useEffect(() => {
    //     dispatch(getQuestionDetails)
    // }, [dispatch, answers])


    return (
        <div>
            {answers.map((answer) => {
                return (
                    <div key={answer.id} className='answerCard'>
                        <div className='answerCardTop'>
                            <div className='answerOwnerDiv'>{answer.answerOwner.username}</div>
                            {
                            answer.userId === user ?
                            <button onClick={async (e) => {e.preventDefault(); await dispatch(removeAnswer(answer.id)); await dispatch(getQuestionDetails(answer.questionId));
                            }} className='de'>Delete Answer</button>
                            : null
                            }
                        </div>

                        <div className='likesAndDesciptionContainer'>
                            <VotingComponent key={answer.id} response={answer} likeableType='answer' />
                                <p className='answerDescription'>{answer.description}</p>
                        </div>
                        <div className='answerImgsContainer'>
                            {answer.Images?.map((image) => {
                                return (
                                    <div key={image.id} className='answerImgDiv'>
                                        <img className='answerCardImg' src={`${image['url']}`} alt='image'/>
                                    </div>
                                )
                            })}
                        </div>
                        <h3 className='commentsH3'>Comments</h3>
                        <div>
                            {answer.Comments?.map((answerComment) => {
                                return (
                                    <div className='answerCommentDescription' key={answerComment.id}>{answerComment.description}</div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
            <PostAnswer answers={answers}/>
        </div>
    )
}

export default QuestionAnswersCard
