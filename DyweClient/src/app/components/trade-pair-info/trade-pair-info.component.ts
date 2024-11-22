import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { TradePair, TradePairMetrics } from 'app/interfaces/trade-pair';
import { FavoriteService } from 'app/services/favorite/favorite.service';
import { JettonsLogicService } from 'app/services/jettons/jettons-logic.service';
import { VisibilityService } from 'app/utils/click-outside.service';

@Component({
  selector: 'trade-pair-info',
  templateUrl: './trade-pair-info.component.html',
  styleUrls: ['./trade-pair-info.component.scss'],
})
export class TradePairInfoComponent implements OnInit, OnChanges, OnDestroy {
  @Input() tradePairCurrent!: TradePair; // Получаем текущую торговую пару
  @Input() tradePairList: TradePair[] = []; // Получаем список торговых пар
  @Input() isSelectMedia: boolean = true; // Указывает на то, есть ли медиа у панели ( ссылки на тг и прочее )
  @ViewChild('pairSelectEl') pairSelectEl: ElementRef | null = null; // Получаем элемент выбранной пары
  @ViewChild('pairSelectMenu') pairSelectMenu: ElementRef | null = null; // Получаем элемент меню

  private conn: WebSocket | undefined; // Для веб-сокета

  public tradePairMetrics: TradePairMetrics = {
    // Метрики Торговой пары
    marketPrice: 0,
    pricaChange: 0,
    volume: 0,
    maxPrice: 0,
    minPrice: 0,
    fundingRes: 0,
    nextFundingTime: 0,
    openInteresL: 0,
    openInteresS: 0,
  };

  constructor(
    public _visibilityService: VisibilityService,
    private _jettonsMetrics: JettonsLogicService,
    private _favoriteService: FavoriteService
  ) {}

  ngOnInit(): void {
    this.initializeWebSocket(this.tradePairCurrent?.tradePairName); // Устанавливаем подключение
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Отслеживаем изменения текущей торговой пары
    if (
      changes['tradePairCurrent'] &&
      !changes['tradePairCurrent'].firstChange
    ) {
      this.tradePairMetrics = {
        marketPrice: 0,
        pricaChange: 0,
        volume: 0,
        maxPrice: 0,
        minPrice: 0,
        fundingRes: 0,
        nextFundingTime: 0,
        openInteresL: 0,
        openInteresS: 0,
      };

      this.initializeWebSocket(this.tradePairCurrent?.tradePairName);
    }
  }

  public addToFavorite(event: MouseEvent): void {
    // Добавляем торговую пару в избранное
    event.stopPropagation(); // Останавливаем всплытие события
    this._favoriteService.setFavoriteTradePair(
      this.tradePairCurrent.tradePairName
    );
    return;
  }

  public isFavorite(): boolean {
    // Проверяем является ли торговая пара избранной
    return this.tradePairCurrent
      ? this._favoriteService.isFavorite(this.tradePairCurrent.tradePairName)
      : false;
  }

  public toggleSelectTradePair() {
    if (this.pairSelectEl && this.pairSelectMenu) {
      this._visibilityService.manageVisibility(
        this.pairSelectEl.nativeElement,
        this.pairSelectMenu.nativeElement,
        true
      );
    }
  }

  private initializeWebSocket(tradePair: string) {
    // Функция подключения для получения метрик ( jettons, но думаю можно будет использовать и для NFT )
    if (this.conn) {
      this.conn.close();
    }
    const wsUrl = this._jettonsMetrics.getMetricsLive(tradePair);
    this.conn = new WebSocket(wsUrl);

    this.conn.onmessage = (event) => {
      const liveData = JSON.parse(event.data);

      const editLiveData = {
        marketPrice: liveData.c,
        pricaChange: liveData.P,
        volume: 0,
        maxPrice: liveData.h,
        minPrice: liveData.l,
        fundingRes: 0,
        nextFundingTime: 0,
        openInteresL: 0,
        openInteresS: 0,
      };

      this.tradePairMetrics = editLiveData;
    };

    this.conn.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.conn.onclose = () => {
      console.log('WebSocket connection closed');
    };
  }

  ngOnDestroy(): void {
    if (this.conn) {
      this.conn.close();
    }
  }
}
