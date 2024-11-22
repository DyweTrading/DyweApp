import { Component, Input } from '@angular/core';

@Component({
  selector: 'metric-block',
  templateUrl: './metric-block.component.html',
  styleUrls: ['./metric-block.component.scss'],
})
export class MetricBlockComponent {
  @Input() isMinMaxSplit: boolean = false;
  @Input() title!: string;
  @Input() value?: string;
  @Input() percentage?: string;
  @Input() colorClass: string = '';
  @Input() valueMax?: string;
  @Input() valueMin?: string;
}
