import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MetricBlockMobModule } from 'app/components/metric-blocks/metric-block-mob/metric-block-mob.module';
import { MetricBlockModule } from 'app/components/metric-blocks/metric-block/metric-block.module';
import { PHistoryMetricComponent } from './p-history-metric.component';

@NgModule({
  declarations: [PHistoryMetricComponent],
  imports: [
    CommonModule,
    MetricBlockModule,
    MetricBlockMobModule,
    TranslateModule,
  ],
  exports: [PHistoryMetricComponent],
  providers: [],
})
export class PHistoryMetricModule {}
