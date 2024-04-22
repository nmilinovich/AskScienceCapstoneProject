// import { useParams } from 'react-router-dom';
import { memo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLikes, postNewLike, editLike, removeLike } from '../../store/likes'
import { getQuestionDetails } from "../../store/questions";
import './VotingComponent.css'
import { useEffect, useState } from "react";

const VotingComponent = memo(function VotingComponent({ response, likeableType }) {
    console.log(response)
    const dispatch = useDispatch()
    // let { questionId } = useParams();
    // questionId = parseInt(questionId);
    let user = useSelector((state) => state.session.user);
    let userLikesObj = useSelector((state) => state.likes);
    let userLikes = Object.values(userLikesObj)
    let userLike = userLikes.find(like => like.likeableId === response.id
        && like.likeableType === likeableType
    );
    console.log(userLikesObj)
    let numLikes = 0;
    response.Likes.forEach((like) => {
        if (like.dislike) {
            numLikes -= 1;
        } else {
            numLikes += 1;
        }
    })

    const handleVote = async (isUpvote) => {
        if (user) {
            const newLike = {
                likeableType,
                likeableId: response.id,
                dislike: !isUpvote,
            }

            if (userLike) {
                console.log(userLike)
                if (userLike.dislike === newLike.dislike) {
                    dispatch(removeLike(userLike.id));
                    if (isUpvote) {
                        numLikes -= 1;
                    } else {
                        numLikes += 1;
                    }

                } else {
                    dispatch(editLike(newLike));
                    if (isUpvote) {
                        numLikes += 2;
                    } else {
                        numLikes -= 2;
                    }
                }
            } else {
                dispatch(postNewLike(newLike));
                if (isUpvote) {
                    numLikes += 1;
                } else {
                    numLikes -= 1;
                }
            }
            // if (response.answerOwner) {
            //     console.log(response)
            //     await new Promise(res => dispatch(getQuestionDetails(response.questionId)).then(res));
            // } else {
            //     await new Promise(res => dispatch(getQuestionDetails(response.id)).then(res));
            // }
        }
    }

    useEffect(() => {
        dispatch(getUserLikes())
    }, [dispatch])

    useEffect(() => {
        if (likeableType === 'question') {
            dispatch(getQuestionDetails(response.id))
        }
        if (likeableType === 'answer') {
            dispatch(getQuestionDetails(response.questionId))
        }
    }, [dispatch, userLikesObj])

    return (
    <div className='likesContainer'>
        <img onClick={() => handleVote(true)} className={userLike && userLike.dislike === false ? 'liked' : 'notLiked'} src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Eo_circle_green_arrow-up.svg/2048px-Eo_circle_green_arrow-up.svg.png' alt='Up Arrow'/>
        <span className='totalLikes'>{numLikes}</span>
        <img onClick={() => handleVote(false)} className={userLike && userLike.dislike === true ? 'disliked' : 'notLiked'} src='https://www.pngall.com/wp-content/uploads/14/Down-Arrow-PNG-Images-HD.png' alt='Down Arrow'/>
    </div>
    )
  });


export default VotingComponent
