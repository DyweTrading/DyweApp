// Сервис отвечает за скрытие меню при клике на свободную область

import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VisibilityService {
  private renderer: Renderer2;
  private activeButton: HTMLElement | null = null;
  private activeMenu: HTMLElement | null = null;
  private clickListener: (() => void) | null = null;

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  public manageVisibility(
    button: HTMLElement,
    menu: HTMLElement,
    onBody: boolean = false
  ) {
    const isActive = button.classList.contains('active');

    if (this.activeMenu && this.activeMenu !== menu) {
      this.hideMenu(this.activeButton!, this.activeMenu);
    }

    button.classList.toggle('active', !isActive);
    menu.classList.toggle('show', !isActive);

    this.activeButton = !isActive ? button : null;
    this.activeMenu = !isActive ? menu : null;

    // if (onBody) {
    //   document.body.classList.toggle('no-scroll', !isActive);
    // }

    if (!isActive) {
      this.addClickOutsideListener(button, menu);
    } else if (this.clickListener) {
      this.clickListener();
    }
  }

  private addClickOutsideListener(button: HTMLElement, menu: HTMLElement) {
    if (this.clickListener) {
      this.clickListener();
    }

    this.clickListener = this.renderer.listen(
      'document',
      'click',
      (event: Event) => {
        const target = event.target as HTMLElement;

        if (!button.contains(target) && !menu.contains(target)) {
          this.hideMenu(button, menu);
          document.body.classList.remove('no-scroll');
          this.activeButton = null;
          this.activeMenu = null;

          if (this.clickListener) {
            this.clickListener();
          }
        }
      }
    );
  }

  private hideMenu(button: HTMLElement, menu: HTMLElement) {
    button.classList.remove('active');
    menu.classList.remove('show');
  }
}
