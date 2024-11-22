import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputModule } from 'app/components/input/input.module';
import { ErrorMessageModule } from 'app/components/messages/error-message/error-message.module';
import { SwitchPriceTypeComponent } from './switch-price-type.component';
@NgModule({
  exports: [SwitchPriceTypeComponent],
  declarations: [SwitchPriceTypeComponent],
  imports: [CommonModule, InputModule, ErrorMessageModule, TranslateModule],
})
export class SwitchPriceTypeModule {}
