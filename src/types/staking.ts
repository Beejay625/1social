export interface StakingPool {
  id: string;
  creator: string;
  tokenAddress: string;
  apy: number;
  lockPeriod: number;
  totalStaked: string;
  participants: number;
}

export interface Stake {
  id: string;
  staker: string;
  poolId: string;
  amount: string;
  timestamp: number;
  unlockTime: number;
}


