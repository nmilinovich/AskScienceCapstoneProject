import './QuestionCommentsCard.css'
import PostCommentModalButton from '../CommentModalButton/PostCommentModalButton'
import UpdateCommentModalButton from '../CommentModalButton/UpdateCommentModalButton';
import { useSelector } from 'react-redux'
import DeleteCommentModalButton from '../CommentModalButton/DeleteCommentModalButton';

function QuestionCommentsCard({ question }) {
    let user = useSelector((state) => state.session.user?.id);
    let hasComment = false;
    question.Comments.forEach((comment) => {
        if (comment.userId === user) {
            hasComment = true
        }
    });
    return (
        <div className='questionCardCommentsContainer'>
            <div>
                {question.Comments?.map((questionComment) => {
                    return (
                        <div className='questionCommentDescription' key={questionComment.id}>
                            {questionComment.description}
                            {questionComment.userId === user ?
                            <div className='questionCommentButtons'>
                                <UpdateCommentModalButton comment={questionComment} response={questionComment} commentableType='question' />
                                <DeleteCommentModalButton comment={questionComment}/>
                            </div>
                            : null}
                        </div>
                    )
                })}
            </div>
            <div>
                {!hasComment && user ?
                    <PostCommentModalButton commentableId={question.id} commentableType='question' />
                : null
                }
            </div>
        </div>

            // <div className='questionCardCommentsContainer'>
            //     {question.Comments?.map((questionComment) => {
            //         if (questionComment.userId === user) {
            //             return
            //         }
            //         return (
            //             <div key={questionComment.id} className='questionCardComment'>{questionComment.description}</div>
            //         )
            //     })}
            // </div>

            // <div>
            //     <div className='noQuestionComments'>No Comments</div>
            //     <PostCommentModalButton commentableId={question.id} commentableType='question'/>
            // </div>

    )
}

export default QuestionCommentsCard
