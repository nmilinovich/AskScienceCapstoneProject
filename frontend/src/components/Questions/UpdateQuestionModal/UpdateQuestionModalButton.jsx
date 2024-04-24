import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from 'react-redux';
// import { Link } from 'react-router-dom';
// import * as sessionActions from '../../store/session';
import OpenModalButton from "../../OpenModalButton/OpenModalButton";
import UpdateQuestionForm from "./UpdateQuestionForm/UpdateQuestionForm";
import { getQuestionDetails } from "../../../store/questions";

function UpdateQuestionModalButton({ user, response, imageableType }) {
  const dispatch = useDispatch();
  const ulRef = useRef();

  return (
    <OpenModalButton
      modalComponent={<UpdateQuestionForm user={user} response={response} imageableType={imageableType} />}
      buttonText='Update Question'
      customClass={response.type + 'CardType' + ' updateQuestionModalButton'}
    />
  );
}

export default UpdateQuestionModalButton;
