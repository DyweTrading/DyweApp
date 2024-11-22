# Button-Part

Пропсы:

- `Value: number` - отвечает за значение которое будет выводиться в качестве контента, а так же присваивется в качестве value, который будет отдаваться при клике.
- `buttonType: stirng` - отвечает за то, какого типа будет кнопка. Принимает одно из двух значений `amount; leverage`
- `isActive` - отвечает за то, будет ли кнопка активна. Нужно для того, чтобы устанавливать активную кнопку.
- `valueChanged: EventEmmiter<number>` - отвечает за прокидывание значения на верхние уровни, через событие.

За что отвечает:

- Кнопка-контроля для депозита (1%, 25%, 50%, 75%, 100%)
- Кнопка-контроля для плеча (x10, x20, x30, x40, x50)

Где используется?

- Position-control

```ts
<button-part
  [value]='{значение типа number}'
  buttonType='amount || leverage'
  [isActive]="true/false либо же условие"
  (valueChanged)="exampleFunction($event)"
>
```

Функционал

- При клике рождает событие с значением переданным в `value`, можно принять и в родительском компоненте применить, тем самым изменить активную кнопку

Пример:

```ts
// Родительский компонент (логика)

public buttonActive: number = 10; // Указываем дефолтное значение для активной кнопки
public setNewActiveButton(value: number){
  this.buttonActive = value;
  return;
}

// Родительский компонент (html)

<button-part
  [value]="10"
  buttonType='amount'
  [isActive]="buttonActive === 10" // Будет по дефолту активной, ибо условие соблюденно
  (valueChanged)="setNewActiveButton($event)"
>
<button-part
  [value]="20"
  buttonType='amount'
  [isActive]="buttonActive === 20"
  (valueChanged)="setNewActiveButton($event)"
>
<button-part
  [value]="30"
  buttonType='amount'
  [isActive]="buttonActive === 30"
  (valueChanged)="setNewActiveButton($event)"
>
```
