import {
  ApplicationRef,
  ComponentRef,
  Injectable,
  Injector,
  Type,
  createComponent,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalRef: ComponentRef<any> | null = null;

  constructor(private injector: Injector, private appRef: ApplicationRef) {}

  openModal<T>(
    component: Type<T>,
    componentInputs?: Partial<T>,
    externalComponent?: Type<any>
  ) {
    if (this.modalRef) {
      return;
    }

    this.modalRef = createComponent(component, {
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector,
    });

    if (componentInputs) {
      Object.assign(this.modalRef.instance, componentInputs);
    }

    if (externalComponent) {
      this.modalRef.instance.externalComponent = externalComponent;
    }

    this.appRef.attachView(this.modalRef.hostView);
    const domElem = this.modalRef.location.nativeElement;
    document.body.appendChild(domElem);

    const dialogElem = domElem.querySelector('dialog') as HTMLDialogElement;
    if (dialogElem) {
      dialogElem.showModal();
      dialogElem.focus();
      dialogElem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  closeModal() {
    if (this.modalRef) {
      const dialogElem = this.modalRef.location.nativeElement.querySelector(
        'dialog'
      ) as HTMLDialogElement;
      if (dialogElem) {
        dialogElem.close();
      }

      document.body.removeChild(this.modalRef.location.nativeElement);
      this.appRef.detachView(this.modalRef.hostView);
      this.modalRef.destroy();
      this.modalRef = null;
    }
  }
}
