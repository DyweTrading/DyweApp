import { Component, Input } from '@angular/core';

@Component({
  selector: 'metric-block-mob',
  templateUrl: './metric-block-mob.component.html',
  styleUrls: ['./metric-block-mob.component.scss'],
})
export class MetricBlockMobComponent {
  @Input() title!: string;
  @Input() value?: string;
  @Input() percentage?: string;
  @Input() colorClass: string = '';
}
