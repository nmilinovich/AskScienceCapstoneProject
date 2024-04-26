import { useSelector, useDispatch } from 'react-redux'
import { getUserAnswers, removeAnswer } from '../../../../store/answers';
import { getQuestionDetails } from '../../../../store/questions';
import VotingComponent from '../../../VotingComponent/VotingComponent'
import UpdateAnswerModalButton from './UpdateAnswerModalButton/UpdateAnswerModalButton';
// import { useEffect } from 'react';

function QuestionAnswersCard({ answer, questionAnswers }) {
    let user = useSelector((state) => state.session);
    const dispatch = useDispatch();
    return (
        <div>
            <div className='answerCard'>
                <div className='answerCardTop'>
                    <div className='answerOwnerDiv'>{answer.answerOwner.username}</div>
                    <div className='questionCardButtons'>
                        {
                        answer.userId === user.user?.id ?
                        <div>
                            <button
                                onClick={
                                    async (e) => {e.preventDefault();
                                    await dispatch(removeAnswer(answer.id));
                                    await dispatch(getUserAnswers());
                                    await dispatch(getQuestionDetails(answer.questionId))
                                }}
                                className='deleteAnswerButton'>Delete Answer
                            </button>
                            <UpdateAnswerModalButton answer={answer} questionAnswers={questionAnswers} />
                        </div>
                        : null
                        }
                    </div>
                </div>
                <div className='likesAndDesciptionContainer'>
                    <VotingComponent key={answer.id} answer={answer} likes={answer.Likes}/>
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
        </div>
    )
}

export default QuestionAnswersCard
