import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { LanguageService } from 'app/services/language/language.service';
import { WalletSService } from 'app/services/walletService/wallet-s.service';
import { VisibilityService } from 'app/utils/click-outside.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('buttonMobile') buttonMob: ElementRef | null = null;
  @ViewChild('buttonLang') buttonLang: ElementRef | null = null;
  @ViewChild('langMenu') langMenu: ElementRef | null = null;

  public currentLang: string = 'EN';
  public bouncableUserFriendlyAddress: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(
    public elRender: Renderer2,
    public elRef: ElementRef,
    private visibilityService: VisibilityService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private _walletService: WalletSService,
    private _langService: LanguageService
  ) {}

  ngOnInit(): void {
    this.currentLang = this._langService.getLang();

    // Подписка на адрес кошелька в формате для отображения
    this._walletService.formattedAddress$
      .pipe(takeUntil(this.destroy$))
      .subscribe((address) => {
        this.bouncableUserFriendlyAddress = address;
        this.cdr.markForCheck();
      });
  }

  ngAfterViewInit(): void {
    this._walletService.initWallet();
  }

  public isActive(url: string): boolean {
    return this.router.url.startsWith(url);
  }

  // Функция для управления мобильным меню
  public toggleMobileMenu() {
    this.buttonMob?.nativeElement.classList.toggle('active');
    document.querySelector('.nav-mobile')?.classList.toggle('show');
    document.body.classList.toggle('no-scroll-menu');
  }

  // Функция для переключения языка
  public toggleSelectLang() {
    if (this.buttonLang && this.langMenu) {
      this.visibilityService.manageVisibility(
        this.buttonLang.nativeElement,
        this.langMenu.nativeElement
      );
    }
  }

  // Фнкция для установки языка
  public setLang(langStr: string) {
    if (langStr !== '') {
      this._langService.changeLang(langStr);
      this.currentLang = langStr;
      if (this.buttonLang && this.langMenu) {
        this.visibilityService.manageVisibility(
          this.buttonLang.nativeElement,
          this.langMenu.nativeElement
        );
      }
    } else {
      throw new Error('Language String is empty');
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
