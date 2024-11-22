import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'switch-position',
  templateUrl: './switch-position.component.html',
  styleUrls: ['./switch-position.component.scss'],
})
export class SwitchPositionComponent {
  @Input() positionType: string = 'Long';
  @Output() positionTypeChange: EventEmitter<string> =
    new EventEmitter<string>();

  @ViewChild('buttonLongType') buttonLongType: ElementRef | null = null;
  @ViewChild('buttonShortType') buttonShortType: ElementRef | null = null;

  public togglePosition(posType: string) {
    this.positionType = posType;
    this.positionTypeChange.emit(this.positionType);
    console.log(this.positionType);
    switch (posType) {
      case 'Long':
        this.buttonLongType?.nativeElement.classList.remove(
          'button-switch-pos-disabled'
        );
        this.buttonShortType?.nativeElement.classList.add(
          'button-switch-pos-disabled'
        );
        break;
      case 'Short':
        this.buttonShortType?.nativeElement.classList.remove(
          'button-switch-pos-disabled'
        );
        this.buttonLongType?.nativeElement.classList.add(
          'button-switch-pos-disabled'
        );
        break;
      default:
        break;
    }
  }
}
