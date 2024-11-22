import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'custom-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
})
export class RangeComponent implements OnInit, OnChanges {
  @Input() rangeType: string = 'tp';
  @Input() value: number = 0;
  @Input() max: number = Infinity;

  @Output() valueChange: EventEmitter<number> = new EventEmitter<number>();

  public rangeParts: number[] = Array.from(
    { length: 9 },
    (_, i) => (i + 1) * 10
  );
  public minProgressWidth: number = 4;
  public maxProgressWidth: number = 100;
  public progressWidth: number = this.minProgressWidth;

  ngOnInit() {
    const windowWidth = window.innerWidth;

    if (windowWidth < 800) {
      this.minProgressWidth = 5;
    } else {
      this.minProgressWidth = 1;
    }

    this.updateProgress(this.progressWidth);
  }

  ngOnChanges() {
    if (this.value === 0) {
      this.updateProgress(this.minProgressWidth);
    } else {
      this.value = Math.max(this.value, this.minProgressWidth);
      this.updateProgress(this.value);
    }
  }

  // Обработчик для мыши
  public onMouseDown(event: MouseEvent) {
    this.startSlide(event.pageX, event.currentTarget as HTMLElement);
  }

  // Обработчик для тач-событий
  public onTouchStart(event: TouchEvent) {
    this.startSlide(event.touches[0].pageX, event.currentTarget as HTMLElement);
  }

  private startSlide(pageX: number, container: HTMLElement) {
    const moveAt = (pageX: number) => {
      const rect = container.getBoundingClientRect();
      const offsetX = pageX - rect.left;
      const width = rect.width;

      const newWidth = Math.max(
        this.minProgressWidth,
        Math.min(this.maxProgressWidth, (offsetX / width) * 100)
      );

      this.updateProgress(newWidth);
      this.calculateValue();
    };

    moveAt(pageX);

    const onMouseMove = (e: MouseEvent) => moveAt(e.pageX);
    const onTouchMove = (e: TouchEvent) => moveAt(e.touches[0].pageX);

    const stopSlide = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', stopSlide);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', stopSlide);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', stopSlide);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('touchend', stopSlide);
  }

  // Функция отвечающая за обновление прогрес-бара в рендже
  private updateProgress(newWidth: number) {
    this.progressWidth = Math.max(
      this.minProgressWidth,
      Math.min(newWidth, this.maxProgressWidth)
    );
  }

  // Функция отвечающая за вычисление текущего значения в рендже
  public calculateValue() {
    const calculatedValue = Math.round(
      ((this.progressWidth - this.minProgressWidth) /
        (this.maxProgressWidth - this.minProgressWidth)) *
        100
    );

    this.value = calculatedValue;
    this.valueChange.emit(calculatedValue);
  }

  // Функция отвечающая за обработку ввода в поле ввода
  public onInputChange(event: Event) {
    let inputElement = event.target as HTMLInputElement;
    let inputValue = inputElement.value;

    const regex = /^\d*(\.\d{0,2})?$/;
    if (!regex.test(inputValue)) {
      inputElement.value = this.value.toString();
      return;
    }
    let numericValue = Number(inputValue);

    if (numericValue > this.max) {
      numericValue = this.max;
    }

    this.value = numericValue;

    this.updateProgress(numericValue);
    this.valueChange.emit(this.value);
  }
}
