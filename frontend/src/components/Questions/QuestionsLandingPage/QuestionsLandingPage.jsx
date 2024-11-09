import { useEffect, useState } from 'react';
import { getQuestions } from '../../../store/questions';
import { useDispatch, useSelector } from "react-redux";
import QuestionTile from '../QuestionTile/QuestionTile';

function QuestionsLandingPage() {
    const [search, setSearch] = useState('');

    const dispatch = useDispatch();
    const questions = useSelector((state) => state.questions)
    useEffect(() => {
        dispatch(getQuestions())
    }, [dispatch])
    if (!questions) {
        return <div>Loading...</div>
    }

    return (
        <div className='landingPageDiv'>
            <input
                value={search}
                onChange={e => setSearch(e.target.value)}
            />
            <div className='questions-grid-container'>
                {Object.values(questions)
                .filter((q) => !search || (q.title + q.description).toLowerCase().includes(search.toLowerCase()))
                ?.map((question) => {
                    return (
                        <QuestionTile key={question.id} question={question}/>
                    )
                })}
            </div>
        </div>
    );
}
export default QuestionsLandingPage
