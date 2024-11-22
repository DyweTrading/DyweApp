import { AfterViewInit, Component } from '@angular/core';
import { LanguageService } from './services/language/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  constructor(private _languageService: LanguageService) {}

  ngAfterViewInit() {
    let lang = localStorage.getItem('language');
    if (!lang) {
      lang = 'EN';
      this._languageService.changeLang(lang);
    }
  }
}
