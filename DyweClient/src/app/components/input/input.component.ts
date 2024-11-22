import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'input-t',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() inputId: string = '';
  @Input() value: any = '';
  @Input() isLeverage?: boolean = false;
  @Input() max: number = Infinity;
  @Input() decimalPlaces: number = 2;
  @Input() maxLength: number = 7;
  @Input() isAdaptive?: boolean = false;

  @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

  // Обработчик ввода в реальном времени (без округления)
  public onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let newValue = inputElement.value;

    // Регулярное выражение
    const regex = new RegExp(`^-?\\d*(\\.\\d{0,${this.decimalPlaces}})?$`);

    // Если новое значение не соответствует шаблону, возвращаем предыдущее значение
    if (!regex.test(newValue)) {
      inputElement.value = this.value;
      return;
    }

    // Проверка на максимальное значение
    if (newValue && Number(newValue) > this.max) {
      newValue = this.max.toString();
    }

    // Обрезаем длину значения, если она превышает maxLength
    if (newValue.length > this.maxLength) {
      newValue = newValue.slice(0, this.maxLength);
    }

    // Применяем новое значение без округления
    this.value = newValue;
    inputElement.value = newValue;
    this.valueChange.emit(newValue);
  }
}
