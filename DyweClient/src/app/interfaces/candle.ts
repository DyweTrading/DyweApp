export interface Candle {
  openTime?: number;
  time: number;
  closeTime?: number;
  percentChange?: number;
  price?: number;
  open: number;
  high: number;
  low: number;
  close: number | null;
}
