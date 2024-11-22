import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ShortenAddressModule } from 'app/pipes/short-address.module';
import { LanguageService } from 'app/services/language/language.service';
import { ButtonConnectModule } from '../buttons/button-connect/button-connect.module';
import { ButtonWModule } from '../buttons/button-w/button-w.module';
import { HeaderComponent } from './header.component';

@NgModule({
  declarations: [HeaderComponent],
  imports: [
    CommonModule,
    ButtonConnectModule,
    ShortenAddressModule,
    TranslateModule,
    ButtonWModule,
    RouterLink,
    RouterLinkActive,
  ],
  exports: [HeaderComponent],
  providers: [LanguageService],
})
export class HeaderModule {}
