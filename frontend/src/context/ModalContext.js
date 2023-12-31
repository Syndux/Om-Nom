import React, { useRef, useState, useContext } from "react";
import ReactDOM from "react-dom";

import { useAppContext } from "./AppContext";

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [modalContent, setModalContent] = useState(null);
  // callback function that will be called when modal is closing
  const [onModalClose, setOnModalClose] = useState(null);

  const closeModal = () => {
    setModalContent(null); // clear the modal contents
    // If callback function is truthy, call the callback function and reset it
    // to null:
    if (typeof onModalClose === "function") {
      setOnModalClose(null);
      onModalClose();
    }
  };

  const contextValue = {
    modalRef, // reference to modal div
    modalContent, // React component to render inside modal
    setModalContent, // function to set the React component to render inside modal
    setOnModalClose, // function to set the callback function called when modal is closing
    closeModal, // function to close the modal
  };

  return (
    <>
      <ModalContext.Provider value={contextValue}>
        {children}
      </ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

export function Modal() {
  const { modalRef, modalContent, closeModal } = useContext(ModalContext);
  const { currentMode } = useAppContext();
  // If there is no div referenced by the modalRef or modalContent is not a
  // truthy value, render nothing:
  if (!modalRef || !modalRef.current || !modalContent) return null;

  // Render the following component to the div referenced by the modalRef
  return ReactDOM.createPortal(
    <div
      id="modal"
      className={`fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center ${currentMode === "Dark" ? "dark" : ""}`}
    >
      <div
        id="modal-background"
        onClick={closeModal}
        className="fixed bottom-0 left-0 right-0 top-0 bg-black/70"
      />
      <div id="modal-content" className="absolute bg-light-gray dark:bg-secondary-dark-bg">{modalContent}</div>
    </div>,
    modalRef.current,
  );
}

export const useModal = () => useContext(ModalContext);
