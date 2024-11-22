import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MetricBlockMobComponent } from './metric-block-mob.component';

@NgModule({
  declarations: [MetricBlockMobComponent],
  imports: [CommonModule, TranslateModule],
  exports: [MetricBlockMobComponent],
  providers: [],
})
export class MetricBlockMobModule {}
