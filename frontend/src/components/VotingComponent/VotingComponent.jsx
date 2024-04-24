// import { useParams } from 'react-router-dom';
// import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLikes, postNewLike, editLike, removeLike } from '../../store/likes'
// import { getQuestionDetails } from "../../store/questions";
import './VotingComponent.css'
import { useEffect } from "react";
import { getQuestionDetails } from '../../store/questions';


function VotingComponent({ answer, likes }) {
    const dispatch = useDispatch()
    let user = useSelector((state) => state.session.user);
    const userLikesObj = useSelector((state) => state.likes);
    // const updated = useSelector((state) => state.likes[answer.id]);
    // const answers = useSelector((state) => state.questions[answer.questionId].Answers)
    let userLikes = Object.values(userLikesObj)
    let userLike = userLikes.find(like => like.likeableId === answer.id
        && like.likeableType === 'answer'
    );
    let numLikes = 0;
    likes.forEach((like) => {
        if (like.dislike) {
            numLikes -= 1;
        } else {
            numLikes += 1;
        }
    })

    const handleVote = async (isUpvote) => {
        if (user) {
            const newLike = {
                likeableType: 'answer',
                likeableId: answer.id,
                dislike: !isUpvote,
            }
            if (userLike) {
                if (userLike.dislike === newLike.dislike) {
                    await dispatch(removeLike(userLike.id));
                    if (isUpvote) {
                        numLikes -= 1;
                    } else {
                        numLikes += 1;
                    }

                } else {
                    await dispatch(editLike(newLike));
                    if (isUpvote) {
                        numLikes += 2;
                    } else {
                        numLikes -= 2;
                    }
                }
            } else {
                await dispatch(postNewLike(newLike));
                if (isUpvote) {
                    numLikes += 1;
                } else {
                    numLikes -= 1;
                }
            }
            await dispatch(getQuestionDetails(answer.questionId));
            // if (response.answerOwner) {
                // dispatch(getQuestionDetails(answer.questionId));
            // } else {
            // }
        }
    }

    // useEffect(() => {
    // }, [dispatch, userLikes])



    return (
    <div className='likesContainer'>
        <img onClick={() => handleVote(true)} className={userLike && userLike.dislike === false ? 'liked' : 'notLiked'} src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Eo_circle_green_arrow-up.svg/2048px-Eo_circle_green_arrow-up.svg.png' alt='Up Arrow'/>
        <span className='totalLikes'>{numLikes}</span>
        <img onClick={() => handleVote(false)} className={userLike && userLike.dislike === true ? 'disliked' : 'notLiked'} src='https://www.pngall.com/wp-content/uploads/14/Down-Arrow-PNG-Images-HD.png' alt='Down Arrow'/>
    </div>
    )
}


export default VotingComponent
