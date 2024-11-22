import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HeaderModule } from 'app/components/header/header.module';
import { PositionControlModule } from 'app/components/position-control/position-control.module';
import { ChartModule } from '../../../components/chart/chart.module';
import { NavMobileModule } from '../../../components/nav-mobile/nav-mobile.module';
import { PositionOrderModule } from '../../../components/positions-orders/position-order.module';
import { TradePairInfoModule } from '../../../components/trade-pair-info/trade-pair-info.module';
import { TradeNFTComponent } from './trade-nft.component';

@NgModule({
  declarations: [TradeNFTComponent],
  imports: [
    CommonModule,
    HeaderModule,
    NavMobileModule,
    PositionControlModule,
    TradePairInfoModule,
    PositionOrderModule,
    ChartModule,
  ],
})
export class TradeNFTModule {}
