import { useDispatch } from 'react-redux'
import { getUserAnswers } from '../../../store/answers';
import QuestionAnswersCard from './QuestionAnswersCard/QuestionAnswersCard';
import PostAnswer from '../PostAnswer/PostAnswer';
import './QuestionAnswersSection.css'
import { useEffect } from 'react';

function QuestionAnswersSection({ question }) {
    const dispatch = useDispatch()

    // const questionAnswersObj = useSelector((state) => state.questions[question.id])
    let questionAnswers = Object.values(question.Answers)
    useEffect(() => {
        dispatch(getUserAnswers())
        // dispatch(getUserLikes())
    }, [dispatch])
    //     const answer = useCallback(
    //     () => (answer),
    //     [answer]
    //   );
    // const answerProp = useMemo(
    //     () => (Object.values(answers).map(answer) => answer),
    //     [answer]
    //   );

    return (
        <div>
            {questionAnswers.map((answer) => {
                console.log(questionAnswers)
                return (
                    <QuestionAnswersCard key={answer.id} answer={answer} questionAnswers={questionAnswers} />
                )
            })}
            <PostAnswer answers={questionAnswers}/>
        </div>
    )
}

export default QuestionAnswersSection
