import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { InputComponent } from './input.component';

@NgModule({
  exports: [InputComponent],
  declarations: [InputComponent],
  imports: [CommonModule, TranslateModule],
})
export class InputModule {}
