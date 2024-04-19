import { Link } from 'react-router-dom';
// import './Questions/LandingPage.css'

function QuestionTile({ question }) {
    return (
        <Link to={`/questions/${question.id}`} className='questionTile'>
            <div className='questionTileTop'>
                <span className='questionTileOwner'>{question.questionOwner.username}</span>
                <span>Likes: {question.numLikes}</span>
                <span className='questionTileType'>{question.type}</span>
            </div>
            <div className='questionTileCenter'>
                <h1 className='questionTileTitle'>{question.title}</h1>

            </div>
            <div>
                <p className='questionTileDescription'>{question.description}</p>
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
