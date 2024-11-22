import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ShortenAddressPipe } from './short-address.pipe';

@NgModule({
  declarations: [ShortenAddressPipe],
  imports: [CommonModule],
  exports: [ShortenAddressPipe],
  providers: [],
})
export class ShortenAddressModule {}
