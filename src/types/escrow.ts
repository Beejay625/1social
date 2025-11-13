export interface Escrow {
  id: string;
  creator: string;
  contentId: string;
  buyer: string;
  amount: string;
  currency: string;
  releaseCondition: string;
  timestamp: number;
  status: 'pending' | 'released' | 'refunded' | 'disputed';
}

export interface EscrowRelease {
  id: string;
  escrowId: string;
  releasedBy: string;
  amount: string;
  timestamp: number;
  reason: string;
}

