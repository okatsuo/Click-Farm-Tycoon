import { useState, useEffect } from 'react';

export const useGameResources = () => {
  // Estado para armazenar os recursos do jogo
  const [coins, setCoins] = useState(() => {
    const savedCoins = localStorage.getItem('farmCoins');
    return savedCoins ? parseInt(savedCoins) : 0;
  });
  
  const [clickValue, setClickValue] = useState(() => {
    const savedClickValue = localStorage.getItem('farmClickValue');
    return savedClickValue ? parseInt(savedClickValue) : 1;
  });
  
  // Estado para controlar o número de compras do multiplicador
  const [multiplierPurchases, setMultiplierPurchases] = useState(() => {
    const savedPurchases = localStorage.getItem('multiplierPurchases');
    return savedPurchases ? parseInt(savedPurchases) : 0;
  });

  // Estado para controlar o número de compras do autoclicker
  const [autoClickerPurchases, setAutoClickerPurchases] = useState(() => {
    const savedPurchases = localStorage.getItem('autoClickerPurchases');
    return savedPurchases ? parseInt(savedPurchases) : 0;
  });
  
  // Estados para os novos poderes
  const [criticalClickChance, setCriticalClickChance] = useState(() => {
    const savedChance = localStorage.getItem('criticalClickChance');
    return savedChance ? parseFloat(savedChance) : 0;
  });
  
  const [criticalPurchases, setCriticalPurchases] = useState(() => {
    const savedPurchases = localStorage.getItem('criticalPurchases');
    return savedPurchases ? parseInt(savedPurchases) : 0;
  });
  
  const [tempMultiplierActive, setTempMultiplierActive] = useState(false);
  const [tempMultiplierCooldown, setTempMultiplierCooldown] = useState(false);
  const [tempMultiplierPurchases, setTempMultiplierPurchases] = useState(() => {
    const savedPurchases = localStorage.getItem('tempMultiplierPurchases');
    return savedPurchases ? parseInt(savedPurchases) : 0;
  });
  const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0);

  // Efeito para salvar o progresso do jogo no localStorage
  useEffect(() => {
    localStorage.setItem('farmCoins', coins);
    localStorage.setItem('farmClickValue', clickValue);
    localStorage.setItem('multiplierPurchases', multiplierPurchases);
    localStorage.setItem('autoClickerPurchases', autoClickerPurchases);
    localStorage.setItem('criticalClickChance', criticalClickChance);
    localStorage.setItem('criticalPurchases', criticalPurchases);
    localStorage.setItem('tempMultiplierPurchases', tempMultiplierPurchases);
  }, [coins, clickValue, multiplierPurchases, autoClickerPurchases, criticalClickChance, criticalPurchases, tempMultiplierPurchases]);

  return {
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
  };
};