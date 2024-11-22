import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TradePairMetrics } from 'app/interfaces/trade-pair';

@Component({
  selector: 'trade-pair-metrics',
  templateUrl: './trade-pair-metrics.component.html',
  styleUrls: ['./trade-pair-metrics.component.scss'],
})
export class TradePairMetricsComponent implements OnChanges {
  @Input() metrics!: TradePairMetrics;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['metrics'] && !changes['metrics'].firstChange) {
      this.metrics = {
        marketPrice: parseFloat(this.metrics.marketPrice).toFixed(2),
        pricaChange: parseFloat(this.metrics.pricaChange).toFixed(2),
        volume: parseFloat(this.metrics.volume).toFixed(2),
        maxPrice: parseFloat(this.metrics.maxPrice).toFixed(2),
        minPrice: parseFloat(this.metrics.minPrice).toFixed(2),
        fundingRes: parseFloat(this.metrics.fundingRes).toFixed(2),
        nextFundingTime: parseFloat(this.metrics.nextFundingTime).toFixed(2),
        openInteresL: parseFloat(this.metrics.openInteresL).toFixed(2),
        openInteresS: parseFloat(this.metrics.openInteresS).toFixed(2),
      };
    }
  }
}
