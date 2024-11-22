import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonCustomComponent } from './button-custom.component';

@NgModule({
  declarations: [ButtonCustomComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ButtonCustomComponent],
  providers: [],
})
export class ButtonCustomModule {}
