import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ShortenAddressModule } from 'app/pipes/short-address.module';
import { ShowMiniModalService } from 'app/services/show-mini-modal/show-mini-modal.service';
import { ButtonWComponent } from './button-w.component';

@NgModule({
  declarations: [ButtonWComponent],
  imports: [CommonModule, ShortenAddressModule, TranslateModule],
  exports: [ButtonWComponent],
  providers: [ShowMiniModalService],
})
export class ButtonWModule {}
