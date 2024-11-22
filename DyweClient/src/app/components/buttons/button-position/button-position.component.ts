import { Component, Input } from '@angular/core';

@Component({
  selector: 'button-position',
  templateUrl: './button-position.component.html',
  styleUrls: ['./button-position.component.scss'],
})
export class ButtonPositionComponent {
  @Input() positionType: string = 'Long';
  @Input() dissabled: boolean = false;
}
