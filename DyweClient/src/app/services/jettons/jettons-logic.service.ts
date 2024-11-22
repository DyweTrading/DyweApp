import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TradePair } from 'app/interfaces/trade-pair';

export const cryptoCoins: TradePair[] = [
  {
    tradePairRoute: 'BTC-USDT',
    tradePairName: 'BTCUSDT',
    tradePairIcon: './assets/png/btc-icon.png',
    tradePairVolume: 0,
    tradePairPriceChange: 0,
    tradePairMarketPrice: 0,
  },
  {
    tradePairRoute: 'ETH-USDT',
    tradePairName: 'ETHUSDT',
    tradePairIcon: './assets/png/eth-icon.png',
    tradePairVolume: 0,
    tradePairPriceChange: 0,
    tradePairMarketPrice: 0,
  },
  {
    tradePairRoute: 'TON-USDT',
    tradePairName: 'TONUSDT',
    tradePairIcon:
      'https://s2.coinmarketcap.com/static/img/coins/64x64/11419.png',
    tradePairVolume: 0,
    tradePairPriceChange: 0,
    tradePairMarketPrice: 0,
  },
];

@Injectable({
  providedIn: 'root',
})
export class JettonsLogicService {
  private binanceUrl = 'https://api.binance.com/api/v3';

  constructor(private _http: HttpClient) {}

  public getMetricsLive(currentCoin: string) {
    let symbol_LowerCase = currentCoin.toLowerCase();
    return 'wss://stream.binance.com:9443/ws/' + symbol_LowerCase + '@ticker';
  }

  public getMetricsAll(tradePairs: string[]) {
    const encodedSymbols = encodeURIComponent(JSON.stringify(tradePairs)); // Кодирование списка символов

    return this._http.get(
      `${this.binanceUrl}/ticker/24hr?symbols=${encodedSymbols}`
    );
  }
}
