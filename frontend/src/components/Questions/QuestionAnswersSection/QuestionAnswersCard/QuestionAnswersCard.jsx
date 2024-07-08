import { useSelector, useDispatch } from 'react-redux'
import { removeAnswer } from '../../../../store/answers';
import { getQuestionDetails } from '../../../../store/questions';
import VotingComponent from '../../../VotingComponent/VotingComponent';
import UpdateCommentModalButton from '../../CommentModalButton/UpdateCommentModalButton';
import UpdateAnswerModalButton from './UpdateAnswerModalButton/UpdateAnswerModalButton';
import PostCommentModalButton from '../../CommentModalButton/PostCommentModalButton';
import DeleteCommentModalButton from '../../CommentModalButton/DeleteCommentModalButton';
// import { useEffect } from 'react';

function QuestionAnswersCard({ answer, questionAnswers }) {
    console.log(answer)
    const user = useSelector((state) => state.session.user?.id);
    let hasComment = false;
    answer.Comments.forEach((comment) => {
        if (comment.userId === user) {
            hasComment = true
        }
    });
    const dispatch = useDispatch();

    return (
        <div>
            <div className='answerCard'>
                <div className='answerCardTop'>
                    <div className='answerOwnerDiv'>{answer.answerOwner.username}</div>
                    <div className='questionCardButtons'>
                        {
                        answer.userId === user ?
                        <div>
                            <button
                                onClick={
                                    async (e) => {e.preventDefault();
                                    await dispatch(removeAnswer(answer.id));
                                    await dispatch(getQuestionDetails(answer.questionId));
                                }}
                                className='deleteAnswerButton'>Delete Answer
                            </button>
                            <UpdateAnswerModalButton user={user} answer={answer} questionAnswers={questionAnswers} />
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
                            <div className='answerCommentDescription' key={answerComment.id}>
                                {answerComment.description}
                                {answerComment.userId === user ?
                                <div>
                                    <UpdateCommentModalButton comment={answerComment} response={answerComment} commentableType='answer' />
                                    <DeleteCommentModalButton comment={answerComment} />
                                </div>

                                : null}
                            </div>
                        )
                    })}
                </div>
                <div>
                    {!hasComment && user ?
                        <PostCommentModalButton commentableId={answer.id} commentableType='answer' />
                    : null
                    }
                </div>
            </div>
        </div>
    )
}

export default QuestionAnswersCard
