import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { getUserLikes, postNewLike, editLike } from '../../store/likes'
import './VotingComponent.css'
import { useEffect } from "react";


function VotingComponent({ response, type }) {
    const dispatch = useDispatch()


    let userLikes = useSelector((state) => Object.values(state.likes))
    let user = useSelector((state) => state.session.id)
    useEffect(() => {
        dispatch(getUserLikes())
    }, [dispatch]);
    const handleUpvote = async (e) => {
        e.preventDefault()
        for (let like in userLikes) {
            for (let responseLike in response.Likes) {
                if(responseLike.likeableId === like.likeableId && responseLike.likeableType === like.likeableType && like.userId === user) {
                    if (like.dislike === true) {
                        return
                    } else {
                        const updatedLike = {
                            likeableType: type,
                            likeableId: response.id,
                            dislike: false
                        };
                        return dispatch(editLike(updatedLike))
                    }
                }
            }

        }
        const newLike = {
            likeableType: type,
            likeableId: response.id,
            dislike: false
        }
        return dispatch(postNewLike(newLike))
    };
    const handleDownvote = async () => {
        for (let userLike in userLikes) {
            for (let responseLike in response.Likes)
            if(responseLike.likeableId === userLike.likeableId && responseLike.likeableType === userLike.likeableType) {
                if (userLike.dislike === false) {
                    return
                } else {
                    const updatedLike = {
                        likeableType: type,
                        likeableId: response.id,
                        dislike: true
                    };
                    return dispatch(editLike(updatedLike))
                }
            }
        }
        const newLike = {
            likeableType: type,
            likeableId: response.id,
            dislike: false
        }
        return dispatch(postNewLike(newLike))
    };

    return (
    <div className='likesContainer'>
        <img onClick={handleUpvote} className='upArrow' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Eo_circle_green_arrow-up.svg/2048px-Eo_circle_green_arrow-up.svg.png' alt='Down Arrow'/>
        <span className='totalLikes'>{response.numLikes}</span>
        <img onClick={handleDownvote} className='downArrow' src='https://www.pngall.com/wp-content/uploads/14/Down-Arrow-PNG-Images-HD.png' alt='Down Arrow'/>
    </div>
    )
}

export default VotingComponent
