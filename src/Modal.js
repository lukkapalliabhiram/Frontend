import "./css/Modal.css";


import React from "react";
const Modal = ({ isOpen, onClose, message, isSuccess}) => {
  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-dialog">
        <div className={`modal-content ${isSuccess ? 'success' : 'failed'}`}>
          <div className="modal-header">
            <button type="button" className="close" onClick={onClose}>
              <span>&times;</span>
            </button>
          </div>
          <div className="modal-body">{message}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;