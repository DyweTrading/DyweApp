import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonConnectComponent } from './button-connect.component';

@NgModule({
  declarations: [ButtonConnectComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ButtonConnectComponent],
})
export class ButtonConnectModule {}
