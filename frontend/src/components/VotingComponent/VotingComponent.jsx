import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUserLikes, postNewLike, editLike, removeLike } from '../../store/likes'
import { getQuestionDetails } from "../../store/questions";
import './VotingComponent.css'
import { useEffect } from "react";


function VotingComponent({ response, type }) {
    const dispatch = useDispatch()
    // let { questionId } = useParams();
    // questionId = parseInt(questionId);

    let userLikes = useSelector((state) => Object.values(state.likes));

    useEffect(() => {
        dispatch(getUserLikes())
        dispatch(getQuestionDetails(response.id))
    }, [dispatch, response.id]);

    const handleVote = async (isUpvote) => {
        const newLike = {
            likeableType: type,
            likeableId: response.id,
            dislike: !isUpvote,
        }

        const userLike = userLikes.find(like => like.likeableId === response.id);
        if (userLike) {
            if (userLike.dislike === newLike.dislike) {
                await new Promise(res => dispatch(removeLike(userLike.id)).then(res));
            } else {
                await new Promise(res => dispatch(editLike(newLike)).then(res));
            }
        } else {
            await new Promise(res => dispatch(postNewLike(newLike)).then(res));
        }
        await new Promise(res => dispatch(getQuestionDetails(response.id)).then(res));
    }

    return (
    <div className='likesContainer'>
        <img onClick={() => handleVote(true)} className='upArrow' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Eo_circle_green_arrow-up.svg/2048px-Eo_circle_green_arrow-up.svg.png' alt='Down Arrow'/>
        <span className='totalLikes'>{response.numLikes}</span>
        <img onClick={() => handleVote(false)} className='downArrow' src='https://www.pngall.com/wp-content/uploads/14/Down-Arrow-PNG-Images-HD.png' alt='Down Arrow'/>
    </div>
    )
}

export default VotingComponent
