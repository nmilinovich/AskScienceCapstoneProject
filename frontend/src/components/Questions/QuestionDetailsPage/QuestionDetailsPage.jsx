import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { getQuestionDetails } from '../../../store/questions';
// import { getUserLikes } from '../../../store/likes';
import QuestionDetailsCard from '../QuestionDetailsCard/QuestionDetailsCard';
import QuestionCommentsCard from '../QuestionCommentsCard/QuestionCommentsCard';
import QuestionAnswersCard from '../QuestionAnswersCard/QuestionAnswersCard';
import PostAnswer from '../PostAnswer/PostAnswer';

function QuestionDetailsPage() {
    const dispatch = useDispatch();
    let { questionId } = useParams();
    questionId = parseInt(questionId);
    // dispatch(getQuestionDetails(questionId));
    let question = useSelector((state) => state.questions[questionId]);
    useEffect(() => {
        dispatch(getQuestionDetails(questionId));
    }, [dispatch, questionId]);
    // let user = useSelector((state) => state.session.user?.['id']);
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
                    <PostAnswer question={question}/>
                </div>
            </div>
        );
    }
}

export default QuestionDetailsPage;
