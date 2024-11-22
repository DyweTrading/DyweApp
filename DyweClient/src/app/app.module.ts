// app.module.ts
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import {
  TON_CONNECT_UI_OPTIONS,
  TonConnectUIModule,
} from 'tonconnect-ui-angular-fork';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MiniModalModule } from './components/modal/mini-modal/mini-modal.module';
import { TradeJettonsModule } from './pages/trade/jettons/trade-jettons.module';
import { TradeNFTModule } from './pages/trade/nft/trade-nft.module';
import { LanguageService } from './services/language/language.service';
import { TranslationLoaderService } from './services/translation-loader-service/translation-loader-service.service';
import { WalletSService } from './services/walletService/wallet-s.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MiniModalModule,
    TradeNFTModule,
    TradeJettonsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (translationLoader: TranslationLoaderService) =>
          translationLoader.createTranslateLoader(),
        deps: [TranslationLoaderService],
      },
    }),
    TonConnectUIModule.forRoot({
      options: {
        provide: TON_CONNECT_UI_OPTIONS,
        useValue: of({
          manifestUrl: `https://raw.githubusercontent.com/kwinkich/dywe-manifest/refs/heads/main/manifest.json`,
          restoreConnection: true,
          actionsConfiguration: {
            modals: 'all',
            notifications: 'all',
          },
        }),
      },
    }),
  ],
  providers: [WalletSService, LanguageService],
  bootstrap: [AppComponent],
})
export class AppModule {}
