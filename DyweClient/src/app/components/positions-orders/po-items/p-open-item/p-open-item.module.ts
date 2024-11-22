import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationModalModule } from 'app/components/modal/confirmation-modal/confirmation-modal.module';
import { EditPosModalModule } from 'app/components/modal/edit-pos-modal/edit-pos-modal.module';
import { PoButtonModule } from '../po-button/po-button.module';
import { POpenMetricModule } from '../po-metrics/p-open-metric/p-open-metric.module';
import { TypeBadgeModule } from '../type-badge/type-badge.module';
import { PoItemComponent } from './p-open-item.component';

@NgModule({
  declarations: [PoItemComponent],
  imports: [
    CommonModule,
    TypeBadgeModule,
    POpenMetricModule,
    PoButtonModule,
    ConfirmationModalModule,
    EditPosModalModule,
  ],
  exports: [PoItemComponent],
  providers: [],
})
export class POpenItemModule {}
