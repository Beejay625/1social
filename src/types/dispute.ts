export interface Dispute {
  id: string;
  contentId: string;
  disputant: string;
  defendant: string;
  reason: string;
  arbitrator?: string;
  resolution?: string;
  timestamp: number;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
}

export interface DisputeEvidence {
  id: string;
  disputeId: string;
  submitter: string;
  evidence: string;
  timestamp: number;
}


