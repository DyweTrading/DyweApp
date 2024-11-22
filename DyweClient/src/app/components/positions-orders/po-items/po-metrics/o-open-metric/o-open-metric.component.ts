import { Component, Input } from '@angular/core';
import { Position } from 'app/interfaces/position';

@Component({
  selector: 'o-open-metric',
  templateUrl: './o-open-metric.component.html',
  styleUrls: ['./o-open-metric.component.scss'],
})
export class OOpenMetricComponent {
  @Input() positionData!: Position;
}
