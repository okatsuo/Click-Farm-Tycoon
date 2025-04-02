import React, { useRef } from 'react';
import './Farm.css';

const Farm = ({ 
  handleFarmClick, 
  clickAnimations, 
  gameCompleted, 
  coins, 
  clickValue, 
  tempMultiplierActive, 
  autoClickerPurchases, 
  criticalClickChance, 
  getAutoClickPower, 
  timeRecords 
}) => {
  // Referência para a área de clique
  const farmAreaRef = useRef(null);

  // Função para formatar o tempo em minutos e segundos
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="game-main-content">
      <div className="resources">
        <div className="resource">
          💰 Moedas: {Math.floor(coins)}
        </div>
        <div className="resource">
          ⚡ Poder de Clique: {clickValue}
          {tempMultiplierActive && <span className="buff-indicator"> x2</span>}
        </div>
        {autoClickerPurchases > 0 && (
          <div className="resource">
            🤖 Auto Cliques: {getAutoClickPower(autoClickerPurchases)}/s
          </div>
        )}
        {criticalClickChance > 0 && (
          <div className="resource">
            🎯 Chance de Crítico: {criticalClickChance}%
          </div>
        )}
      </div>
      
      <div 
        className="farm-area" 
        ref={farmAreaRef}
        onClick={gameCompleted ? undefined : handleFarmClick}
      >
        {clickAnimations.map(anim => (
          <div
            key={anim.id}
            className={`click-animation ${anim.isCritical ? 'critical-animation' : ''}`}
            style={{ left: `${anim.x}px`, top: `${anim.y}px` }}
          >
            {anim.value}
          </div>
        ))}
      </div>

      {/* Top 3 Records Display - Sempre exibido */}
      <div className="top-records">
        <h3>Melhores Tempos</h3>
        <div className="records-list">
          {timeRecords && timeRecords.length > 0 ? (
            timeRecords.slice(0, 3).map((record, index) => (
              <div key={index} className="record-item">
                <span className="rank">{index + 1}º</span>
                <span className="time">{formatTime(record.time)}</span>
                <span className="date">{record.date}</span>
              </div>
            ))
          ) : (
            <div className="no-records-message">
              Nenhum jogo finalizado ainda. Complete o jogo para registrar seu tempo!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Farm;