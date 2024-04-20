import VotingComponent from '../../VotingComponent/VotingComponent'
import './QuestionAnswersCard.css'

function QuestionAnswersCard({ question, questionId }) {
    return (
        <div>
            {question.Answers?.map((answer) => {
                return (
                    <div key={answer.id} className='answerCard'>
                        <span className='answerOwnerSpan'>{answer.answerOwner.username}</span>
                        <div className='likesAndDesciptionContainer'>
                            <VotingComponent response={answer} type='answer' questionId={questionId} />
                                <p className='answerDescription'>{answer.description}</p>
                        </div>
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
