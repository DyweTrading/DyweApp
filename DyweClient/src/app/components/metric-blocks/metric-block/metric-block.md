# Metric-block

Пропсы:

- `isMinMaxSplit: boolean` - Пропс нужен только для 1 кейса. Minmax на десктопе. Его можно не указывать.

- `title: string` - Пропс отвечает за название метрика.

- `value: string` - Пропс отвечает за значение метрика.

- `percentage?: string` - Пропс отвечает за значение процентное\эквивалентное метрика. Условно в P&L Нам приходит 200(USDT), нам надо предоставить сколько P&L в процентах. Для этого указываем `percentage`. Если ничего не надо - не указываем.

- `colorClass: string` - Пропс отвечает за цвет специфических значений. Условно для того же P&L в случае плюса нам надо окрашивать в main, в случае минуса в wrong. Принимает всего 2 значения `main-color; wrong-color`

- `valueMax?: string` - Пропс отвечает за максимальное значение цены. Используется только для метрика MaxMin Price. Для других можно не указывать.
- `valueMin?: string` - Пропс отвечает за минимальное значение цены. Используется только для метрика MaxMin Price. Для других можно не указывать.

За что отвечает:

- Компонент отвечает за отображение блока метрика.

Где используется?

- Trade Pair Info
- Positions-Orders

```ts
// MaxMin Example
<metric-block
  [isMinMaxSplit]="true" // Для False можное не указывать
  title="MaxMin"
  [value]="" // Для MaxMin не указываем. Для других - указываем
  [precentrage]="" // Для MaxMin не указываем. Для других - опицонально указываем
  [valueMax]="varMax" // Указываем только для MinMax
  [valueMin]="varMin" // Указываем только для MinMax
>

// Market Price Example
<metric-block
  title="Market Price"
  [value]="varMarketPrice"
  [precentrage]="концертация varMarketPrice в USD"
>

// Price Change 24h
<metric-block
  title="Change 24h"
  [value]="varPriceChange"
  colorClass="main-color - если плюс, wrong-color - если минус"
>
```
