import { Component, Input } from '@angular/core';
import { Item } from 'app/interfaces/item';

@Component({
  selector: 'o-history-item',
  templateUrl: './o-history-item.component.html',
  styleUrls: ['./o-history-item.component.scss'],
})
export class OHistoryItemComponent {
  @Input() itemData!: Item;
}
