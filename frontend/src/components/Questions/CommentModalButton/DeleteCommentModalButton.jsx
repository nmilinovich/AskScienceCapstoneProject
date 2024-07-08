import { useState, useEffect, useRef } from "react";
// import { Link } from 'react-router-dom';
// import * as sessionActions from '../../store/session';
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import DeleteCommentForm from "./DeleteCommentModal";
// import { getQuestionDetails } from "../../../store/questions";

function DeleteCommentModalButton({comment}) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <OpenModalButton
      modalComponent={<DeleteCommentForm comment={comment} />}
      buttonText='Delete Comment'
      onButtonClick={() => setShowMenu(false)}
      // onModalClose={() => dispatch(getQuestionDetails(response.id))}
    //   customClass={response.type + 'CardType' + ' updateQuestionModalButton'}
    />
  );
}

export default DeleteCommentModalButton;
