// Числа экономики одним объектом — подбираем при тестировании (см. CLAUDE.md).
export const ECONOMY = {
  startHp: 100,
  examMistakePenaltyHp: 10,
  healHp: 20,
  healCostCoins: 30,
  examRewardCoins: 60,
  trainingTaskRewardCoins: 15,
  smallOrderRewardCoins: 20,
  // Подсказка на экзамене: цена = examHintPercentOfCoins от текущих монет, округление вверх.
  // Недоступна, если монет меньше examHintMinCoinsToBuy.
  examHintPercentOfCoins: 0.25,
  examHintMinCoinsToBuy: 25,
};
