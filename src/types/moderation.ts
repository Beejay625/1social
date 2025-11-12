export interface ModerationAction {
  id: string;
  contentId: string;
  moderator: string;
  action: 'approve' | 'reject' | 'flag' | 'remove';
  reason: string;
  timestamp: number;
}

export interface ModerationRule {
  id: string;
  ruleType: 'keyword' | 'spam' | 'abuse' | 'copyright';
  rule: string;
  action: 'flag' | 'remove' | 'warn';
  enabled: boolean;
}

