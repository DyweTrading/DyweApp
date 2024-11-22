import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PHistoryMetricModule } from '../po-metrics/p-history-metric/p-history-metric.module';
import { TypeBadgeModule } from '../type-badge/type-badge.module';
import { PHistoryItemComponent } from './p-history-item.component';

@NgModule({
  declarations: [PHistoryItemComponent],
  imports: [CommonModule, TypeBadgeModule, PHistoryMetricModule],
  exports: [PHistoryItemComponent],
  providers: [],
})
export class PHistoryItemModule {}
