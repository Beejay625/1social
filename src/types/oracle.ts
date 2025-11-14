export interface PriceData {
  id: string;
  tokenAddress: string;
  price: string;
  currency: string;
  source: string;
  timestamp: number;
  blockNumber: number;
}

export interface OracleFeed {
  id: string;
  tokenAddress: string;
  oracleAddress: string;
  updateInterval: number;
  lastUpdate: number;
  active: boolean;
}


