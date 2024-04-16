import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { getQuestionDetails } from '../../../store/questions';
// import { getQuestions } from '../../../store/questions';
// import './QuestionDetails.css';
// import { getQuestion } from '../../store/reviews';

function QuestionDetailsPage() {
    const dispatch = useDispatch();
    const { questionId } = useParams();
    // const questionId = parseInt(questionId);
    // dispatch(getQuestionDetails(questionId));
    useEffect(() => {
        dispatch(getQuestionDetails(questionId));
    }, [dispatch, questionId]);
    // let user = useSelector((state) => state.session.user?.['id']);
    let question = useSelector((state) => state.questions[questionId]);

    if(!question) {
        return <div>Loading...</div>;
    }
    if (question) {
        return (
            <div className='questionDetailsPage'>
                <div className="questionCard">
                    <h1 className='questionCardTitle'>{question.title}</h1>
                    <div className='questionCardType'>{question.type}</div>
                    <button className='createQuestionLink'>Ask a Question</button>
                    <div>
                        <p className='questionCardDescription'>{question.description}</p>
                    </div>
                    <div className='img-container'>
                        {question.Images?.map((image) =>
                            <img id={image.id} key={image.id} className='questionCardImg' src={`${image['url']}`} alt='image'/>
                        )}
                    </div>
                    <div className='questionCardCommentsContainer'>
                        {question.Comments?.map((questionComment) => {
                            return (
                                <div id={questionComment.id} key={questionComment.id} className='questionCardComments'>{questionComment.description}</div>
                            )
                        })}
                    </div>
                    <div className='answersContainer'>
                        {question.Answers?.map((answer) => {
                            return (
                                <div id={answer.id} key={answer.id} className='answer'>{answer.description}</div>
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default QuestionDetailsPage;
