import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'button-part',
  templateUrl: './button-part.component.html',
  styleUrls: ['./button-part.component.scss'],
})
export class ButtonPartComponent {
  @Input() value: number = 0;
  @Input() buttonType: string = 'amount';
  @Input() isActive: boolean = false;
  @Output() valueChanged: EventEmitter<number> = new EventEmitter<number>();

  public handleValueChange(value: number) {
    this.valueChanged.emit(value);
    this.isActive = true;
  }
}
