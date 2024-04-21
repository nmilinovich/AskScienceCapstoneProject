// import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postNewLike, editLike, removeLike } from '../../store/likes'
import { getQuestionDetails } from "../../store/questions";
import './VotingComponent.css'
// import { useEffect } from "react";


function VotingComponent({ response, type }) {
    const dispatch = useDispatch()
    // let { questionId } = useParams();
    // questionId = parseInt(questionId);
    let userLikesObj = useSelector((state) => state.likes);
    let userLikes = Object.values(userLikesObj)
    const userLike = userLikes.find(like => like.likeableId === response.id
        && like.likeableType === type
    );
    let numLikes = 0;
    response.Likes.forEach((like) => {
        if (like.dislike) {
            numLikes -= 1;
        } else {
            numLikes += 1;
        }
    })

    const handleVote = async (isUpvote) => {
        const newLike = {
            likeableType: type,
            likeableId: response.id,
            dislike: !isUpvote,
        }

        if (userLike) {
            console.log(userLike)
            if (userLike.dislike === newLike.dislike) {
                await new Promise(res => dispatch(removeLike(userLike.id)).then(res));
            } else {
                await new Promise(res => dispatch(editLike(newLike)).then(res));
            }
        } else {
            await new Promise(res => dispatch(postNewLike(newLike)).then(res));
        }
        if (response.answerOwner) {
            await new Promise(res => dispatch(getQuestionDetails(response.questionId)).then(res));
        } else {
            await new Promise(res => dispatch(getQuestionDetails(response.id)).then(res));
        }
    }

    return (
    <div className='likesContainer'>
        <img onClick={() => handleVote(true)} className={userLike && userLike.dislike === false ? 'liked' : 'notLiked'} src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Eo_circle_green_arrow-up.svg/2048px-Eo_circle_green_arrow-up.svg.png' alt='Up Arrow'/>
        <span className='totalLikes'>{numLikes}</span>
        <img onClick={() => handleVote(false)} className={userLike && userLike.dislike ? 'disliked' : 'notLiked'} src='https://www.pngall.com/wp-content/uploads/14/Down-Arrow-PNG-Images-HD.png' alt='Down Arrow'/>
    </div>
    )
}

export default VotingComponent
