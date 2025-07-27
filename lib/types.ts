export interface Stock {
  symbol: string;
  name: string;
  price: number;
  previousPrice: number;
  percentageChange: number;
  volume: number;
  sector?: string;
  marketCap?: number;
}

export interface User {
  id: string;
  email: string;
  balance: number;
  watchList: WatchList;
}

export interface WatchList {
  [symbol: string]: {
    quantity: number;
    averagePrice: number;
  };
}

export interface Trade {
  symbol: string;
  quantity: number;
  price: number;
  type: 'buy' | 'sell';
  timestamp: Date;
}