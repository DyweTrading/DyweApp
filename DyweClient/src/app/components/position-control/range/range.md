# Range

Пропсы:

- `rangeType: string` - Пропс отвечает за тип ренджа. Принимает одно из двух значений `tp; sl`.

- `value: number` - Пропс отвечает за значение ренджа (прогресс).

- `max: number` - Пропс отвечает за максимально доступное значение в инпут-рендже.

- `valueChange: EventEmmiter<number>` - порождает событие в котором передаёт на верхний уровень новое значение.

За что отвечает:

- Рендж для изменения тейк-профита, стоп-лосса

Где используется?

- Position-control
- Модалки

```ts
<range
  rangeType="tp"
  [value]="numeric value"
  [max]="200"
  (valueChange)="exampleFunction($event)"
>
```
