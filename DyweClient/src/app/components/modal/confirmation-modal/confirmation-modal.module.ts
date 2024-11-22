import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonCustomModule } from 'app/components/buttons/button-custom/button-custom.module';
import { RangeModule } from '../../position-control/range/range.module';
import { ConfirmationModalComponent } from './confirmation-modal.component';

@NgModule({
  declarations: [ConfirmationModalComponent],
  imports: [CommonModule, RangeModule, ButtonCustomModule, TranslateModule],
  exports: [ConfirmationModalComponent],
})
export class ConfirmationModalModule {}
