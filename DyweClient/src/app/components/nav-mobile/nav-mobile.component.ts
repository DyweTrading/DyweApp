import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { LanguageService } from 'app/services/language/language.service';
import { VisibilityService } from 'app/utils/click-outside.service';

@Component({
  selector: 'app-nav-mobile',
  templateUrl: './nav-mobile.component.html',
  styleUrls: ['./nav-mobile.component.scss'],
})
export class NavMobileComponent implements OnInit {
  @ViewChild('buttonLangNav') buttonLangNav: ElementRef | null = null;
  @ViewChild('langMenuNav') langMenuNav: ElementRef | null = null;
  public currentLang: string = 'EN';
  constructor(
    public elRender: Renderer2,
    public elRef: ElementRef,
    private visibilityService: VisibilityService,
    private _langService: LanguageService
  ) {}

  ngOnInit(): void {
    this.currentLang = this._langService.getLang();
    return;
  }

  public toggleSelectLang() {
    if (this.buttonLangNav && this.langMenuNav) {
      this.visibilityService.manageVisibility(
        this.buttonLangNav.nativeElement,
        this.langMenuNav.nativeElement
      );
    }
  }

  public setLang(langStr: string) {
    if (langStr !== '') {
      this._langService.changeLang(langStr);
      this.currentLang = langStr;
      if (this.buttonLangNav && this.langMenuNav) {
        this.visibilityService.manageVisibility(
          this.buttonLangNav.nativeElement,
          this.langMenuNav.nativeElement
        );
      }
    } else {
      throw new Error('Language String is empty');
    }
  }
}
