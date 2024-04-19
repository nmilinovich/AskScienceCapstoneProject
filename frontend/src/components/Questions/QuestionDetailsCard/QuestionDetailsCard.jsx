import VotingComponent from '../../VotingComponent/VotingComponent'
import './QuestionDetailsCard.css'

function QuestionDetailsCard({ question }) {
    // let { questionId } = useParams()
    // questionId = parseInt(questionId)
    // const userLikes = useSelector((state) => state.session.user.likes)

    // console.log(userLikes)

    return (
        <div className='questionCard'>
            <div className='questionCardTop'>
                <span className='questionCardOwner'>{question.questionOwner.username}</span>
                <span className='questionCardType'>{question.type}</span>
            </div>
            <div className='questionCardLikesAndTitle'>
                <VotingComponent className='questionLikes' response={question} />
                <h1 className='questionCardTitle'>{question.title}</h1>
            </div>
            <div>
                <p className='questionCardDescription'>{question.description}</p>
            </div>
            <div className='questionImgsContainer'>
                {question.Images?.map((image) => {
                    return (
                        <div key={image.id} className='questionImgDiv'>
                            <img className='questionCardImg' src={`${image['url']}`} alt='image'/>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}


export default QuestionDetailsCard
