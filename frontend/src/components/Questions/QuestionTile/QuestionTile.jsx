import { Link } from 'react-router-dom';
import './QuestionTile.css'

function QuestionTile({ question }) {
    return (
        <Link to={`/questions/${question.id}`} className={question.type + 'QuestionTile'}>
            <div className='questionTileTop'>
                <span className='questionTileOwner'>{question.questionOwner.username}</span>
                <span>upvotes: {question.numLikes}</span>
                <span className={question.type + 'Type type'}>{question.type}</span>
            </div>
            <div className='questionTileCenter'>
                <h1 className='questionTileTitle'>{question.title}</h1>

            </div>
            <div>
                <p className='questionTileDescription'>{question.description}</p>
            </div>
        </Link>
    )
}

export default QuestionTile
