# Switch-position

Пропсы:

- `positionType: string` - Пропс отвечает за тип позиции. Принимает одно из двух значений `Long; Short`.

- `positionTypeChange: EventEmmiter<string>` - порождает событие в котором передаёт на верхний уровень новое значение.

За что отвечает:

- Кнопки переключения типа позици.

Где используется?

- Position-control

```ts
<switch-position
  positionType="Long"
  (positionTypeChange)="exampleFunction($event)"
>
```
