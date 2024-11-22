import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PairItemComponent } from './pair-item.component';

@NgModule({
  declarations: [PairItemComponent],
  imports: [CommonModule, RouterModule],
  exports: [PairItemComponent],
  providers: [],
})
export class PairItemModule {}
