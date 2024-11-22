import { CommonModule, DecimalPipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PositionMetricsComponent } from './position-metrics.component';

@NgModule({
  declarations: [PositionMetricsComponent],
  imports: [CommonModule, DecimalPipe, TranslateModule],
  exports: [PositionMetricsComponent],
  providers: [],
})
export class PositionMetricsModule {}
