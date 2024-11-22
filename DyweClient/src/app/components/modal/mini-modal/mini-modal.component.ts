import { Component, Input } from '@angular/core';
import { ShowMiniModalService } from 'app/services/show-mini-modal/show-mini-modal.service';

@Component({
  selector: 'mini-modal',
  templateUrl: './mini-modal.component.html',
  styleUrls: ['./mini-modal.component.scss'],
})
export class MiniModalComponent {
  @Input() modalContent!: string;

  constructor(private modalService: ShowMiniModalService) {}

  public closeModal() {
    this.modalService.closeModal();
  }
}
