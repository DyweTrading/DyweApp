import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MetricBlockMobModule } from '../../../../metric-blocks/metric-block-mob/metric-block-mob.module';
import { MetricBlockModule } from '../../../../metric-blocks/metric-block/metric-block.module';
import { POpenMetricsComponent } from './p-open-metric.component';

@NgModule({
  declarations: [POpenMetricsComponent],
  imports: [
    CommonModule,
    MetricBlockModule,
    MetricBlockMobModule,
    TranslateModule,
  ],
  exports: [POpenMetricsComponent],
  providers: [],
})
export class POpenMetricModule {}
