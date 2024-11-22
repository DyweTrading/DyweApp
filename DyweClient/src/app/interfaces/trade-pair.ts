export interface TradePair {
  tradePairRoute: string;
  tradePairName: string;
  tradePairIcon: string;
  tradePairVolume: number;
  tradePairPriceChange: number;
  tradePairMarketPrice: number;
  tradePairCollectionAddr?: string;
}

export interface TradePairMetrics {
  marketPrice: any;
  pricaChange: any;
  volume: any;
  maxPrice: any;
  minPrice: any;
  fundingRes: any;
  nextFundingTime: any;
  openInteresL: any;
  openInteresS: any;
}
