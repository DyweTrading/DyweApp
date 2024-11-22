import {
  ComponentRef,
  Injectable,
  Injector,
  ViewContainerRef,
} from '@angular/core';
import { MiniModalComponent } from 'app/components/modal/mini-modal/mini-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ShowMiniModalService {
  private modalRef: ComponentRef<MiniModalComponent> | null = null;

  constructor(private injector: Injector) {}

  openModal(modalContent: string, viewContainerRef: ViewContainerRef) {
    if (this.modalRef) {
      return;
    }

    this.modalRef = viewContainerRef.createComponent(MiniModalComponent, {
      injector: this.injector,
    });

    this.modalRef.instance.modalContent = modalContent;

    const domElem = (this.modalRef.hostView as any).rootNodes[0] as HTMLElement;
    document.body.appendChild(domElem);

    setTimeout(() => {
      this.closeModal();
    }, 3000);
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.destroy();
      this.modalRef = null;
    }
  }
}
