import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LanguageService } from 'app/services/language/language.service';
import { NavMobileComponent } from './nav-mobile.component';

@NgModule({
  exports: [NavMobileComponent],
  declarations: [NavMobileComponent],
  imports: [CommonModule, TranslateModule],
  providers: [LanguageService],
})
export class NavMobileModule {}
