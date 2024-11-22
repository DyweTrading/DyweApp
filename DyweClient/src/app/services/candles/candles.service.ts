import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Candle } from 'app/interfaces/candle';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CandlesService {
  private baseUrl = 'https://app.dywetrading.com'; // Тут будет ссылка на серверную часть
  private binanceUrl = 'https://api.binance.com/api/v3';
  constructor(private _http: HttpClient) {}

  public getDataHistory(
    pathRoute: string,
    paidId: string,
    tameframe: string
  ): Observable<[] | Candle[]> {
    switch (pathRoute) {
      case 'jettons':
        return this.getCoinCandlesHistory(paidId, tameframe);

      case 'nft':
        return this.getNFTCandlesHistory(paidId, tameframe);

      default:
        return new Observable<[] | Candle[]>((observer) => observer.next([]));
    }
  }

  // Функция для получения истории свечей
  private getNFTCandlesHistory(
    collectionAddr: string, // Адресс коллекции
    timeframe: string
  ): Observable<Candle[]> {
    return this._http.get<Candle[]>(
      `${this.baseUrl}/dyweapi/v1/getHistory/${collectionAddr}/${timeframe}`
    );
  }

  private getCoinCandlesHistory(
    coinSymbol: string,
    timeframe: string
  ): Observable<[]> {
    return this._http.get<[]>(
      `${this.binanceUrl}/klines?symbol=${coinSymbol}&interval=${timeframe}&limit=1000`
    );
  }

  public getCandles(
    collectionAddr: string, // Адресс коллекции
    timeframe: string
  ): Observable<Candle> {
    return this._http.get<Candle>(
      `${this.baseUrl}/dyweapi/v1/getData/${collectionAddr}/${timeframe}`
    );
  }

  public GetLiveCandle(currentCoin: string, currentTimeFrame: string) {
    let symbol_LowerCase = currentCoin.toLowerCase();
    return (
      'wss://stream.binance.com:9443/ws/' +
      symbol_LowerCase +
      '@kline_' +
      currentTimeFrame
    );
  }
}
