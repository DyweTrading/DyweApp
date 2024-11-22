// language.service.ts
import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  public currentLang: string = localStorage.getItem('language') || 'EN';

  constructor(private translate: TranslateService) {
    this.translate.use(this.currentLang);
  }

  public changeLang(lang: string) {
    this.currentLang = lang;
    this.translate.use(lang); // Меняем язык
    localStorage.setItem('language', lang);
  }

  public getLang(): string {
    return this.currentLang;
  }
}
