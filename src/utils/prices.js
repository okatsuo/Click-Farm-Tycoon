// Funções para calcular preços dos itens da loja

// Função para calcular o preço do multiplicador
export const getMultiplierPrice = (multiplierPurchases) => {
  return 50 * Math.pow(1.5, multiplierPurchases);
};

// Função para calcular o preço do autoclicker
export const getAutoClickerPrice = (autoClickerPurchases) => {
  return 100 * Math.pow(1.6, autoClickerPurchases);
};

// Função para calcular o preço do clique crítico
export const getCriticalClickPrice = (criticalPurchases) => {
  return 200 * Math.pow(2, criticalPurchases);
};

// Função para calcular o preço do multiplicador temporário
export const getTempMultiplierPrice = (tempMultiplierPurchases) => {
  return 500 * Math.pow(2, tempMultiplierPurchases);
};

// Função para calcular o preço do item de endgame
export const getEndgamePrice = () => {
  return 0; // Alterado para 0, já que só precisamos ter todos os upgrades
};

// Função para calcular o poder do Auto Clicker para o nível atual
export const getAutoClickPower = (autoClickerPurchases) => {
  if (autoClickerPurchases === 0) return 0;
  // 2^(n-1) -> 1, 2, 4, 8, 16, 32, 64, 128, 256, 512
  return Math.pow(2, autoClickerPurchases - 1);
};

// Formata o tempo de cooldown em minutos:segundos
export const formatCooldownTime = (cooldownTimeLeft) => {
  const minutes = Math.floor(cooldownTimeLeft / 60);
  const seconds = cooldownTimeLeft % 60;
  return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
};