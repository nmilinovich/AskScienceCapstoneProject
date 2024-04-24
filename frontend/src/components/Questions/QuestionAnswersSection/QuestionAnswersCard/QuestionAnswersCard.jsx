import { useSelector, useDispatch } from 'react-redux'
import { removeAnswer } from '../../../../store/answers';
import { getQuestionDetails } from '../../../../store/questions';
import VotingComponent from '../../../VotingComponent/VotingComponent'
// import { useEffect } from 'react';

function QuestionAnswersCard({ answer }) {
    console.log(answer)
    const user = useSelector((state) => state.session.user.id);
    const dispatch = useDispatch();
    // let answers = useSelector((state) => state.questions[answer.questionId].Answers)
    // const deleteAnswer = (e) => {
    //     e.preventDefault();

    //     dispatch(removeAnswer(question.id))
    // }

    // useEffect(() => {
    //     dispatch(getQuestionDetails)
    // }, [dispatch, answers])


    return (
        <div>
            <div className='answerCard'>
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
