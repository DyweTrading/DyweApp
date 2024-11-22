import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

@Injectable({
  providedIn: 'root',
})
export class TranslationLoaderService {
  constructor(private http: HttpClient) {}

  public createTranslateLoader(): TranslateLoader {
    return new TranslateHttpLoader(this.http);
  }
}
