import { useState, useEffect, useRef } from "react";
// import { useDispatch } from 'react-redux';
// import { useSelector } from "react-redux";
import OpenModalButton from "../../../../OpenModalButton/OpenModalButton";
import UpdateAnswerForm from "./UpdateAnswerForm/UpdateAnswerForm";

function UpdateAnswerModalButton({ answer }) {
  // const dispatch = useDispatch();
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

  const closeMenu = () => setShowMenu(false);


  return (
    <OpenModalButton
      modalComponent={<UpdateAnswerForm answer={answer} closeMenu={closeMenu} />}
      buttonText='Update Answer'
      onButtonClick={closeMenu}
      onModalClose
      customClass={'CardType' + ' updateQuestionModalButton'}
    />
  );
}

export default UpdateAnswerModalButton;
