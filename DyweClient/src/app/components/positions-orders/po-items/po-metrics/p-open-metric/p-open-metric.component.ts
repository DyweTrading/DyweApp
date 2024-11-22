import { Component, Input } from '@angular/core';
import { Position } from 'app/interfaces/position';

@Component({
  selector: 'p-open-metrics',
  templateUrl: './p-open-metric.component.html',
  styleUrls: ['./p-open-metric.component.scss'],
})
export class POpenMetricsComponent {
  @Input() positionData!: Position;
}
