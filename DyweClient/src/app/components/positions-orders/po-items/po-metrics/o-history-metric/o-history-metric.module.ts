import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MetricBlockMobModule } from 'app/components/metric-blocks/metric-block-mob/metric-block-mob.module';
import { MetricBlockModule } from 'app/components/metric-blocks/metric-block/metric-block.module';
import { OHistoryMetricComponent } from './o-history-metric.component';

@NgModule({
  declarations: [OHistoryMetricComponent],
  imports: [
    CommonModule,
    MetricBlockModule,
    MetricBlockMobModule,
    TranslateModule,
  ],
  exports: [OHistoryMetricComponent],
  providers: [],
})
export class OHistoryMetricModule {}
