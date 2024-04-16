// import { useEffect, useState } from 'react';
// import { getQuestions } from '../../store/questions';
// import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import './Questions.css'

function QuestionTile({ question }) {
    return (
        <Link to={`/questions/${question.id}`} key={question.id} className='questionTile'>
            <div className='questionTileTop'>
                <div className='questionTileTitle'>{question.title}</div>
                <div className='questionTileType'>{question.type}</div>
            </div>
            <div>{question.numLikes}</div>
            {/* <i className="fa-solid fa-star"></i> */}
            <div>{question.description}</div>
            <div>
                {question.Images.map((img) => {
                    return (
                        <div key={img.id}>
                          <img src={img.url}/>
                        </div>
                    )
                })}
            </div>
        </Link>
    )
}

export default QuestionTile
