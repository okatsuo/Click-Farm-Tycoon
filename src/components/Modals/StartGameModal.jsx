import React from 'react';
import './Modal.css'; // Vamos usar o mesmo CSS do EndgameModal

const StartGameModal = ({ showStartModal, startGame }) => {
  if (!showStartModal) return null;

  return (
    <div className="modal-overlay start-game-modal">
      <div className="modal-content">
        <h2>Bem-vindo à Fazenda!</h2>
        <p>Clique para ganhar moedas, compre melhorias e torne sua fazenda próspera!</p>
        <p>Quanto mais rápido você completar os objetivos, melhor será seu recorde!</p>
        
        <div className="modal-footer">
          <button onClick={startGame} className="start-button">Iniciar</button>
        </div>
      </div>
    </div>
  );
};

export default StartGameModal;