import React from "react";
import { useDispatch } from "react-redux";
import { useModal } from '../../../context/Modal';
import { removeComment } from "../../../store/comments";
import { getQuestionDetails } from "../../../store/questions";

function DeleteCommentForm({ comment }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  let url = window.location.href.split('/');
  let questionId = parseInt(url[url.length -1]);
  const handleDelete = () => {
      return dispatch(removeComment(comment.id))
        .then(() => dispatch(getQuestionDetails(questionId)))
        .then(closeModal)
  };

  return (
    <>
        <h1 id="delComH1">Confirm Delete?</h1>
        <p id="delComP">
            Are you sure you want to remove this comment?
        </p>
        <div id="YDeleteComDiv">
          <button id="YDeleteRvwBtn" onClick={handleDelete}>
              Yes (Delete Comment)
          </button>
        </div>
        <div id="NDeleteComDiv">
          <button id="NDeleteRvwBtn" onClick={closeModal}>
              No (Keep Comment)
          </button>
        </div>
    </>
  );
}

export default DeleteCommentForm;
