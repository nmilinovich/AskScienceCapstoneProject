// import { useParams } from 'react-router-dom';
// import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postNewLike, editLike, removeLike } from '../../store/likes'
import { getQuestionDetails } from "../../store/questions";
import './VotingComponent.css'
import { useEffect } from "react";
import { FaArrowUp } from 'react-icons/fa6';
import { FaArrowDown } from 'react-icons/fa6';
// const selectCompletedTodosCount = createSelector(
//     (state) => state.todos,
//     (_, completed) => completed,
//     (todos, completed) =>
//       todos.filter((todo) => todo.completed === completed).length,
//   )

function VotingComponent({ answer, likes }) {
    const dispatch = useDispatch()
    let user = useSelector((state) => state.session.user);
    const userLikesObj = useSelector((state) => state.likes);
    // const updated = useSelector((state) => state.likes[answer.id]);
    console.log(answer)
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
            console.log(newLike)
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
            dispatch(getQuestionDetails(answer.questionId))

            // if (response.answerOwner) {
                // dispatch(getQuestionDetails(answer.questionId));
            // } else {
            // }
        }
    }

    useEffect(() => {
        // dispatch(getUserLikes());
    }, [dispatch, userLikes])



    return (
    <div className='likesContainer'>
        <FaArrowUp size={20} onClick={() => handleVote(true)} className={userLike && userLike.dislike === false ? 'liked likeBtn' : 'notLiked likeBtn'} alt='Up Arrow'/>
        <span className='totalLikes'>{numLikes}</span>
        <FaArrowDown size={20} onClick={() => handleVote(false)} className={userLike && userLike.dislike === true ? 'disliked likeBtn' : 'notLiked likeBtn'} alt='Down Arrow'/>
    </div>
    )
}


export default VotingComponent
