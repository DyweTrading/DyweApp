import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RangeModule } from 'app/components/position-control/range/range.module';
import { ButtonCustomModule } from '../../buttons/button-custom/button-custom.module';
import { InputModule } from '../../input/input.module';
import { ErrorMessageModule } from '../../messages/error-message/error-message.module';
import { PositionMetricsModule } from '../../position-control/position-metrics/position-metrics.module';
import { TypeBadgeModule } from '../../positions-orders/po-items/type-badge/type-badge.module';
import { EditPosModalComponent } from './edit-pos-modal.component';

@NgModule({
  declarations: [EditPosModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    TypeBadgeModule,
    InputModule,
    ErrorMessageModule,
    RangeModule,
    PositionMetricsModule,
    ButtonCustomModule,
    TranslateModule,
  ],
  exports: [EditPosModalComponent],
  providers: [],
})
export class EditPosModalModule {}
