import { Component, Input } from '@angular/core';

@Component({
  selector: 'position-metrics',
  templateUrl: './position-metrics.component.html',
  styleUrls: ['./position-metrics.component.scss'],
})
export class PositionMetricsComponent {
  @Input() positionSize: number = 0;
  @Input() entryPrice: number = 0;
  @Input() liquidationPrice: number = 0;
  @Input() priceImpact: number = 0;
  @Input() approximatePriceTP: number = 0;
  @Input() approximatePriceSL: number = 0;
  @Input() fees: number = 0;
}
