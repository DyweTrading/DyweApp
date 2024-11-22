import { Component, OnDestroy, OnInit } from '@angular/core';
import { WalletSService } from 'app/services/walletService/wallet-s.service';
import { Subscription } from 'rxjs';
import { ConnectedWallet } from 'tonconnect-ui-angular-fork';

@Component({
  selector: 'button-connect-main',
  templateUrl: './button-connect-main.component.html',
  styleUrls: ['./button-connect-main.component.scss'],
})
export class ButtonConnectMainComponent implements OnInit, OnDestroy {
  public wallet: ConnectedWallet | null = null;
  private walletSubscription: Subscription = new Subscription();

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
    this.walletSubscription.unsubscribe();
  }
}
