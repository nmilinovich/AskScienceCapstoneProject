import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { getQuestionDetails } from '../../../store/questions';
import QuestionDetailsCard from '../QuestionDetailsCard/QuestionDetailsCard';
import QuestionCommentsCard from '../QuestionCommentsCard/QuestionCommentsCard';
import QuestionAnswersCard from '../QuestionAnswersCard/QuestionAnswersCard';
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
                <div>
                    <div className='questionSection'>
                        <QuestionDetailsCard question={question} />
                        <h3 className='commentsH3'>Comments</h3>
                        <QuestionCommentsCard question={question} />
                    </div>

                    <QuestionAnswersCard question={question} />
                </div>
            </div>
        );
    }
}

export default QuestionDetailsPage;
