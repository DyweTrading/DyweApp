import { Component, Input } from '@angular/core';
import { ConfirmationModalComponent } from 'app/components/modal/confirmation-modal/confirmation-modal.component';
import { EditOrderModalComponent } from 'app/components/modal/edit-order-modal/edit-order-modal.component';
import { Item } from 'app/interfaces/item';
import { ModalService } from 'app/services/show-modal/modal.service';
import currency from 'currency.js';

@Component({
  selector: 'o-open-item',
  templateUrl: './o-open-item.component.html',
  styleUrls: ['./o-open-item.component.scss'],
})
export class OOpenItemComponent {
  @Input() itemData!: Item;
  constructor(private _modal: ModalService) {}

  public openModal() {
    this._modal.openModal(EditOrderModalComponent, {
      newPosition: {
        PositionType: 'Long',
        PriceType: 'Market',
        EntryPrice: currency(9.96).value,
        Margin: currency(0).value,
        Amount: currency(0).value,
        Leverage: 10,
        PositionSize: currency(0).value,
        TakeProfit: currency(9.97).value,
        StopLoss: currency(9.95).value,
        TakeProfitPercent: currency(0).value,
        StopLossPercent: currency(0).value,
        TakeProfitAmount: currency(0).value,
        StopLossAmount: currency(0).value,
        Liquidation: currency(0).value,
        Commission: currency(0.002, { precision: 4 }).value,
        Fees: currency(0).value,
      },
    });
  }

  public openConfirmModal() {
    this._modal.openModal(ConfirmationModalComponent, {
      confirmText: 'MODALS.ConfCloseOrder',
      subConfirmText: 'MODALS.ConfCloseOrderSub',
    });
  }
}
