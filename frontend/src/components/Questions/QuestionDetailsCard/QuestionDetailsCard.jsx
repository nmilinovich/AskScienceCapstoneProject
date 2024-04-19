import './QuestionDetailsCard.css'

function QuestionDetailsCard({ question }) {
    return (
        <div className='questionCard'>
            <div className='questionCardType'>{question.type}</div>
            <h1 className='questionCardTitle'>{question.title}</h1>
            <button className='createQuestionLink'>Ask a Question</button>
            <div>
                <p className='questionCardDescription'>{question.description}</p>
            </div>
            <div className='questionImgsContainer'>
                {question.Images?.map((image) => {
                    console.log(image)
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
