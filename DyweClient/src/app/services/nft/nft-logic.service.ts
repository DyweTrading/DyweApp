import { Injectable } from '@angular/core';
import { TradePair } from 'app/interfaces/trade-pair';

export const nftPairs: TradePair[] = [
  {
    tradePairRoute: 'ATN-TON',
    tradePairName: 'ATNTON',
    tradePairIcon:
      'https://i.getgems.io/5QoaCbH0BG6neb0s8GBQpyVkVT_2WKerGMqX2Rt2UNg/rs:fill:200:200:1/g:ce/att:1/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUFPUWR3ZHc4a0dmdEpDU0ZnT0VyTTFtQmpZUGU0REJQcTgtQWhGNnZyOXNpNU4vYjYxNTZkZmQwNDE3MjkzYQ',
    tradePairVolume: 0,
    tradePairPriceChange: 0,
    tradePairMarketPrice: 0,
    tradePairCollectionAddr: 'EQAOQdwdw8kGftJCSFgOErM1mBjYPe4DBPq8-AhF6vr9si5N',
  },
  {
    tradePairRoute: 'TU-TON',
    tradePairName: 'TUTON',
    tradePairIcon:
      'https://i.getgems.io/3jmOWi4FnHW-AorbRjV52ftmLfqyj0QvpXiLXel0Ro8/rs:fill:200:200:1/g:ce/att:1/czM6Ly9nZXRnZW1zLXMzL25mdC1jb250ZW50LWNhY2hlL2ltYWdlcy9FUUNBMTRvMS1WV2hTMmVmcW9oXzlNMWJfQTlEdEtUdW9xZm1rbjgzQWJKenduUGkvNGMxYWRjNDAxYWE5YTEzNg',
    tradePairVolume: 0,
    tradePairPriceChange: 0,
    tradePairMarketPrice: 0,
  },
];

@Injectable({
  providedIn: 'root',
})
export class NftLogicService {
  constructor() {}
}
