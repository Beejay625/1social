export interface Buyback {
  id: string;
  executor: string;
  tokenAddress: string;
  amount: string;
  price: string;
  timestamp: number;
  transactionHash?: string;
}

export interface BuybackProgram {
  id: string;
  creator: string;
  tokenAddress: string;
  totalAmount: string;
  spent: string;
  startTime: number;
  endTime: number;
  active: boolean;
}


