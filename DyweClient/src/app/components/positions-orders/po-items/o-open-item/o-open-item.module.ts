import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationModalModule } from 'app/components/modal/confirmation-modal/confirmation-modal.module';
import { EditOrderModalModule } from 'app/components/modal/edit-order-modal/edit-order-modal.module';
import { PoButtonModule } from '../po-button/po-button.module';
import { OOpenMetricModule } from '../po-metrics/o-open-metric/o-open-metric.module';
import { TypeBadgeModule } from '../type-badge/type-badge.module';
import { OOpenItemComponent } from './o-open-item.component';

@NgModule({
  declarations: [OOpenItemComponent],
  imports: [
    CommonModule,
    OOpenMetricModule,
    TypeBadgeModule,
    PoButtonModule,
    ConfirmationModalModule,
    EditOrderModalModule,
  ],
  exports: [OOpenItemComponent],
  providers: [],
})
export class OOpenItemModule {}
