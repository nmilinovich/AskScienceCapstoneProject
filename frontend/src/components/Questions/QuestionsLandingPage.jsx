import { useEffect } from 'react';
import { getQuestions } from '../../store/questions';
import { useDispatch, useSelector } from "react-redux";
import './Questions.css'
import QuestionTile from './QuestionTile';

const Spots = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state) => Object.values(state.questions))
    useEffect(() => {
        dispatch(getQuestions())
    }, [dispatch])
    if (!questions.length) {
        return <div>Loading...</div>
    }
    return (
        <div>
            <ul className='landingPageUl'>
                <div className='questions-grid-container'>
                    {questions?.map((question) => {
                        return (
                        <div key={question.id}>
                            <QuestionTile question={question}/>
                        </div>
                        )
                    })}
                </div>
            </ul>
        </div>
    );
}
export default Spots
