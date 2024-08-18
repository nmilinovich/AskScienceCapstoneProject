import { useParams } from 'react-router-dom';
// import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postNewLike, editLike, removeLike } from '../../../../store/likes';
import { getQuestionDetails } from "../../../../store/questions";
// import './VotingComponent.css'
// import { useEffect } from "react";
import { FaCircleArrowUp } from 'react-icons/fa6';
import { FaCircleArrowDown } from 'react-icons/fa6';

function QuestionVotingComponent() {
    const dispatch = useDispatch()
    let { questionId } = useParams();
    questionId = parseInt(questionId);
    const question = useSelector((state) => state.questions[questionId])
    let user = useSelector((state) => state.session.user);
    let userLikesObj = useSelector((state) => state.likes);
    let userLikes = Object.values(userLikesObj)
    let userLike = userLikes.find(like => like.likeableId === questionId
        && like.likeableType === 'question'
    );
    let numLikes = 0;
    question.Likes.forEach((like) => {
        if (like.dislike === true) {
            numLikes -= 1;
        } else {
            numLikes += 1;
        }
    })

    const handleVote = async (isUpvote) => {
        if (user) {
            const newLike = {
                likeableType: 'question',
                likeableId: questionId,
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
            dispatch(getQuestionDetails(questionId))

        }
    }

    // useEffect(() => {
    // }, [dispatch])

    // useEffect(() => {
    // }, [dispatch, userLikesObj])

    return (
    <div className='likesContainer'>
        <FaCircleArrowUp size={50} onClick={() => handleVote(true)} className={userLike && userLike.dislike === false ? 'liked' : 'notLiked'} alt='Up Arrow'/>
        <span className='totalLikes'>{numLikes}</span>
        <FaCircleArrowDown size={50} onClick={() => handleVote(false)} className={userLike && userLike.dislike === true ? 'disliked' : 'notLiked'} alt='Down Arrow'/>
    </div>
    )
}


export default QuestionVotingComponent
