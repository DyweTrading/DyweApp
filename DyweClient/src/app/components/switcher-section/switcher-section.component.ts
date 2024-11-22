import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'switcher-section',
  templateUrl: './switcher-section.component.html',
  styleUrls: ['./switcher-section.component.scss'],
})
export class SwitcherSectionComponent {
  @Input() sections: { id: string; name: string }[] = [];
  @Input() activeSection: string = '';
  @Output() updateActiveSection: EventEmitter<string> =
    new EventEmitter<string>();

  public toggleActiveSection(section: string) {
    this.activeSection = section;
    this.updateActiveSection.emit(section);
  }
}
