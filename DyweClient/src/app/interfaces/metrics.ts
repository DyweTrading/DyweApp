export interface Metrics {
  EntryPrice: number; // Текущая цена
  Margin: number; // Маржа
  Amount: number; // Объём монет
  Leverage: number; // Плечо
  PositionSize: number; // Объём позиции
  TakeProfit?: number; // Тейк профит цена
  StopLoss?: number; // Стоп лосс цена
  TakeProfitPercent?: number; // Тейк профит в процентах (1% = 1; 100% = 100)
  StopLossPercent?: number; // Стоп лосс в процентах (1% = 1; 100% = 100)
  TakeProfitAmount?: number; // Профит от сделки
  StopLossAmount?: number; // Потеря от сделки
  Liquidation: number; // Цена ликвидации
}
