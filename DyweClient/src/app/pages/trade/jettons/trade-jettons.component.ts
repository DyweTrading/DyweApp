import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TradePair } from 'app/interfaces/trade-pair';
import { cryptoCoins } from 'app/services/jettons/jettons-logic.service';
import { RouteService } from 'app/services/router-service/route.service';

@Component({
  selector: 'trade-jettons',
  templateUrl: './trade-jettons.component.html',
  styleUrls: ['./trade-jettons.component.scss'],
})
export class TradeJettonsComponent implements OnInit {
  public currentTradePair!: TradePair;
  public tradePairList: TradePair[] = cryptoCoins;

  constructor(
    private route: ActivatedRoute,
    private _routeService: RouteService
  ) {}

  ngOnInit(): void {
    this._routeService.setCurrentRoute = 'jettons';

    this.route.paramMap.subscribe((params) => {
      const tradePairRoute = params.get('tradePairRoute');
      console.log(tradePairRoute);

      if (tradePairRoute) {
        this.currentTradePair = this.tradePairList.find(
          (pair) => pair.tradePairRoute === tradePairRoute
        )!;
      }
    });
  }
}
