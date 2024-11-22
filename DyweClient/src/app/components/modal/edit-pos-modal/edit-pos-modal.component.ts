import { Component, Input } from '@angular/core';
import { Position } from 'app/interfaces/position';
import { ModalService } from 'app/services/show-modal/modal.service';
import { UtilsService } from 'app/utils/utils.service';
import currency from 'currency.js';

@Component({
  selector: 'edit-pos-modal',
  templateUrl: './edit-pos-modal.component.html',
  styleUrls: ['./edit-pos-modal.component.scss'],
})
export class EditPosModalComponent {
  @Input() newPosition!: Position;
  constructor(private _utils: UtilsService, private _modal: ModalService) {}
  // public editPositionModal: ElementRef<HTMLDialogElement> | null = null;

  public isTPSL: boolean = true;

  public positionErrorsState = {
    minimalAvailablePrice: false,
    minimalAvailableBalance: false,
    minimalAvailableLeverage: false,
    takeProfitMore: false,
    takeProfitLess: false,
    minimalAvailableTakeProfit: false,
    stopLossMore: false,
    stopLossLess: false,
    minimalAvailableStopLoss: false,
  };

  public closeModal() {
    this._modal.closeModal();
  }

  // Функция отвечает за обновление процента тейк профита
  public onTakeProfitPercentChange(newTakeProfit: number) {
    this.newPosition.TakeProfitPercent = currency(newTakeProfit, {
      precision: 2,
    }).value;

    this.calculateTakeProfitPercent();

    return this.newPosition.TakeProfitPercent;
  }

  // Функция отвечает за обновление процента стоп лосса
  public onStopLossPercentChange(newStopLossPercent: number) {
    this.newPosition.StopLossPercent = currency(newStopLossPercent, {
      precision: 2,
    }).value;

    this.calculateStopLossPercent();

    return this.newPosition.StopLossPercent;
  }

  // Функция отвечает за обновление процента + цены тейк профита через рендж
  public calculateTakeProfitPercent() {
    const { errors } = this._utils.calculateTakeProfitPercent(
      this.newPosition,
      this.newPosition.TakeProfitPercent || 0
    );

    this.positionErrorsState.takeProfitMore = errors.takeProfitMore;
    this.positionErrorsState.takeProfitLess = errors.takeProfitLess;
    this.positionErrorsState.minimalAvailableTakeProfit =
      errors.minimalAvailableTakeProfit;

    return this.newPosition.TakeProfitPercent;
  }

  // Функция отвечает за обновление процента + цены стоп лосса через рендж
  public calculateStopLossPercent() {
    const { errorsStopLoss } = this._utils.calculateStopLossPercent(
      this.newPosition,
      this.newPosition.StopLossPercent || 0
    );

    this.positionErrorsState.stopLossMore = errorsStopLoss.stopLossMore;
    this.positionErrorsState.stopLossLess = errorsStopLoss.stopLossLess;
    this.positionErrorsState.minimalAvailableStopLoss =
      errorsStopLoss.minimalAvailableStopLoss;

    return this.newPosition.StopLossPercent;
  }

  // Функция отвечает за обновление процентного эквивалента + цены тейк профита через инпут
  public calculateTakeProfitPrice(newTakeProfitPrice: number) {
    const { errors } = this._utils.calculateTakeProfitPrice(
      this.newPosition,
      newTakeProfitPrice
    );

    this.positionErrorsState.takeProfitMore = errors.takeProfitMore;
    this.positionErrorsState.takeProfitLess = errors.takeProfitLess;
    this.positionErrorsState.minimalAvailableTakeProfit =
      errors.minimalAvailableTakeProfit;

    return this.newPosition.TakeProfit;
  }

  // Функция отвечает за обновление процентного эквивалента + цены стоп лосса через инпут
  public calculateStopLossPrice(newStopLossPrice: number) {
    const { errorsStopLoss } = this._utils.calculateStopLossPrice(
      this.newPosition,
      newStopLossPrice
    );

    this.positionErrorsState.stopLossMore = errorsStopLoss.stopLossMore;
    this.positionErrorsState.stopLossLess = errorsStopLoss.stopLossLess;
    this.positionErrorsState.minimalAvailableStopLoss =
      errorsStopLoss.minimalAvailableStopLoss;

    return this.newPosition.StopLoss;
  }

  public savePosition() {
    console.log('Position saved successfully', this.newPosition);
    this._modal.closeModal();
  }
}
