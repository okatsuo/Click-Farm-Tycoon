import React from 'react';

const Header = ({ formatTime, elapsedTime, menuOpen, toggleMenu, resetGame, resetRank, gameStartTime }) => {
  return (
    <header className="game-header">
      <div className="header-title">Fazenda de Cliques</div>
      <div className="header-stats">
        <div className="game-timer">
          {gameStartTime ? `⏱️ ${formatTime(elapsedTime)}` : "⏱️ 0m 0s"}
        </div>
      </div>
      <div className="header-menu">
        <button className="menu-button" onClick={toggleMenu}>
          ☰ Menu
        </button>
        {menuOpen && (
          <div className="menu-dropdown">
            <button onClick={resetRank}>Reiniciar Rank</button>
            <button onClick={resetGame}>Reiniciar Jogo</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;