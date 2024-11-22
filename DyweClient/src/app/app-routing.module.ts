import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TradeJettonsComponent } from './pages/trade/jettons/trade-jettons.component';
import { TradeNFTComponent } from './pages/trade/nft/trade-nft.component';

const routes: Routes = [
  { path: '', redirectTo: 'trade/nft/ATN-TON', pathMatch: 'full' },
  {
    path: 'trade',
    children: [
      { path: 'nft/:tradePairRoute', component: TradeNFTComponent },
      { path: 'jettons/:tradePairRoute', component: TradeJettonsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
