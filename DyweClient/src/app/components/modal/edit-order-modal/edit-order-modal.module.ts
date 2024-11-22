import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonPartModule } from 'app/components/buttons/button-part/button-part.module';
import { RangeModule } from 'app/components/position-control/range/range.module';
import { SwitchPositionModule } from 'app/components/position-control/switch-position/switch-position.module';
import { SwitchPriceTypeModule } from 'app/components/position-control/switch-price-type/switch-price-type.module';
import { ButtonCustomModule } from '../../buttons/button-custom/button-custom.module';
import { InputModule } from '../../input/input.module';
import { ErrorMessageModule } from '../../messages/error-message/error-message.module';
import { PositionMetricsModule } from '../../position-control/position-metrics/position-metrics.module';
import { TypeBadgeModule } from '../../positions-orders/po-items/type-badge/type-badge.module';
import { EditOrderModalComponent } from './edit-order-modal.component';

@NgModule({
  declarations: [EditOrderModalComponent],
  imports: [
    CommonModule,
    FormsModule,
    TypeBadgeModule,
    InputModule,
    ErrorMessageModule,
    RangeModule,
    PositionMetricsModule,
    ButtonCustomModule,
    SwitchPositionModule,
    SwitchPriceTypeModule,
    ButtonPartModule,
    ButtonCustomModule,
    TranslateModule,
  ],
  exports: [EditOrderModalComponent],
  providers: [],
})
export class EditOrderModalModule {}
