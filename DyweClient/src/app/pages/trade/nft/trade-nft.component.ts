import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TradePair } from 'app/interfaces/trade-pair';
import { nftPairs } from 'app/services/nft/nft-logic.service';
import { RouteService } from 'app/services/router-service/route.service';

@Component({
  selector: 'trade-nft',
  templateUrl: './trade-nft.component.html',
  styleUrls: ['./trade-nft.component.scss'],
})
export class TradeNFTComponent {
  public currentTradePair!: TradePair;
  public tradePairList: TradePair[] = nftPairs;

  constructor(
    private route: ActivatedRoute,
    private _routeService: RouteService
  ) {}

  ngOnInit(): void {
    this._routeService.setCurrentRoute = 'nft';

    this.route.paramMap.subscribe((params) => {
      const tradePairRoute = params.get('tradePairRoute');
      if (tradePairRoute) {
        this.currentTradePair = this.tradePairList.find(
          (pair) => pair.tradePairRoute === tradePairRoute
        )!;
      }
    });
  }
}
