import { Component, Input } from '@angular/core';

@Component({
  selector: 'type-badge',
  templateUrl: './type-badge.component.html',
  styleUrls: ['./type-badge.component.scss'],
})
export class TypeBadgeComponent {
  @Input() positionType: string = 'long';
}
