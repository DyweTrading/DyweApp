import { Component, Input } from '@angular/core';
import { Item } from 'app/interfaces/item';

@Component({
  selector: 'p-history-item',
  templateUrl: './p-history-item.component.html',
  styleUrls: ['./p-history-item.component.scss'],
})
export class PHistoryItemComponent {
  @Input() itemData!: Item;
}
