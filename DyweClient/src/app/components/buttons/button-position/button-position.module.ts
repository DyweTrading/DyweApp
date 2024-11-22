import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonPositionComponent } from './button-position.component';

@NgModule({
  declarations: [ButtonPositionComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ButtonPositionComponent],
  providers: [],
})
export class ButtonPositionModule {}
