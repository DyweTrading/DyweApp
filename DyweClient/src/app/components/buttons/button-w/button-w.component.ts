import {
  Component,
  ElementRef,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ShowMiniModalService } from 'app/services/show-mini-modal/show-mini-modal.service';
import { WalletSService } from 'app/services/walletService/wallet-s.service';
import { VisibilityService } from 'app/utils/click-outside.service';

@Component({
  selector: 'app-button-w',
  templateUrl: './button-w.component.html',
  styleUrls: ['./button-w.component.scss'],
})
export class ButtonWComponent {
  @Input() address: string | null = null;
  @ViewChild('buttonWallet') buttonWallet: ElementRef | null = null;
  @ViewChild('walletList') walletList: ElementRef | null = null;

  constructor(
    private _walletService: WalletSService,
    private visibilityService: VisibilityService,
    private _miniModalServices: ShowMiniModalService,
    private viewContainerRef: ViewContainerRef
  ) {}

  public showWalletList() {
    if (this.buttonWallet && this.walletList) {
      this.visibilityService.manageVisibility(
        this.buttonWallet.nativeElement,
        this.walletList.nativeElement
      );
    }
  }

  public clickItem() {
    if (this.buttonWallet && this.walletList) {
      this.visibilityService.manageVisibility(
        this.buttonWallet.nativeElement,
        this.walletList.nativeElement
      );
    }
  }

  public openExplorer(walletAddress: string | null): void {
    if (walletAddress) {
      const explorerUrl = `https://tonviewer.com/${walletAddress}`;
      window.open(explorerUrl, '_blank');
      this.clickItem();
    }
  }

  public copyAddressToClipboard(walletAddress: string | null): void {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress).then(
        () => {
          this._miniModalServices.openModal('Copied', this.viewContainerRef); // Передаём ViewContainerRef
          this.clickItem();
        },
        (err) => {
          console.error('Failed to copy the address to clipboard: ', err);
        }
      );
    }
  }

  public async disconnectWallet() {
    await this._walletService.disconnectWallet();
    this.clickItem();
  }
}
