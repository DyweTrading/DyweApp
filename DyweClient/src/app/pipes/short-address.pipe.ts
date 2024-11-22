import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenAddress',
})
export class ShortenAddressPipe implements PipeTransform {
  transform(address: string | null): string | null {
    if (!address || address.length < 10) {
      return address;
    }
    const start = address.slice(0, 3);
    const end = address.slice(-3);
    return `${start}...${end}`;
  }
}
