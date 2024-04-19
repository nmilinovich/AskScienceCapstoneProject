import './QuestionAnswersCard.css'

function QuestionAnswersCard({ question }) {
    return (
        <div className='answersContainer'>
            {question.Answers?.map((answer) => {
                return (
                    <div key={answer.id}>
                        <div id={answer.id}  className='questionAnswersCard'>{answer.description}</div>
                        <div>
                            {answer.Comments?.map((answerComment) => {
                                return (
                                    <div key={answerComment.id}>{answerComment.description}</div>
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
