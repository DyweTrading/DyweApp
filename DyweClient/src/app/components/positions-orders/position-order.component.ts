import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnDestroy,
} from '@angular/core';
import { WalletSService } from 'app/services/walletService/wallet-s.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ConnectedWallet } from 'tonconnect-ui-angular-fork';

@Component({
  selector: 'positions-orders',
  templateUrl: './position-order.component.html',
  styleUrls: ['./position-order.component.scss'],
})
export class PositionOrderComponent implements AfterViewInit, OnDestroy {
  public wallet: ConnectedWallet | null = null;
  private destroy$ = new Subject<void>();
  public activeSection: string = 'open-position';
  public isEmpty: boolean = false;

  public sections: { id: string; name: string }[] = [
    {
      id: 'open-position',
      name: 'POS-OR.Open positions',
    },
    {
      id: 'position-history',
      name: 'POS-OR.Position history',
    },
    {
      id: 'open-orders',
      name: 'POS-OR.Open orders',
    },
    {
      id: 'orders-history',
      name: 'POS-OR.Orders history',
    },
  ];

  constructor(
    private _walletService: WalletSService,
    private _cdr: ChangeDetectorRef
  ) {}

  ngAfterViewInit(): void {
    this._walletService.wallet$
      .pipe(takeUntil(this.destroy$))
      .subscribe((wallet) => {
        this.wallet = wallet;
        if (wallet) {
          this.isEmpty = false;
        } else {
          this.isEmpty = true;
        }
        this._cdr.detectChanges(); // Запускаем обнаружение изменений после обновления
      });
    this._walletService.initWallet();
  }
  public toggleSection(section: string) {
    this.activeSection = section;
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
