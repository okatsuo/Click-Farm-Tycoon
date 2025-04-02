import React from 'react';
import * as priceUtils from '../../utils/prices';

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
  // Verifica se todos os upgrades foram comprados ao máximo
  const allUpgradesMaxed = 
    multiplierPurchases >= 5 && 
    autoClickerPurchases >= 5 && 
    criticalPurchases >= 5;

  // Verifica se o jogador pode comprar o item de endgame
  // Agora só precisa ter todos os upgrades no máximo
  const canBuyEndgame = allUpgradesMaxed && !gameCompleted;

  return (
    <div className="shop-container">
      <h2 className="shop-title">Loja da Fazenda</h2>
      <div className="shop-items">
        <div className="shop-item">
          <div className="shop-item-header">
            <h3>Multiplicador</h3>
            <div className="info-icon" title="Aumente o valor de cada clique em +1">ℹ️</div>
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
            <div className="info-icon" title="Gera dinheiro automaticamente a cada segundo. O poder dobra a cada nível!">ℹ️</div>
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
            <div className="info-icon" title="Chance de um clique valer 5x mais. Cada nível aumenta a chance.">ℹ️</div>
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
            <div className="info-icon" title="Dobra temporariamente o valor de todos os cliques por 10 segundos. Tem um cooldown de 1 minuto.">ℹ️</div>
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
            <h3>🌟 Vender Fazenda <span className="info-icon" title="Complete todos os upgrades e se aposente. Você completou tudo!">ℹ️</span></h3>
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
    </div>
  );
};

export default Shop;