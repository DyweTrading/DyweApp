import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SwitcherSectionComponent } from './switcher-section.component';

@NgModule({
  declarations: [SwitcherSectionComponent],
  imports: [CommonModule, TranslateModule],
  exports: [SwitcherSectionComponent],
  providers: [],
})
export class SwitcherSectionModule {}
