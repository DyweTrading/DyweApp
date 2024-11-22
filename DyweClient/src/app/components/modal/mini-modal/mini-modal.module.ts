import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { ShowMiniModalService } from 'app/services/show-mini-modal/show-mini-modal.service';
import { MiniModalComponent } from './mini-modal.component';

@NgModule({
  declarations: [MiniModalComponent],
  exports: [MiniModalComponent],
  imports: [CommonModule, TranslateModule],
  providers: [ShowMiniModalService],
})
export class MiniModalModule {}
