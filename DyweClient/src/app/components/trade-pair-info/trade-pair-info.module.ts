import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchPairModule } from './search-pair/search-pair.module';
import { TradePairInfoComponent } from './trade-pair-info.component';
import { TradePairMetricsModule } from './trade-pair-metrics/trade-pair-metrics.module';

@NgModule({
  declarations: [TradePairInfoComponent],
  imports: [CommonModule, TradePairMetricsModule, SearchPairModule],
  exports: [TradePairInfoComponent],
  providers: [],
})
export class TradePairInfoModule {}
