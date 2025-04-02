import React, { useState } from 'react';
import * as priceUtils from '../../utils/prices';
import ItemInfoModal from '../Modals/ItemInfoModal';

const Shop = ({ 
  coins, 
  multiplierPurchases, 
  autoClickerPurchases, 
  criticalPurchases, 
  tempMultiplierPurchases, 
  tempMultiplierActive, 
  tempMultiplierCooldown, 
  cooldownTimeLeft, 
  gameCompleted, 
  buyMultiplier, 
  buyAutoClicker, 
  buyCriticalClick, 
  activateTempMultiplier, 
  buyEndgameItem
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentItemInfo, setCurrentItemInfo] = useState(null);

  // Verifica se todos os upgrades foram comprados ao máximo
  const allUpgradesMaxed = 
    multiplierPurchases >= 5 && 
    autoClickerPurchases >= 5 && 
    criticalPurchases >= 5;
  // Verifica se o jogador pode comprar o item de endgame
  // Agora só precisa ter todos os upgrades no máximo
  const canBuyEndgame = allUpgradesMaxed && !gameCompleted;

  const itemInfoData = {
    multiplier: {
      title: "Multiplicador de Cliques",
      description: "Aumente o valor de cada clique na sua fazenda. Com o multiplicador, você ganha mais moedas a cada vez que clica.",
      details: multiplierPurchases >= 5 
        ? [
            `Nível atual: ${multiplierPurchases}/5 (MÁXIMO)`,
            `Valor por clique: ${multiplierPurchases + 1} moedas`
          ]
        : [
            `Nível atual: ${multiplierPurchases}/5`,
            `Valor por clique: ${multiplierPurchases + 1} moedas`,
            `Com o próximo nível: ${multiplierPurchases + 2} moedas por clique`,
            `Preço do próximo nível: ${Math.floor(priceUtils.getMultiplierPrice(multiplierPurchases))} moedas`
          ]
    },
    autoClicker: {
      title: "Auto Clicker",
      description: "Um sistema automatizado que gera moedas para sua fazenda sem precisar clicar. Ideal para agricultores que querem produtividade mesmo quando estão ausentes.",
      details: autoClickerPurchases >= 5
        ? [
            `Nível atual: ${autoClickerPurchases}/5 (MÁXIMO)`,
            `Produção atual: ${Math.pow(2, autoClickerPurchases) - 1} moedas/segundo`
          ]
        : [
            `Nível atual: ${autoClickerPurchases}/5`,
            `Produção atual: ${Math.pow(2, autoClickerPurchases) - 1} moedas/segundo`,
            `Com o próximo nível: ${Math.pow(2, autoClickerPurchases + 1) - 1} moedas/segundo`,
            `Preço do próximo nível: ${Math.floor(priceUtils.getAutoClickerPrice(autoClickerPurchases))} moedas`
          ]
    },
    criticalClick: {
      title: "Clique Crítico",
      description: "Dá a chance do seu clique ter um valor muito maior. A sorte pode estar ao seu favor e multiplicar seus ganhos!",
      details: criticalPurchases >= 5
        ? [
            `Nível atual: ${criticalPurchases}/5 (MÁXIMO)`,
            `Chance atual: ${criticalPurchases * 5}%`,
            `Multiplicador crítico: 5x o valor normal`
          ]
        : [
            `Nível atual: ${criticalPurchases}/5`,
            `Chance atual: ${criticalPurchases * 5}%`,
            `Multiplicador crítico: 5x o valor normal`,
            `Com o próximo nível: ${(criticalPurchases + 1) * 5}% de chance`,
            `Preço do próximo nível: ${Math.floor(priceUtils.getCriticalClickPrice(criticalPurchases))} moedas`
          ]
    },
    tempMultiplier: {
      title: "Potência Dupla",
      description: "Ative um poder temporário que dobra todos os seus ganhos por clique durante um curto período de tempo.",
      details: [
        "Duração: 10 segundos de poder dobrado",
        "Cooldown: 1 minuto após usar",
        `Preço para ativar: ${Math.floor(priceUtils.getTempMultiplierPrice(tempMultiplierPurchases))} moedas`,
        `Status: ${tempMultiplierActive ? 'ATIVO!' : tempMultiplierCooldown ? 'EM ESPERA' : 'Pronto para usar'}`
      ]
    },
    endgame: {
      title: "Vender a Fazenda",
      description: "Após maximizar todos os recursos da sua fazenda, você pode vendê-la e se aposentar como um fazendeiro de sucesso!",
      details: gameCompleted
        ? [
            "Status: Fazenda vendida com sucesso!",
            "Parabéns por completar o jogo!"
          ]
        : [
            "Requisito: Todos os upgrades no nível máximo (nível 5)",
            `Status atual: ${allUpgradesMaxed ? 'Pronto para vender!' : 'Ainda precisa maximizar upgrades'}`,
            "Recompensa: Completar o jogo com sucesso!"
          ]
    }
  };

  const openModal = (itemType) => {
    setCurrentItemInfo(itemInfoData[itemType]);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="shop-container">
      <h2 className="shop-title">Loja da Fazenda</h2>
      <div className="shop-items">
        <div className="shop-item">
          <div className="shop-item-header">
            <h3>Multiplicador</h3>
            <div className="info-icon" onClick={() => openModal('multiplier')}>ℹ️</div>
          </div>
          <div className="shop-item-details">
            <div className="price-purchases">
              <span className="price">{Math.floor(priceUtils.getMultiplierPrice(multiplierPurchases))} 💰</span>
              <span className="purchases">{multiplierPurchases}/5</span>
            </div>
            <button 
              onClick={buyMultiplier} 
              disabled={coins < priceUtils.getMultiplierPrice(multiplierPurchases) || multiplierPurchases >= 5 || gameCompleted}
            >
              {multiplierPurchases >= 5 ? 'MÁXIMO' : 'Comprar'}
            </button>
          </div>
        </div>
        
        <div className="shop-item">
          <div className="shop-item-header">
            <h3>Auto Clicker</h3>
            <div className="info-icon" onClick={() => openModal('autoClicker')}>ℹ️</div>
          </div>
          <div className="shop-item-details">
            <div className="price-purchases">
              <span className="price">{Math.floor(priceUtils.getAutoClickerPrice(autoClickerPurchases))} 💰</span>
              <span className="purchases">{autoClickerPurchases}/5</span>
            </div>
            <button 
              onClick={buyAutoClicker} 
              disabled={coins < priceUtils.getAutoClickerPrice(autoClickerPurchases) || autoClickerPurchases >= 5 || gameCompleted}
            >
              {autoClickerPurchases >= 5 ? 'MÁXIMO' : 'Comprar'}
            </button>
          </div>
        </div>
        
        <div className="shop-item">
          <div className="shop-item-header">
            <h3>Clique Crítico</h3>
            <div className="info-icon" onClick={() => openModal('criticalClick')}>ℹ️</div>
          </div>
          <div className="shop-item-details">
            <div className="price-purchases">
              <span className="price">{Math.floor(priceUtils.getCriticalClickPrice(criticalPurchases))} 💰</span>
              <span className="purchases">{criticalPurchases}/5</span>
            </div>
            <button 
              onClick={buyCriticalClick} 
              disabled={coins < priceUtils.getCriticalClickPrice(criticalPurchases) || criticalPurchases >= 5 || gameCompleted}
            >
              {criticalPurchases >= 5 ? 'MÁXIMO' : 'Comprar'}
            </button>
          </div>
        </div>
        
        <div className="shop-item">
          <div className="shop-item-header">
            <h3>Potência Dupla</h3>
            <div className="info-icon" onClick={() => openModal('tempMultiplier')}>ℹ️</div>
          </div>
          <div className="shop-item-details">
            <div className="price-purchases">
              <span className="price">{Math.floor(priceUtils.getTempMultiplierPrice(tempMultiplierPurchases))} 💰</span>
              {tempMultiplierCooldown && (
                <span className="cooldown">⏱️ {priceUtils.formatCooldownTime(cooldownTimeLeft)}</span>
              )}
            </div>
            <button 
              onClick={activateTempMultiplier} 
              disabled={coins < priceUtils.getTempMultiplierPrice(tempMultiplierPurchases) || tempMultiplierCooldown || gameCompleted}
              className={tempMultiplierActive ? 'active-power' : ''}
            >
              {tempMultiplierActive ? 'ATIVO!' : tempMultiplierCooldown ? 'EM ESPERA' : 'Ativar'}
            </button>
          </div>
        </div>
        
        <div className={`shop-item ${canBuyEndgame ? 'endgame-item' : 'endgame-item-disabled'}`}>
          <div className="shop-item-header">
            <h3>🌟 Vender Fazenda</h3>
            <div className="info-icon" onClick={() => openModal('endgame')}>ℹ️</div>
          </div>
          <div className="shop-item-details">
            <p className="endgame-description">Complete todos os upgrades da fazenda e se aposente.</p>
            <button 
              onClick={buyEndgameItem} 
              disabled={!canBuyEndgame}
              className="endgame-button"
            >
              {gameCompleted ? 'VENDIDA' : 'Aposentar'}
            </button>
          </div>
        </div>
      </div>

      <ItemInfoModal 
        isOpen={modalOpen} 
        closeModal={closeModal} 
        itemInfo={currentItemInfo} 
      />
    </div>
  );
};

export default Shop;