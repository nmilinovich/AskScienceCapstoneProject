import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react'
import { getQuestionDetails } from '../../../store/questions';
import { getUserLikes } from '../../../store/likes';
import QuestionDetailsCard from '../QuestionDetailsCard/QuestionDetailsCard';
// import QuestionCommentsCard from '../QuestionCommentsCard/QuestionCommentsCard';
import QuestionAnswersSection from '../QuestionAnswersSection/';
import { getUserAnswers } from '../../../store/answers';

function QuestionDetailsPage() {
    const dispatch = useDispatch();
    let { questionId } = useParams();
    questionId = parseInt(questionId);
    // dispatch(getQuestionDetails(questionId));
    useEffect(() => {
        dispatch(getQuestionDetails(questionId));
        dispatch(getUserLikes())
        dispatch(getUserAnswers())
    }, [dispatch, questionId]);
    const question = useSelector((state) => state.questions[questionId]);
    // const user = useSelector((state) => state.session.user?.['id']);
    // if(!question) {
    //     return <div>Loading...</div>;
    // }
    if (!question) {
        <div>loading</div>
    }
    if (question) {
        return (

            <div className='questionDetailsPage'>
                <div>
                    <div className='questionSection'>
                        <QuestionDetailsCard question={question} />
                    </div>
                    <QuestionAnswersSection question={question} />
                </div>
            </div>
        );
    }
}

export default QuestionDetailsPage;
