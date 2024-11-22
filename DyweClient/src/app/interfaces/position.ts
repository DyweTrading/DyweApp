import { Metrics } from './metrics';

// Интерфейс позиции
export interface Position extends Metrics {
  PositionType: string; // Тип позиции
  PriceType: string; // Тип цены
  Commission: number; // Комиссии за открытие\закрытие позиции
  Fees: number; // Расчитаная комиссия при открытии позиции
}
