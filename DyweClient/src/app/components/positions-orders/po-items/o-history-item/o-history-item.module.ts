import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OHistoryMetricModule } from '../po-metrics/o-history-metric/o-history-metric.module';
import { TypeBadgeModule } from '../type-badge/type-badge.module';
import { OHistoryItemComponent } from './o-history-item.component';

@NgModule({
  declarations: [OHistoryItemComponent],
  imports: [CommonModule, TypeBadgeModule, OHistoryMetricModule],
  exports: [OHistoryItemComponent],
  providers: [],
})
export class OHistoryItemModule {}
