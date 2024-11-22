import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  Type,
  ViewChild,
} from '@angular/core';
import { ModalService } from 'app/services/show-modal/modal.service';

@Component({
  selector: 'confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements AfterViewInit {
  @ViewChild('dialog') dialogRef!: ElementRef<HTMLDialogElement>;
  @Input() confirmText: string = '';
  @Input() subConfirmText: string = '';
  externalComponent!: Type<any>;

  constructor(private _modalConfirm: ModalService) {}

  ngAfterViewInit() {
    this.show();
  }

  // Метод для открытия модалки
  public show() {
    if (this.dialogRef) {
      this.dialogRef.nativeElement.showModal();
    }
  }

  // Метод для закрытия модалки
  public close() {
    if (this.dialogRef) {
      this._modalConfirm.closeModal();
    }
  }
}
