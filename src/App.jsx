import { useState, useEffect, useRef } from 'react'
import './App.css'

// Importando componentes
import Header from './components/Header/Header'
import Farm from './components/Farm/Farm'
import Shop from './components/Shop/Shop'
import EndgameModal from './components/Modals/EndgameModal'
import StartGameModal from './components/Modals/StartGameModal'

// Importando hooks
import { useGameResources } from './hooks/useGameResources'
import { useGameTime } from './hooks/useGameTime'

// Importando funções de utilidade
import * as priceUtils from './utils/prices'

function App() {
  // Utilizando os hooks personalizados para obter o gameStartTime primeiro
  const {
    gameStartTime, setGameStartTime,
    gameCompleted, setGameCompleted,
    elapsedTime, setElapsedTime,
    timeRecords, setTimeRecords,
    showEndgameModal, setShowEndgameModal,
    timerIntervalRef, formatTime
  } = useGameTime();
  
  // Estado para controlar a exibição do modal de início
  // Agora o modal só aparece se gameStartTime for null (jogo não iniciado)
  const [showStartModal, setShowStartModal] = useState(() => {
    // Se gameStartTime existe e não é null, o jogo foi iniciado
    return gameStartTime === null;
  });

  // Utilizando os demais hooks personalizados
  const {
    coins, setCoins,
    clickValue, setClickValue,
    multiplierPurchases, setMultiplierPurchases,
    autoClickerPurchases, setAutoClickerPurchases,
    criticalClickChance, setCriticalClickChance,
    criticalPurchases, setCriticalPurchases,
    tempMultiplierActive, setTempMultiplierActive,
    tempMultiplierCooldown, setTempMultiplierCooldown,
    tempMultiplierPurchases, setTempMultiplierPurchases,
    cooldownTimeLeft, setCooldownTimeLeft
  } = useGameResources();
  
  // Estado para controlar a visibilidade do menu dropdown
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Estado para armazenar as animações de clique
  const [clickAnimations, setClickAnimations] = useState([]);
  
  // Referência para o intervalo de atualização do cooldown
  const cooldownIntervalRef = useRef(null);
  
  // Função para iniciar o jogo quando o usuário clicar em "Iniciar"
  const startGame = () => {
    setShowStartModal(false);
    const startTime = Date.now();
    setGameStartTime(startTime);
    localStorage.setItem('gameStartTime', startTime);
  };
  
  // Efeito para o autoclicker gerar moedas automaticamente
  useEffect(() => {
    if (autoClickerPurchases > 0 && !gameCompleted && !showStartModal) {
      const clickPower = priceUtils.getAutoClickPower(autoClickerPurchases);
      const interval = setInterval(() => {
        setCoins(prevCoins => Math.round((prevCoins + clickPower) * 100) / 100);
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [autoClickerPurchases, gameCompleted, setCoins, showStartModal]);
  
  // Função para lidar com cliques na fazenda
  const handleFarmClick = (e) => {
    if (gameCompleted || showStartModal) return;
    
    // Verifica se o clique é crítico
    let clickReward = clickValue;
    let isCritical = false;
    
    if (criticalClickChance > 0 && Math.random() * 100 < criticalClickChance) {
      clickReward = clickValue * 5;
      isCritical = true;
    }
    
    // Aplica o multiplicador temporário se estiver ativo
    if (tempMultiplierActive) {
      clickReward *= 2;
    }
    
    // Atualiza a quantidade de moedas e garante que seja um número arredondado
    setCoins(Math.round((coins + clickReward) * 100) / 100);
    
    // Calcula a posição relativa ao elemento, não à página
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const id = Date.now();
    setClickAnimations(prev => [...prev, { 
      id, 
      x, 
      y, 
      value: `💰 +${clickReward}`,
      isCritical
    }]);
    
    // Remove a animação após ela terminar
    setTimeout(() => {
      setClickAnimations(prev => prev.filter(anim => anim.id !== id));
    }, 1000);
  };
  
  // Função para comprar o upgrade de multiplicador
  const buyMultiplier = () => {
    const price = priceUtils.getMultiplierPrice(multiplierPurchases);
    
    if (coins >= price && multiplierPurchases < 5 && !showStartModal) {
      setCoins(Math.round((coins - price) * 100) / 100);
      setClickValue(clickValue + 1);
      setMultiplierPurchases(multiplierPurchases + 1);
    }
  };

  // Função para comprar o autoclicker
  const buyAutoClicker = () => {
    const price = priceUtils.getAutoClickerPrice(autoClickerPurchases);
    
    if (coins >= price && autoClickerPurchases < 5 && !showStartModal) {
      setCoins(Math.round((coins - price) * 100) / 100);
      setAutoClickerPurchases(autoClickerPurchases + 1);
    }
  };

  // Função para comprar o upgrade de clique crítico
  const buyCriticalClick = () => {
    const price = priceUtils.getCriticalClickPrice(criticalPurchases);
    
    if (coins >= price && criticalPurchases < 5 && !showStartModal) {
      setCoins(Math.round((coins - price) * 100) / 100);
      
      // Calcula a nova chance de crítico baseado no nível de compra
      // Níveis: 2%, 7%, 14%, 22%, 30%
      const criticalChances = [2, 7, 14, 22, 30];
      setCriticalClickChance(criticalChances[criticalPurchases]);
      
      setCriticalPurchases(criticalPurchases + 1);
    }
  };
  
  // Função para ativar o multiplicador temporário
  const activateTempMultiplier = () => {
    const price = priceUtils.getTempMultiplierPrice(tempMultiplierPurchases);
    
    if (coins >= price && !tempMultiplierCooldown && !showStartModal) {
      setCoins(Math.round((coins - price) * 100) / 100);
      setTempMultiplierActive(true);
      setTempMultiplierCooldown(true);
      setTempMultiplierPurchases(tempMultiplierPurchases + 1);
      
      // Define o tempo total do cooldown (5 minutos em segundos)
      setCooldownTimeLeft(300);
      
      // Inicia o contador para o cooldown
      cooldownIntervalRef.current = setInterval(() => {
        setCooldownTimeLeft(prevTime => {
          if (prevTime <= 1) {
            clearInterval(cooldownIntervalRef.current);
            setTempMultiplierCooldown(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
      
      // Define um timeout para desativar o efeito do multiplicador após 30 segundos
      setTimeout(() => {
        setTempMultiplierActive(false);
      }, 30000);
    }
  };
  
  // Função para comprar o item de endgame
  const buyEndgameItem = () => {
    if (showStartModal) return;
    
    // Registra o tempo final do jogo
    const finalTime = Math.floor((Date.now() - gameStartTime) / 1000);
    setElapsedTime(finalTime);
    setGameCompleted(true);
    
    // Adiciona o novo recorde à lista
    const newRecord = {
      time: finalTime,
      date: new Date().toLocaleDateString()
    };
    
    // Atualiza os recordes, ordenando-os pelo menor tempo
    setTimeRecords(prev => {
      const updatedRecords = [...prev, newRecord].sort((a, b) => a.time - b.time);
      // Mantém apenas os 10 melhores recordes
      return updatedRecords.slice(0, 10);
    });
    
    // Mostra o modal de endgame
    setShowEndgameModal(true);
    
    // Limpa os intervalos
    if (cooldownIntervalRef.current) {
      clearInterval(cooldownIntervalRef.current);
    }
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
  };
  
  // Função para reiniciar o jogo
  const resetGame = () => {
    if (confirm("Tem certeza que deseja reiniciar o jogo? Todo o progresso será perdido.")) {
      setCoins(0);
      setClickValue(1);
      setMultiplierPurchases(0);
      setAutoClickerPurchases(0);
      setCriticalClickChance(0);
      setCriticalPurchases(0);
      setTempMultiplierActive(false);
      setTempMultiplierCooldown(false);
      setTempMultiplierPurchases(0);
      setGameStartTime(null); // Define como null ao invés de Date.now()
      setGameCompleted(false);
      setShowEndgameModal(false);
      setShowStartModal(true);
      setMenuOpen(false);
      
      // Limpa os temporizadores
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
      }
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      
      // Limpa o localStorage relacionado ao progresso do jogo
      localStorage.removeItem('farmCoins');
      localStorage.removeItem('farmClickValue');
      localStorage.removeItem('multiplierPurchases');
      localStorage.removeItem('autoClickerPurchases');
      localStorage.removeItem('criticalClickChance');
      localStorage.removeItem('criticalPurchases');
      localStorage.removeItem('tempMultiplierPurchases');
      localStorage.removeItem('gameStartTime');
    }
  };
  
  // Função para iniciar um novo jogo após completar
  const startNewGame = () => {
    setCoins(0);
    setClickValue(1);
    setMultiplierPurchases(0);
    setAutoClickerPurchases(0);
    setCriticalClickChance(0);
    setCriticalPurchases(0);
    setTempMultiplierActive(false);
    setTempMultiplierCooldown(false);
    setTempMultiplierPurchases(0);
    setGameStartTime(null); // Define como null ao invés de Date.now()
    setGameCompleted(false);
    setShowEndgameModal(false);
    setShowStartModal(true);
    
    // Limpa o localStorage relacionado ao progresso do jogo, mas mantém os recordes
    localStorage.removeItem('farmCoins');
    localStorage.removeItem('farmClickValue');
    localStorage.removeItem('multiplierPurchases');
    localStorage.removeItem('autoClickerPurchases');
    localStorage.removeItem('criticalClickChance');
    localStorage.removeItem('criticalPurchases');
    localStorage.removeItem('tempMultiplierPurchases');
    localStorage.removeItem('gameStartTime');
  };
  
  // Limpar intervalos quando o componente é desmontado
  useEffect(() => {
    return () => {
      if (cooldownIntervalRef.current) {
        clearInterval(cooldownIntervalRef.current);
      }
    };
  }, []);
  
  // Função para alternar a visibilidade do menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  
  // Função para resetar os recordes de tempo (rank)
  const resetRank = () => {
    if (confirm("Tem certeza que deseja apagar todos os recordes? Esta ação não pode ser desfeita.")) {
      setTimeRecords([]);
      localStorage.removeItem('timeRecords');
      setMenuOpen(false);
    }
  };
  
  return (
    <div className="game-container">
      <StartGameModal 
        showStartModal={showStartModal}
        startGame={startGame}
      />
      
      <EndgameModal 
        showEndgameModal={showEndgameModal}
        elapsedTime={elapsedTime}
        timeRecords={timeRecords}
        formatTime={formatTime}
        startNewGame={startNewGame}
      />
      
      <Header 
        formatTime={formatTime}
        elapsedTime={elapsedTime}
        menuOpen={menuOpen}
        toggleMenu={toggleMenu}
        resetGame={resetGame}
        resetRank={resetRank}
        gameStartTime={gameStartTime}
      />
      
      <div className="farm-game">
        <Farm 
          handleFarmClick={handleFarmClick}
          clickAnimations={clickAnimations}
          gameCompleted={gameCompleted}
          coins={coins}
          clickValue={clickValue}
          tempMultiplierActive={tempMultiplierActive}
          autoClickerPurchases={autoClickerPurchases}
          criticalClickChance={criticalClickChance}
          getAutoClickPower={priceUtils.getAutoClickPower}
          timeRecords={timeRecords}
        />
        
        <Shop 
          coins={coins}
          multiplierPurchases={multiplierPurchases}
          autoClickerPurchases={autoClickerPurchases}
          criticalPurchases={criticalPurchases}
          tempMultiplierPurchases={tempMultiplierPurchases}
          tempMultiplierActive={tempMultiplierActive}
          tempMultiplierCooldown={tempMultiplierCooldown}
          cooldownTimeLeft={cooldownTimeLeft}
          gameCompleted={gameCompleted}
          buyMultiplier={buyMultiplier}
          buyAutoClicker={buyAutoClicker}
          buyCriticalClick={buyCriticalClick}
          activateTempMultiplier={activateTempMultiplier}
          buyEndgameItem={buyEndgameItem}
        />
      </div>
    </div>
  )
}

export default App
