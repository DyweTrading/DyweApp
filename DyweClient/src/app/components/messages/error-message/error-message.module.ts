import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ErrorMessageComponent } from './error-message.component';

@NgModule({
  declarations: [ErrorMessageComponent],
  imports: [CommonModule, TranslateModule],
  exports: [ErrorMessageComponent],
  providers: [],
})
export class ErrorMessageModule {}
