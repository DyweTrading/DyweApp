import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Position } from 'app/interfaces/position';
import { WalletSService } from 'app/services/walletService/wallet-s.service';
import { UtilsService } from 'app/utils/utils.service';
import currency from 'currency.js';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { fromNano } from 'ton-core';
import { ConnectedWallet } from 'tonconnect-ui-angular-fork';
@Component({
  selector: 'position-control',
  templateUrl: './position-control.component.html',
  styleUrls: ['./position-control.component.scss'],
})
export class PositionControlComponent implements OnInit, OnDestroy {
  constructor(
    private _walletService: WalletSService,
    private cdr: ChangeDetectorRef,
    private _utils: UtilsService
  ) {}

  private destroy$ = new Subject<void>();
  private balanceSubscription!: Subscription;
  public wallet?: ConnectedWallet | null = null;
  public isTPSL: boolean = false;
  public activeMarginButton: number | null = null;
  public activeLeverageButton: number | null = currency(10).value;
  public balance: any = currency(1).value;
  public minMargin: number = 0.1; // Определяется минимальная маржа для открытия позиции
  public minLeverage: number = 1; // Определяется минимальное плечо
  public maxLeverage: number = 50; // Определяется максимальное плечо
  public commission = currency(0.002).value; // Определяется комиссия в десятичном виде

  // Состояния ошибок
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

  // Создание новой позиции. В EntryPrice Будет передавать цена актив
  public newPosition: Position = {
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
  };

  ngOnInit(): void {
    this.balanceSubscription = this._walletService.balance$.subscribe(
      (balance) => {
        if (Number(fromNano(balance || 1)) < 0.001) {
          this.balance = 0;
        } else {
          this.balance = fromNano(balance || 1) || 1;
        }
      }
    );

    this._walletService.wallet$
      .pipe(takeUntil(this.destroy$))
      .subscribe((wallet) => {
        this.wallet = wallet;
        this.cdr.markForCheck();
      });

    this._walletService.initWallet();
  }

  // Функиця отвечающая за вызов перерасчётов
  private calculateRelatedValues() {
    this._utils.calculatePositionSize(this.newPosition);
    this.liquidationPrice();
    this.onAmountChange();
    this.calculateTakeProfitPercent();
    this.calculateStopLossPercent();
  }

  // Функция отвечает за обновление состояние ошибки minimalAvailablePrice
  public onMinimalAvailablePriceChange(condition: boolean) {
    this.positionErrorsState.minimalAvailablePrice = condition;
    return condition;
  }

  // Функция отвечает за обновление типа позиции
  public onPositionTypeChange(newPositionType: string) {
    this.newPosition.PositionType = newPositionType;
    this.calculateRelatedValues();

    return this.newPosition.PositionType;
  }

  // Функция отвечает за обновление типа цены позиции
  public onPriceTypeChange(newPriceType: string) {
    this.newPosition.PriceType = newPriceType;
    return this.newPosition.PriceType;
  }

  // Функция отвечает за обновление объёма позиции в токенах
  public onAmountChange() {
    return (this.newPosition.Amount = currency(this.newPosition.Margin, {
      precision: 4,
    }).divide(this.newPosition.EntryPrice).value);
  }

  // Функция отвечает за обновление цены входа
  public onEntryPriceChange(newEntryPrice: number) {
    this.newPosition.EntryPrice = currency(newEntryPrice, {
      precision: 4,
    }).value;

    this.calculateRelatedValues();

    return this.newPosition.EntryPrice;
  }

  // Функция отвечает за обновление маржи
  public onPositionMarginChange(newPositionMargin: number) {
    const max: number = this.balance;
    const min: number = this.minMargin;
    const newMargin = currency(newPositionMargin, { precision: 4 }).value;

    if (newMargin > max) {
      this.newPosition.Margin = max;
      this.activeMarginButton = max;
      this.positionErrorsState.minimalAvailableBalance = false;
    } else if (newMargin < min) {
      this.positionErrorsState.minimalAvailableBalance = true;
      this.newPosition.Margin = newMargin;
    } else {
      this.positionErrorsState.minimalAvailableBalance = false;
      this.newPosition.Margin = newMargin;
      this.activeMarginButton = currency((newMargin / this.balance) * 100, {
        precision: 2,
      }).value;
    }

    this.calculateRelatedValues();
    this.calculatePositionFees();

    return this.newPosition.Margin;
  }

  // Функция отвечает за обновление маржи через кнопки контроля
  public onPositionMarginPercentChange(newPositionMargin: number) {
    const newMargin = currency(newPositionMargin).value;
    this.activeMarginButton = newMargin;
    this.newPosition.Margin = currency((newMargin / 100) * this.balance, {
      precision: 4,
    }).value;

    this.calculateRelatedValues();
    this.calculatePositionFees();

    return this.newPosition.Margin;
  }

  // Функция отвечает за обновление плеча через инпута + кнопки контроля
  public onLeverageChange(newLeverage: number) {
    const max = this.maxLeverage;

    if (newLeverage > max) {
      this.newPosition.Leverage = max;
      this.positionErrorsState.minimalAvailableLeverage = false;
    } else if (newLeverage < this.minLeverage) {
      this.positionErrorsState.minimalAvailableLeverage = true;
    } else {
      this.positionErrorsState.minimalAvailableLeverage = false;
      this.newPosition.Leverage = currency(newLeverage, { precision: 1 }).value;
      this.activeLeverageButton = currency(newLeverage, { precision: 1 }).value;
    }

    this.calculateRelatedValues();
    this.calculatePositionFees();

    return this.newPosition.Leverage;
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

  // Функция отвечает за обновление цены ликвидации
  public liquidationPrice() {
    return this._utils.calculateLiquidationPrice(this.newPosition);
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

  // Функция отвечает за расчет комиссии
  public calculatePositionFees(): number {
    return this._utils.calculatePositionFees(this.newPosition);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.balanceSubscription.unsubscribe();
  }
}
