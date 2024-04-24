import { useModal } from '../../context/Modal';
import { memo } from 'react';


function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
  customClass, // optional: gives each subinstance of this component a different class
  response
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (typeof onButtonClick === "function") onButtonClick();
  };

  return <button className={customClass} onClick={onClick} response={response}>{buttonText}</button>;
}

export default OpenModalButton;
