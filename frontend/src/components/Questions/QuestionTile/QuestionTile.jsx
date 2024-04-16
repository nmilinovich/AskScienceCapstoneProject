// import { useEffect, useState } from 'react';
// import { getQuestions } from '../../store/questions';
// import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
// import './Questions.css'

function QuestionTile({ question }) {
    return (
        <Link to={`/questions/${question.id}`} className='questionTile'>
            <div className='questionTileLeft'>
                {question.numLikes}
            </div>
            <div className='questionTileMiddle'>
                <div className='questionTileTitle'>{question.title}</div>
                <div className='questionTileDescription'>{question.description}</div>
            </div>
            <div className='questionTileRight'>
                <div className='questionTileType'>{question.type}</div>
            </div>
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
