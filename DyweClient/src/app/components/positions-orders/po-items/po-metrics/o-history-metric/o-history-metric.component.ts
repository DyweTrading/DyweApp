import { Component, Input } from '@angular/core';
import { Position } from 'app/interfaces/position';

@Component({
  selector: 'o-history-metric',
  templateUrl: './o-history-metric.component.html',
  styleUrls: ['./o-history-metric.component.scss'],
})
export class OHistoryMetricComponent {
  @Input() positionData!: Position;
}
