import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TradePair } from 'app/interfaces/trade-pair';
import { FavoriteService } from 'app/services/favorite/favorite.service';
import { RouteService } from 'app/services/router-service/route.service';
import { VisibilityService } from 'app/utils/click-outside.service';

@Component({
  selector: 'pair-item',
  templateUrl: './pair-item.component.html',
  styleUrls: ['./pair-item.component.scss'],
})
export class PairItemComponent implements OnInit {
  @Input() tradePairData!: TradePair;
  @Input() currencyType: string = '';
  @Input() pairSelectEl: HTMLDivElement | null = null;
  @Input() pairSelectMenu: HTMLDivElement | null = null;
  public tradePath: string = '';
  public favoriteTradePairs: TradePair[] = [];

  constructor(
    private router: Router,
    private _visibilityService: VisibilityService,
    private _routeService: RouteService,
    private _favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.tradePath = this._routeService.getCurrentRoute;
  }

  public toggleSelectTradePair() {
    // Переключаем торговую пару
    if (this.pairSelectEl && this.pairSelectMenu) {
      this._visibilityService.manageVisibility(
        this.pairSelectEl,
        this.pairSelectMenu,
        true
      );
    }
  }

  public navigateToTradePair(tradePairRoute: string | undefined): void {
    // Навигация на нужную торговую пару
    if (tradePairRoute) {
      this.router.navigate(['/trade', this.tradePath, tradePairRoute]);
      this.toggleSelectTradePair();
    }
  }

  public addToFavorite(event: MouseEvent): void {
    // Добавляем торговую пару в избранное
    event.stopPropagation(); // Останавливаем всплытие события
    this._favoriteService.setFavoriteTradePair(
      this.tradePairData?.tradePairName
    );
    return;
  }

  public isFavorite(): boolean {
    // Проверяем является ли торговая пара избранной
    return this.tradePairData
      ? this._favoriteService.isFavorite(this.tradePairData.tradePairName)
      : false;
  }
}
