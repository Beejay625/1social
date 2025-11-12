export interface GovernanceProposal {
  id: string;
  proposer: string;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  status: 'active' | 'passed' | 'rejected';
  timestamp: number;
}

export interface GovernanceVote {
  id: string;
  proposalId: string;
  voter: string;
  vote: 'for' | 'against' | 'abstain';
  weight: string;
  timestamp: number;
}

