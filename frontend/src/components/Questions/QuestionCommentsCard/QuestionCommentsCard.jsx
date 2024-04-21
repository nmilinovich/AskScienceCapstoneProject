import './QuestionCommentsCard.css'

function QuestionCommentsCard({ question }) {
    return (
        question.Comments?.length ?
            <div className='questionCardCommentsContainer'>
                {question.Comments?.map((questionComment) => {
                    return (
                        <div key={questionComment.id} className='questionCardComment'>{questionComment.description}</div>
                    )
                })}
            </div>
        : <div className='noQuestionComments'>No Comments</div>
    )
}

export default QuestionCommentsCard
