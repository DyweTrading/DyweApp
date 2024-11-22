import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { VisibilityService } from 'app/utils/click-outside.service';

@Component({
  selector: 'switch-price-type',
  templateUrl: './switch-price-type.component.html',
  styleUrls: ['./switch-price-type.component.scss'],
})
export class SwitchPriceTypeComponent {
  @Input() isAdaptive?: boolean = false;
  @Input() priceType: string = 'Market';
  @Input() entryPrice: number = 0;
  @Input() minimalAvailablePrice: boolean = false;
  @Output() priceTypeChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() entryPriceChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() minimalAvailablePriceChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @ViewChild('selectPriceType') selectPriceType: ElementRef | null = null;
  @ViewChild('listPriceType') listPriceType: ElementRef | null = null;

  constructor(
    public elRender: Renderer2,
    public elRef: ElementRef,
    private visibilityService: VisibilityService
  ) {}

  public priceTypesArr: string[] = ['Market', 'Limits'];

  public toggleSelectPriceType() {
    if (this.selectPriceType && this.listPriceType) {
      this.visibilityService.manageVisibility(
        this.selectPriceType.nativeElement,
        this.listPriceType.nativeElement
      );
    }
  }

  public setPriceType(priceTypeStr: string) {
    if (priceTypeStr !== '') {
      this.minimalAvailablePrice = false;
      this.minimalAvailablePriceChange.emit(false);
      this.priceTypeChange.emit(priceTypeStr);
      this.priceType = priceTypeStr;
      if (this.selectPriceType && this.listPriceType) {
        this.visibilityService.manageVisibility(
          this.selectPriceType.nativeElement,
          this.listPriceType.nativeElement
        );
      }
    } else {
      throw new Error('Price Type String is empty');
    }
  }

  public onEntryPriceChange(newEntryPrice: string) {
    const min: number = 0.1;
    const price = Number(newEntryPrice);
    if (price < min) {
      this.minimalAvailablePrice = true;
      this.minimalAvailablePriceChange.emit(true);
      this.entryPriceChange.emit(0);
    } else {
      this.minimalAvailablePrice = false;
      this.minimalAvailablePriceChange.emit(false);
      this.entryPriceChange.emit(price);
    }
  }
}
