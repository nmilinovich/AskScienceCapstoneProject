import { Link } from 'react-router-dom';
import { FaRegUser, FaThumbsUp } from "react-icons/fa";
import '../QuestionsLandingPage/QuestionsLandingPage.css'

function QuestionTile({ question }) {
    return (
        <Link to={`/questions/${question.id}`} className='questionTile'>
            <div className='questionTileCenter'>
                <div className='questionTileTitle'>{question.title}</div>
            </div>
            <div>
                <div className='questionTileDescription'>{question.description}</div>
            </div>
            <div className='questionTileTop'>
                <span className='questionTileLikes'>
                    <FaThumbsUp />
                    {question.numLikes}
                </span>
                <span className='questionTileOwner'>
                    <FaRegUser />
                    {question.questionOwner.username}
                </span>
                <span className='questionTileType'>{question.type}</span>
            </div>

            {/* <div className='questionTileLeft'>
                {question.numLikes}
            </div>
            <div className='questionTileMiddle'>
                <div className='questionTileTitle'>{question.title}</div>
                <div className='questionTileDescription'>{question.description}</div>
            </div>
            <div className='questionTileRight'>
                <div className='questionTileType'>{question.type}</div>
            </div> */}
            {/* <i className="fa-solid fa-star"></i> */}

            {/* <div>
                {question.Images.map((img) => {
                    return (
                        <div key={img.id}>
                          <img src={img.url}/>
                        </div>
                    )
                })}
            </div> */}
        </Link>
    )
}

export default QuestionTile
