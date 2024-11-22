import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MetricBlockComponent } from './metric-block.component';

@NgModule({
  declarations: [MetricBlockComponent],
  imports: [CommonModule, TranslateModule],
  exports: [MetricBlockComponent],
  providers: [],
})
export class MetricBlockModule {}
