import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription, firstValueFrom } from 'rxjs';
import {
  ConnectedWallet,
  TonConnectUIService,
  toUserFriendlyAddress,
} from 'tonconnect-ui-angular-fork';

@Injectable({
  providedIn: 'root',
})
export class WalletSService implements OnDestroy {
  private walletSubject = new BehaviorSubject<ConnectedWallet | null>(null);
  public wallet$ = this.walletSubject.asObservable();
  private formattedAddressSubject = new BehaviorSubject<string | null>(null);
  public formattedAddress$ = this.formattedAddressSubject.asObservable();
  private balanceSubject = new BehaviorSubject<number | null>(null);
  public balance$ = this.balanceSubject.asObservable();
  private _walletSubscription!: Subscription;
  public address: string = '';
  private readonly apiUrl = 'https://testnet.tonapi.io';

  constructor(
    private readonly _tonConnectUIService: TonConnectUIService,
    private _http: HttpClient
  ) {}

  public initWallet(): void {
    this._walletSubscription = this._tonConnectUIService
      .getConnectedWallet()
      .subscribe((wallet) => {
        this.walletSubject.next(wallet);
        if (wallet) {
          const userFriendlyAddress = toUserFriendlyAddress(
            wallet.account.address
          );
          this.address = wallet.account.address;
          this.formattedAddressSubject.next(userFriendlyAddress);
        } else {
          this.formattedAddressSubject.next(null);
          this.balanceSubject.next(null);
        }
      });
  }

  public connectWallet(): void {
    this._tonConnectUIService.get().subscribe((uiConnect) => {
      uiConnect.openModal();
    });
  }

  public async disconnectWallet(): Promise<void> {
    const uiDisconnect = await firstValueFrom(this._tonConnectUIService.get());
    uiDisconnect.disconnect();
    this.walletSubject.next(null);
    this.formattedAddressSubject.next(null);
    this.balanceSubject.next(null);
  }

  // Функция получения баланса
  public getBalance(): void {
    this._http
      .get<{ balance: number }>(`${this.apiUrl}/v2/accounts/${this.address}`)
      .subscribe({
        next: (response) => {
          this.balanceSubject.next(response.balance);
        },
        error: (error) => {
          console.error('Ошибка при получении баланса:', error);
          this.balanceSubject.next(null);
        },
      });
  }

  ngOnDestroy(): void {
    this._walletSubscription?.unsubscribe();
  }
}
