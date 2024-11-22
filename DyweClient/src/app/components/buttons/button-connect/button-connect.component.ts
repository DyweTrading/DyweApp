import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WalletSService } from 'app/services/walletService/wallet-s.service';
import { Subscription } from 'rxjs';
import { ConnectedWallet } from 'tonconnect-ui-angular-fork';

@Component({
  selector: 'button-connect',
  templateUrl: './button-connect.component.html',
  styleUrls: ['./button-connect.component.scss'],
})
export class ButtonConnectComponent implements OnInit, OnDestroy {
  @Input() isAdaptive: boolean = false; // True - адаптивная кнопка (уменьшаются отсупы); False - никаких изменений

  public wallet: ConnectedWallet | null = null;
  private walletSubscription: Subscription | null = null;

  constructor(private _walletService: WalletSService) {}

  ngOnInit(): void {
    this.walletSubscription = this._walletService.wallet$.subscribe(
      (wallet) => {
        this.wallet = wallet;
      }
    );

    this._walletService.initWallet();
  }

  public connectWallet(): void {
    this._walletService.connectWallet();
  }

  ngOnDestroy(): void {
    if (this.walletSubscription) {
      this.walletSubscription.unsubscribe();
    }
  }
}
