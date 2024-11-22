import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TypeBadgeComponent } from './type-badge.component';

@NgModule({
  declarations: [TypeBadgeComponent],
  imports: [CommonModule, TranslateModule],
  exports: [TypeBadgeComponent],
  providers: [],
})
export class TypeBadgeModule {}
