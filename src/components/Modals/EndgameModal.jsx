import React from 'react';
import './Modal.css';

const EndgameModal = ({ showEndgameModal, elapsedTime, timeRecords, formatTime, startNewGame }) => {
  if (!showEndgameModal) return null;
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>🏆 Parabéns! 🏆</h2>
        <p>Você vendeu sua fazenda e agora está aposentado!</p>
        <p>Seu tempo até a aposentadoria: <strong>{formatTime(elapsedTime)}</strong></p>
        
        <div className="records-list">
          <h3>Melhores Tempos</h3>
          <table className="records-table">
            <thead>
              <tr>
                <th>Posição</th>
                <th>Tempo</th>
                <th>Data</th>
              </tr>
            </thead>
            <tbody>
              {timeRecords.map((record, index) => (
                <tr key={index} className={record.time === elapsedTime ? 'time-highlight' : ''}>
                  <td>{index + 1}</td>
                  <td>{formatTime(record.time)}</td>
                  <td>{record.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="modal-footer">
          <button className="new-game-button" onClick={startNewGame}>
            Nova Fazenda
          </button>
        </div>
      </div>
    </div>
  );
};

export default EndgameModal;