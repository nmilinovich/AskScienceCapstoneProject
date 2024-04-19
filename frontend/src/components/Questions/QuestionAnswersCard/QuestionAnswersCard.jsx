import './QuestionAnswersCard.css'

function QuestionAnswersCard({ question }) {
    return (
        <div>
            {question.Answers?.map((answer) => {
                return (
                    <div key={answer.id} className='questionAnswerCard'>
                        <div className='questionAnswersCard'>{answer.description}</div>
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
