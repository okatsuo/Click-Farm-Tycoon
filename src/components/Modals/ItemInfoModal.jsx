import React from 'react';
import './Modal.css';
import './ItemInfoModal.css';

const ItemInfoModal = ({ isOpen, closeModal, itemInfo }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal item-info-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={closeModal}>×</button>
        <div className="item-info-content">
          <h3 className="item-info-title">{itemInfo.title}</h3>
          <div className="item-info-description">
            <p>{itemInfo.description}</p>
          </div>
          {itemInfo.details && (
            <div className="item-info-details">
              <h4>Detalhes:</h4>
              <ul>
                {itemInfo.details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItemInfoModal;