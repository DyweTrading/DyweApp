# Position-metrics

Пропсы:

- `positionSize: number` - Пропс отвечает за значение объёма позиции.

- `entryPrice: number` - Пропс отвечает за значение цены входа.

- `liquidationPrice: number` - Пропс отвечает за значение цены ликвидации.

- `priceImpact: number` - Пропс отвечает за значение прайс-импакта.

- `approximatePriceTP: number` - Пропс отвечает за значение цены тейк-профита.

- `approximatePriceSL: number` - Пропс отвечает за значение цены стоп-лосса.

- `fees: number` - Пропс отвечает за значение комиссии.

За что отвечает:

- Отображение метриков по позиции, которую собирается открыть пользователь

Где используется?

- Position-control

```ts
<position-metrics
  [positionSize]="numeric value"
  [entryPrice]="numeric value"
  [liquidationPrice]="numeric value"
  [priceImpact]="numeric value"
  [approximatePriceTP]="numeric value"
  [approximatePriceSL]="numeric value"
  [fees]="numeric value"
>
```
