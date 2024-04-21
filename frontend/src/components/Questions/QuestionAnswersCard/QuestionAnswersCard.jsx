// import VotingComponent from '../../VotingComponent/VotingComponent'
import './QuestionAnswersCard.css'

function QuestionAnswersCard({ question }) {
    return (
        <div>
            {question.Answers?.map((answer) => {
                return (
                    <div key={answer.id} className='answerCard'>
                        <div className='answerOwnerDiv'>{answer.answerOwner.username}</div>
                        <div className='likesAndDesciptionContainer'>
                            {/* <VotingComponent response={answer} type='answer' /> */}
                                <p className='answerDescription'>{answer.description}</p>
                        </div>
                        <div className='answerImgsContainer'>
                            {answer.Images?.map((image) => {
                                return (
                                    <div key={image.id} className='answerImgDiv'>
                                        <img className='answerCardImg' src={`${image['url']}`} alt='image'/>
                                    </div>
                                )
                            })}
                        </div>
                        <h3 className='commentsH3'>Comments</h3>
                        <div>
                            {answer.Comments?.map((answerComment) => {
                                return (
                                    <div className='answerCommentDescription' key={answerComment.id}>{answerComment.description}</div>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default QuestionAnswersCard
