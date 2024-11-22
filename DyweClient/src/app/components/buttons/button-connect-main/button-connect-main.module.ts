import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonConnectMainComponent } from './button-connect-main.component';

@NgModule({
  declarations: [ButtonConnectMainComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ButtonConnectMainComponent],
})
export class ButtonConnectMainModule {}
