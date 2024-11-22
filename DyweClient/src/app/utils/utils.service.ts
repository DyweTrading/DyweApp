import { Injectable } from '@angular/core';
import { Position } from 'app/interfaces/position';
import currency from 'currency.js';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor() {}

  // Функиця отвечающая за логику расчета цены Тейк-профита исходя из процентного значения
  public calculateTakeProfitPercent(
    position: Position,
    newTakeProfitPercent: number
  ) {
    const entryPrice = currency(position.EntryPrice, { precision: 4 });
    const takeProfitPercent = newTakeProfitPercent;
    const positionLeverage = currency(position.Leverage || 1, { precision: 4 });
    let profitPrice: currency;

    let errors = {
      takeProfitMore: false,
      takeProfitLess: false,
      minimalAvailableTakeProfit: false,
    };

    if (takeProfitPercent === 0) {
      position.TakeProfit = 0;
      return { takeProfit: 0, errors };
    }

    if (takeProfitPercent !== undefined && !isNaN(takeProfitPercent)) {
      position.TakeProfitPercent = takeProfitPercent;
      switch (position.PositionType) {
        case 'Long':
          profitPrice = currency(
            entryPrice.value +
              (entryPrice.value * takeProfitPercent) /
                100 /
                positionLeverage.value,
            { precision: 4 }
          );
          position.TakeProfit = parseFloat(profitPrice.value.toFixed(4));
          this.calculateTakeProfitAmount(position);

          return { takeProfit: profitPrice.value, errors };

        case 'Short':
          profitPrice = currency(
            entryPrice.value -
              (entryPrice.value * takeProfitPercent) /
                100 /
                positionLeverage.value,
            { precision: 4 }
          );
          position.TakeProfit = parseFloat(profitPrice.value.toFixed(4));

          return { takeProfit: profitPrice.value, errors };

        default:
          return { takeProfit: 0, errors };
      }
    } else {
      position.TakeProfitPercent = 0;
      return { takeProfit: 0, errors };
    }
  }

  // Функция отвечающая за логику расчета цены Стоп-лосса исходя из процентного значения
  public calculateStopLossPercent(
    position: Position,
    newStopLossPercent: number
  ) {
    const entryPrice = currency(position.EntryPrice, { precision: 4 });
    const stopLossPercent = newStopLossPercent;
    const positionLeverage = currency(position.Leverage || 1, { precision: 4 });
    let loss: currency;
    let errorsStopLoss = {
      stopLossMore: false,
      stopLossLess: false,
      minimalAvailableStopLoss: false,
    };

    if (stopLossPercent === 0) {
      position.StopLoss = 0;
      this.calculateStopLossAmount(position);

      return { stopLoss: 0, errorsStopLoss };
    }

    if (stopLossPercent !== undefined && !isNaN(stopLossPercent)) {
      position.StopLossPercent = stopLossPercent;
      switch (position.PositionType) {
        case 'Long': {
          loss = currency(
            entryPrice.value -
              (entryPrice.value * stopLossPercent) /
                100 /
                positionLeverage.value,
            { precision: 4 }
          );
          position.StopLoss = parseFloat(loss.value.toFixed(4));
          this.calculateStopLossAmount(position);

          return { stopLoss: loss.value, errorsStopLoss };
        }
        case 'Short': {
          loss = currency(
            entryPrice.value +
              (entryPrice.value * stopLossPercent) /
                100 /
                positionLeverage.value,
            { precision: 4 }
          );
          position.StopLoss = parseFloat(loss.value.toFixed(4));
          this.calculateStopLossAmount(position);

          return { stopLoss: loss.value, errorsStopLoss };
        }
        default:
          return { stopLoss: 0, errorsStopLoss };
      }
    } else {
      position.StopLossPercent = 0;
      return { stopLoss: 0, errorsStopLoss };
    }
  }

  // Функиця отвечающая за логику расчета процентного эквивалента Тейк-профита исходя из цены
  public calculateTakeProfitPrice(
    position: Position,
    newTakeProfitPrice: number
  ) {
    position.TakeProfit = currency(newTakeProfitPrice, { precision: 4 }).value;
    const entryPrice = currency(position.EntryPrice, { precision: 4 });
    const positionLeverage = currency(position.Leverage || 1, { precision: 4 });
    let takeProfitPercent: currency;

    let errors = {
      takeProfitMore: false,
      takeProfitLess: false,
      minimalAvailableTakeProfit: false,
    };

    if (newTakeProfitPrice <= 0 || newTakeProfitPrice.toString() === '') {
      errors.takeProfitLess = false;
      errors.minimalAvailableTakeProfit = true;
      position.TakeProfitPercent = 0;
      position.TakeProfitAmount = 0;
      return { takeProfit: 0, errors };
    }

    if (newTakeProfitPrice !== undefined && !isNaN(newTakeProfitPrice)) {
      switch (position.PositionType) {
        case 'Long': {
          if (newTakeProfitPrice <= entryPrice.value) {
            errors.takeProfitMore = true;
            position.TakeProfitPercent = 0;
            position.TakeProfitAmount = 0;
            return { takeProfit: 0, errors };
          }

          errors.takeProfitMore = false;

          takeProfitPercent = currency(
            ((newTakeProfitPrice - entryPrice.value) *
              100 *
              positionLeverage.value) /
              entryPrice.value,
            { precision: 4 }
          );

          position.TakeProfitPercent = parseFloat(
            takeProfitPercent.value.toFixed(2)
          );

          if (position.TakeProfitPercent > 200) {
            position.TakeProfitPercent = 200;
            this.calculateTakeProfitPercent(position, 200);
          }

          this.calculateTakeProfitAmount(position);

          return { takeProfit: newTakeProfitPrice, errors };
        }
        case 'Short': {
          if (newTakeProfitPrice >= entryPrice.value) {
            errors.takeProfitLess = true;
            errors.minimalAvailableTakeProfit = false;
            return { takeProfit: 0, errors };
          }

          errors.takeProfitLess = false;
          errors.minimalAvailableTakeProfit = false;

          takeProfitPercent = currency(
            ((entryPrice.value - newTakeProfitPrice) *
              100 *
              positionLeverage.value) /
              entryPrice.value,
            { precision: 4 }
          );

          position.TakeProfitPercent = parseFloat(
            takeProfitPercent.value.toFixed(2)
          );

          if (position.TakeProfitPercent > 200) {
            position.TakeProfitPercent = 200;
            this.calculateTakeProfitPercent(position, 200);
          }

          this.calculateTakeProfitAmount(position);

          return { takeProfit: newTakeProfitPrice, errors };
        }
        default:
          return { takeProfit: 0, errors };
      }
    } else {
      position.TakeProfit = 0;
      return { takeProfitPrice: 0, errors };
    }
  }

  // Функиця отвечающая за логику расчета процентного эквивалента Стоп-лосса исходя из цены
  public calculateStopLossPrice(position: Position, newStopLossPrice: number) {
    position.StopLoss = currency(newStopLossPrice, { precision: 4 }).value;
    const entryPrice = currency(position.EntryPrice, { precision: 4 });
    const positionLeverage = currency(position.Leverage || 1, { precision: 4 });
    let stopLossPercent: currency;
    let errorsStopLoss = {
      stopLossMore: false,
      stopLossLess: false,
      minimalAvailableStopLoss: false,
    };

    if (newStopLossPrice <= 0 || newStopLossPrice.toString() === '') {
      errorsStopLoss.minimalAvailableStopLoss = true;
      position.StopLossPercent = 0;
      this.calculateStopLossAmount(position);
      return { stopLoss: 0, errorsStopLoss };
    }

    if (newStopLossPrice !== undefined && !isNaN(newStopLossPrice)) {
      switch (position.PositionType) {
        case 'Long': {
          if (newStopLossPrice >= entryPrice.value) {
            errorsStopLoss.stopLossMore = true;
            errorsStopLoss.stopLossLess = false;
            errorsStopLoss.minimalAvailableStopLoss = false;
            position.StopLossPercent = 0;
            this.calculateStopLossAmount(position);

            return { stopLoss: 0, errorsStopLoss };
          }

          errorsStopLoss.stopLossMore = false;
          errorsStopLoss.stopLossLess = false;
          errorsStopLoss.minimalAvailableStopLoss = false;

          stopLossPercent = currency(
            ((entryPrice.value - newStopLossPrice) *
              100 *
              positionLeverage.value) /
              entryPrice.value,
            { precision: 4 }
          );

          position.StopLossPercent = parseFloat(
            stopLossPercent.value.toFixed(2)
          );

          if (position.StopLossPercent > 100) {
            position.StopLossPercent = 100;
            this.calculateStopLossPercent(position, 100);
          }

          this.calculateStopLossAmount(position);

          return { stopLoss: newStopLossPrice, errorsStopLoss };
        }
        case 'Short': {
          if (newStopLossPrice <= entryPrice.value) {
            errorsStopLoss.stopLossMore = false;
            errorsStopLoss.stopLossLess = true;
            errorsStopLoss.minimalAvailableStopLoss = false;
            position.StopLossPercent = 0;
            this.calculateStopLossAmount(position);

            return { stopLoss: 0, errorsStopLoss };
          }

          stopLossPercent = currency(
            ((newStopLossPrice - entryPrice.value) *
              100 *
              positionLeverage.value) /
              entryPrice.value,
            { precision: 4 }
          );

          position.StopLossPercent = parseFloat(
            stopLossPercent.value.toFixed(2)
          );

          if (position.StopLossPercent > 100) {
            position.StopLossPercent = 100;
            this.calculateStopLossPercent(position, 100);
          }

          this.calculateStopLossAmount(position);

          return { stopLoss: newStopLossPrice, errorsStopLoss };
        }
        default:
          return { stopLoss: 0, errorsStopLoss };
      }
    } else {
      position.StopLoss = 0;
      return { stopLossPrice: 0, errorsStopLoss };
    }
  }

  // Функция отвечающая за логику расчета прибыли при успешном закрытии Тейк-профит
  public calculateTakeProfitAmount(position: Position) {
    const entryPrice = currency(position.EntryPrice, { precision: 4 });
    const margin = currency(position.Margin, { precision: 4 });
    const positionLeverage = currency(position.Leverage || 1, { precision: 4 });
    const commission = currency(position.Commission || 0, { precision: 4 });
    const exitPrice = currency(position.TakeProfit || position.EntryPrice, {
      precision: 4,
    });

    let profitAmount: currency;
    let finalProfit: currency;

    if (
      entryPrice.value === 0 ||
      margin.value === 0 ||
      exitPrice.value === 0 ||
      position.TakeProfit === 0
    ) {
      position.TakeProfitAmount = 0;
      return 0;
    }

    switch (position.PositionType) {
      case 'Long':
        profitAmount = currency(
          (((exitPrice.value - entryPrice.value) * margin.value) /
            entryPrice.value) *
            positionLeverage.value,
          { precision: 4 }
        );
        finalProfit = currency(profitAmount.value * (1 - commission.value), {
          precision: 4,
        });
        position.TakeProfitAmount = finalProfit.value;
        return finalProfit.value;

      case 'Short':
        profitAmount = currency(
          (((entryPrice.value - exitPrice.value) * margin.value) /
            entryPrice.value) *
            positionLeverage.value,
          { precision: 4 }
        );

        finalProfit = currency(profitAmount.value * (1 - commission.value), {
          precision: 4,
        });
        position.TakeProfitAmount = finalProfit.value;
        return finalProfit.value;

      default:
        return 0;
    }
  }

  // Функция отвечающая за логику расчета потери при успешном закрытии Стоп-лосс
  public calculateStopLossAmount(position: Position) {
    const entryPrice = currency(position.EntryPrice, { precision: 4 });
    const exitPrice = currency(position?.StopLoss || entryPrice, {
      precision: 4,
    });
    const positionSize = currency(position.PositionSize, { precision: 4 });
    const commissionRate = currency(position.Commission || 0, { precision: 4 });
    let lossPerPosition: currency;
    let totalStopLoss: currency;

    if (
      position.StopLoss === 0 ||
      entryPrice.value === 0 ||
      positionSize.value === 0 ||
      exitPrice.value === 0
    ) {
      position.StopLossAmount = 0;
      return 0;
    }

    switch (position.PositionType) {
      case 'Long':
        lossPerPosition = currency(entryPrice.value - exitPrice.value, {
          precision: 4,
        });
        totalStopLoss = currency(
          lossPerPosition.value * (positionSize.value / entryPrice.value),
          { precision: 4 }
        );

        const longCommission = currency(
          positionSize.value * (commissionRate.value / 100),
          { precision: 4 }
        );
        totalStopLoss = currency(totalStopLoss.value - longCommission.value, {
          precision: 4,
        });

        position.StopLossAmount = totalStopLoss.value;
        return totalStopLoss.value;

      case 'Short':
        lossPerPosition = currency(exitPrice.value - entryPrice.value, {
          precision: 4,
        });
        totalStopLoss = currency(
          lossPerPosition.value * (positionSize.value / entryPrice.value),
          { precision: 4 }
        );

        const shortCommission = currency(
          positionSize.value * (commissionRate.value / 100),
          { precision: 4 }
        );
        totalStopLoss = currency(totalStopLoss.value - shortCommission.value, {
          precision: 4,
        });

        position.StopLossAmount = totalStopLoss.value;
        return totalStopLoss.value;

      default:
        return 0;
    }
  }

  // Функция отвечающая за логику расчета комиссии при открытии позиции
  public calculatePositionFees(position: Position) {
    return (position.Fees = position.PositionSize * position.Commission);
  }

  // Функция отвечающая за логику расчета цены ликвидации позиции
  public calculateLiquidationPrice(position: Position) {
    const entryPrice = currency(position.EntryPrice);
    const margin = currency(position.Margin);
    const positionSize = currency(position.PositionSize);
    const maintenanceMarginRate = currency(0.015, { precision: 4 });
    const maintenanceMargin = currency(
      positionSize.multiply(maintenanceMarginRate)
    );

    let liquidationPrice;

    switch (position.PositionType) {
      case 'Long':
        liquidationPrice = currency(
          entryPrice.value -
            ((margin.value - maintenanceMargin.value) / positionSize.value) *
              entryPrice.value,
          { precision: 4 }
        );

        position.Liquidation = liquidationPrice.value;
        return liquidationPrice.value;

      case 'Short':
        liquidationPrice = currency(
          entryPrice.value +
            ((margin.value - maintenanceMargin.value) / positionSize.value) *
              entryPrice.value,
          { precision: 4 }
        );

        position.Liquidation = liquidationPrice.value;
        return liquidationPrice.value;

      default:
        return 0;
    }
  }

  // Функция отвечающая за логику расчета объёма позиции
  public calculatePositionSize(position: Position): number {
    return (position.PositionSize = currency(
      position.Margin * position.Leverage,
      { precision: 4 }
    ).value);
  }
}
