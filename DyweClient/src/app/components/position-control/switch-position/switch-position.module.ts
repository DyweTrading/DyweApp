import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SwitchPositionComponent } from './switch-position.component';
@NgModule({
  exports: [SwitchPositionComponent],
  declarations: [SwitchPositionComponent],
  imports: [CommonModule, TranslateModule],
})
export class SwitchPositionModule {}
