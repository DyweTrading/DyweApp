import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SwitcherSectionModule } from '../../switcher-section/switcher-section.module';
import { PairItemModule } from './pair-item/pair-item.module';
import { SearchPairComponent } from './search-pair.component';

@NgModule({
  declarations: [SearchPairComponent],
  imports: [
    CommonModule,
    PairItemModule,
    SwitcherSectionModule,
    TranslateModule,
    FormsModule,
  ],
  exports: [SearchPairComponent],
  providers: [],
})
export class SearchPairModule {}
