# Switch-position

Пропсы:

- `isAdaptive?: boolean` - Пропс отвечает за то, будет ли компонент адаптивным.

- `priceType: string` - Пропс отвечает за тип цены. Принимает одно из двух значений `Market; Limit`.

- `entryPrice: number` - Пропс отвечает за то, цену входа, которая будет отображенна в инпуте, если тип `Limit`.

- `minimalAvailablePrice: boolean` - Пропс отвечает за состояние ошибки. Соблюдена ли Минимально Доступная цена открытия

- `priceTypeChange: EventEmmiter<string>` - порождает событие в котором передаёт на верхний уровень новое значение.

- `entryPriceChange: EventEmmiter<number>` - порождает событие в котором передаёт на верхний уровень новое значение.

- `minimalAvailablePriceChange: EventEmmiter<boolean>` - порождает событие в котором передаёт на верхний уровень новое значение.

За что отвечает:

- Select типа цены
- Инпут лимтиной цены входа

Где используется?

- Position-control
- Модалки

```ts
<switch-price-type
  [isAdaptive]="true" // Для false можно не указывать
  priceType="Limit"
  [entryPrice]="numeric value"
  [minimalAvailablePrice]="boolean value"
  (priceTypeChange)="exampleFunction($event)"
  (entryPriceChange)="exampleFunction($event)"
  (minimalAvailablePriceChange)="exampleFunction($event)"
>
```
