import { Component, Input } from '@angular/core';

@Component({
  selector: 'po-button',
  templateUrl: './po-button.component.html',
  styleUrls: ['./po-button.component.scss'],
})
export class PoButtonComponent {
  @Input() buttonType = 'Edit';
}
