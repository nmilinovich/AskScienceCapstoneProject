import { useState, useEffect, useRef } from "react";
// import { Link } from 'react-router-dom';
// import * as sessionActions from '../../store/session';
import OpenModalButton from "../../../../OpenModalButton/OpenModalButton";
import UpdateAnswerForm from "./UpdateAnswerForm/UpdateAnswerForm";
import { getUserAnswers } from "../../../../../store/answers";

function UpdateAnswerModalButton({ user, answer }) {
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
      modalComponent={<UpdateAnswerForm user={user} answer={answer} />}
      buttonText='Update Answer'
      onButtonClick={() => setShowMenu(false)}
      onModalClose={() => getUserAnswers()}
      customClass='updateAnswerModalButton'
    />
  );
}

export default UpdateAnswerModalButton;
