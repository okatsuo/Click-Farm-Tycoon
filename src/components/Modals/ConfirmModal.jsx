import React from 'react';
import './Modal.css';

const ConfirmModal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content confirm-modal">
        <h2>{title}</h2>
        <p>{message}</p>
        
        <div className="modal-footer modal-actions">
          <button 
            onClick={onClose} 
            className="cancel-button"
          >
            Cancelar
          </button>
          <button 
            onClick={onConfirm} 
            className="confirm-button"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;