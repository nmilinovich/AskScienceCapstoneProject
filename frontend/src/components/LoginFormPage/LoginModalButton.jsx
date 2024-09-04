import { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import * as sessionActions from '../../store/session';
import OpenModalButton from '../OpenModalButton/OpenModalButton'
import LoginFormPage from "./LoginFormPage";

function LoginModalButton() {
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
      modalComponent={<LoginFormPage />}
      buttonText='Login'
      onButtonClick={() => setShowMenu(false)}
    //   onModalClose={() => dispatch(getQuestionDetails(response.id))}
      customClass='nav-Btn'
    />
  );
}

export default LoginModalButton;
