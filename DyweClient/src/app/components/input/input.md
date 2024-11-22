# Input-t

Пропсы:

- `label: string` - отвечает за лейбл инпута.

- `placeholder: stirng` - отвечает за плейсхолдер инпута.

- `inputId: string` - отвечает за айди ипута, чтобы связать его с лейблом.

- `value: any` - отвечает за значение инпута.

- `isLeverage?: boolean` - отвечает за указание на то, используется ли этот инпут для того, чтобы вводить плечо.

- `max: number` - отвечат за максимально доступное значение инпута. Если введённое значение оказывается больше, нежели максимально - в значение инпута возвращается максимальное.

- `decimalPlaces: number` - отвечат за количество знаков после запятой, позволенных для введения.

- `maxLength: number` - отвечат за максимальное количество символов в инпуте.

- `isAdaptive?: boolean` - отвечает за указание на то, будет ли инпута адаптивен. (По сути используется только в модалках)

- `valueChange: EventEmmiter<any>` - отвечает за порождение события, которое будет направлено в родительский компонент, для изменения значений.

За что отвечает:

- Введение числовых значений (маржа, плечо, точка входа, т.д)

Где используется?

- Position-control
- Модалки

```ts
<input-t
  label="Label Text"
  placeholder="Placeholder Text"
  inputId="InputId Name"
  [value]="var"
  [isLeverage]="true/false" // Для false можно не указывать
  [maxLength]="{значение типа number}"
  [isAdaptive]="true/false" // Для false можно не указывать
  (valueChange)="exampleFunction($event)"
>
```

Функционал

- При вводе рождает событие с значением полученным из инпута, можно принять и в родительском компоненте применить.

Пример:

```ts
// Родительский компонент (логика)
public balance: number = 600;
public max: number = balance; // Указываем максимальное значение для инпута
public margin: number = 0;

public setNewMargin(newValue: number){
  this.margin = newValue;
  return;
}

// Родительский компонент (html)
<input-t
  label="Maring"
  placeholder="TON"
  inputId="margin-input"
  [value]="margin"
  [isLeverage]="false" // Для false можно не указывать
  [maxLength]="max"
  [isAdaptive]="false" // Для false можно не указывать
  (valueChange)="setNewMargin($event)"
>
```
