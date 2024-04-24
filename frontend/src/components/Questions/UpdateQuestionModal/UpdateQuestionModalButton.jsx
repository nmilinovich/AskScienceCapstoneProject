import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import * as sessionActions from '../../store/session';
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import UpdateQuestionForm from "./UpdateQuestionForm/UpdateQuestionForm";
import { getQuestionDetails } from "../../../store/questions";

function UpdateQuestionModalButton({ user, response, imageableType }) {
  const dispatch = useDispatch();
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
      modalComponent={<UpdateQuestionForm user={user} response={response} imageableType={imageableType} />}
      buttonText={`Update ${imageableType}`}
      onButtonClick={() => setShowMenu(false)}
      onModalClose={() => dispatch(getQuestionDetails(response.id))}
      customClass={response.type + 'CardType' + ' updateQuestionModalButton'}
    />
  );
}

export default UpdateQuestionModalButton;
