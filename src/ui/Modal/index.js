import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import './Modal.css';

export default function Modal(props) {
  const { title, showDialog, child, onClose } = props;
  const modalRef = useRef(null);
  const dispatch = useDispatch();

  const closeModal = useCallback(() => dispatch(onClose()), [
    dispatch,
    onClose,
  ]);

  useEffect(() => {
    const onOutsideClick = ({ target }) => {
      if (modalRef && !modalRef.current.contains(target)) {
        closeModal();
      }
    };

    if (showDialog) {
      document.addEventListener("click", onOutsideClick, false);
    } else {
      document.removeEventListener("click", onOutsideClick, false);
    }

    return () => document.removeEventListener("click", onOutsideClick, false);
  }, [showDialog, closeModal]);

  return (
    <div
      ref={modalRef}
      className="modal-content"
      style={{ display: showDialog ? "block" : "none" }}
    >
      <div className="modal-header">
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <h2>{title}</h2>
      </div>
      <div className="modal-body">{child}</div>
    </div>
  );
}
