export interface LiquidityPool {
  id: string;
  creator: string;
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
  liquidity: string;
  timestamp: number;
}

export interface LiquidityPosition {
  id: string;
  provider: string;
  poolId: string;
  share: string;
  timestamp: number;
}

