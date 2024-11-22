import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { TradePair } from 'app/interfaces/trade-pair';
import { FavoriteService } from 'app/services/favorite/favorite.service';
import { JettonsLogicService } from 'app/services/jettons/jettons-logic.service';
import { RouteService } from 'app/services/router-service/route.service';
import { VisibilityService } from 'app/utils/click-outside.service';

@Component({
  selector: 'search-pair',
  templateUrl: './search-pair.component.html',
  styleUrls: ['./search-pair.component.scss'],
})
export class SearchPairComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() tradePairList: TradePair[] = [];
  @Input() pairSelectEl: HTMLDivElement | null = null;
  @Input() pairSelectMenu: HTMLDivElement | null = null;

  private intervalId: any;
  private currentTradeRoute: string = '';
  public symbols: string[] = [];
  public metrics: any = [];
  public activeSection: string = 'all';
  public currencyType: string = 'ton';
  public searchTerm: string = '';

  public sections: { id: string; name: string }[] = [
    {
      id: 'favorites',
      name: 'SEARCH-PAIR.Favorites',
    },
    {
      id: 'all',
      name: 'SEARCH-PAIR.All',
    },
  ];

  constructor(
    public _visibilityService: VisibilityService,
    private _jettonsService: JettonsLogicService,
    private _routeService: RouteService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.currentTradeRoute = this._routeService.getCurrentRoute;
  }

  ngAfterViewInit(): void {
    this.symbols = this.tradePairList.map(
      (tradePair) => tradePair.tradePairName
    );
    if (this.currentTradeRoute === 'jettons') {
      this.intervalId = setInterval(() => this.fetchMetrics(), 2000);
    } else if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  // Скрытие меню при выборе элемента
  public toggleSelectTradePair() {
    if (this.pairSelectEl && this.pairSelectMenu) {
      this._visibilityService.manageVisibility(
        this.pairSelectEl,
        this.pairSelectMenu,
        true
      );
    }
  }

  public setMetrics() {
    for (let i = 0; i < this.tradePairList.length; i++) {
      this.tradePairList[i].tradePairMarketPrice = Number(
        parseFloat(this.metrics[i].lastPrice).toFixed(2)
      );
      this.tradePairList[i].tradePairPriceChange = Number(
        parseFloat(this.metrics[i].priceChangePercent).toFixed(2)
      );
      this.tradePairList[i].tradePairVolume = Number(
        parseFloat('0').toFixed(2)
      );
    }
  }

  public fetchMetrics() {
    // Фетчим метрики
    this._jettonsService.getMetricsAll(this.symbols).subscribe((ms) => {
      this.metrics = ms;
      this.setMetrics();
    });
  }

  public toggleSection(section: string) {
    // Меняем секцию
    this.activeSection = section;
  }

  public toggleCurrencyType(currency: string) {
    // Переключаем тип валюты
    this.currencyType = currency;
  }

  get filteredTradePairList() {
    // Получаем отфильтрованный массив
    const filteredList = this.tradePairList.filter((pair) =>
      pair.tradePairName.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    if (this.activeSection === 'favorites') {
      const favoritePairs = this.favoriteService.getFavoriteTradePairs();
      return filteredList.filter((pair) =>
        favoritePairs.includes(pair.tradePairName)
      );
    }

    return filteredList;
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
