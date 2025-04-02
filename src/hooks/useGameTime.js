import { useState, useEffect, useRef } from 'react';

export const useGameTime = () => {
  // Estados para controle de tempo e endgame
  const [gameStartTime, setGameStartTime] = useState(() => {
    const savedStartTime = localStorage.getItem('gameStartTime');
    return savedStartTime ? parseInt(savedStartTime) : null; // Inicialmente null se não houver valor salvo
  });
  
  const [gameCompleted, setGameCompleted] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [timeRecords, setTimeRecords] = useState(() => {
    const savedRecords = localStorage.getItem('timeRecords');
    return savedRecords ? JSON.parse(savedRecords) : [];
  });
  
  const [showEndgameModal, setShowEndgameModal] = useState(false);
  
  // Referência para o intervalo de atualização do tempo
  const timerIntervalRef = useRef(null);
  
  // Efeito para atualizar o tempo decorrido
  useEffect(() => {
    // Só inicia o contador se o jogo estiver realmente iniciado (gameStartTime não for null)
    // e não estiver completado
    if (gameStartTime && !gameCompleted) {
      timerIntervalRef.current = setInterval(() => {
        setElapsedTime(Math.floor((Date.now() - gameStartTime) / 1000));
      }, 1000);
      
      return () => clearInterval(timerIntervalRef.current);
    }
  }, [gameStartTime, gameCompleted]);
  
  // Efeito para salvar o tempo de jogo e recordes no localStorage
  useEffect(() => {
    if (gameStartTime) {
      localStorage.setItem('gameStartTime', gameStartTime);
    }
    localStorage.setItem('timeRecords', JSON.stringify(timeRecords));
  }, [gameStartTime, timeRecords]);
  
  // Função para formatar o tempo em horas:minutos:segundos
  const formatTime = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;
    
    return `${hours > 0 ? hours + 'h ' : ''}${minutes}m ${seconds}s`;
  };
  
  // Limpar intervalos quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, []);
  
  return {
    gameStartTime, setGameStartTime,
    gameCompleted, setGameCompleted,
    elapsedTime, setElapsedTime,
    timeRecords, setTimeRecords,
    showEndgameModal, setShowEndgameModal,
    timerIntervalRef, formatTime
  };
};