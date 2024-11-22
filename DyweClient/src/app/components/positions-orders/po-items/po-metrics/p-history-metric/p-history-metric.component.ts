import { Component, Input } from '@angular/core';
import { Position } from 'app/interfaces/position';

@Component({
  selector: 'p-history-metric',
  templateUrl: './p-history-metric.component.html',
  styleUrls: ['./p-history-metric.component.scss'],
})
export class PHistoryMetricComponent {
  @Input() positionData!: Position;
}
