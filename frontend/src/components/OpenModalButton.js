import React from "react";
import { useModal } from "../context/ModalContext";

function OpenModalButton({
  modalComponent, // component to render inside the modal
  buttonText, // text of the button that opens the modal
  onButtonClick, // optional: callback function that will be called once the button that opens the modal is clicked
  onModalClose, // optional: callback function that will be called once the modal is closed
}) {
  const { setModalContent, setOnModalClose } = useModal();

  const onClick = () => {
    if (onModalClose) setOnModalClose(onModalClose);
    setModalContent(modalComponent);
    if (onButtonClick) onButtonClick();
  };

  return (
    <>
      <button
        className="text-secondary-dark-bg dark:text-light-gray flex items-center justify-center rounded-lg px-2 duration-100 ease-in hover:scale-110 hover:bg-light-gray dark:hover:bg-secondary-dark-bg"
        onClick={onClick}
      >
        {buttonText}
      </button>
    </>
  );
}

export default OpenModalButton;
