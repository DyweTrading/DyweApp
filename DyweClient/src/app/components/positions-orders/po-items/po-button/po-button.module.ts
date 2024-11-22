import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PoButtonComponent } from './po-button.component';

@NgModule({
  declarations: [PoButtonComponent],
  imports: [CommonModule, TranslateModule],
  exports: [PoButtonComponent],
  providers: [],
})
export class PoButtonModule {}
