'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ModerationAction {
  id: string;
  contentId: string;
  moderator: string;
  action: 'approve' | 'reject' | 'flag' | 'remove';
  reason: string;
  timestamp: number;
}

export function useSocialContentModeration() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [moderations, setModerations] = useState<ModerationAction[]>([]);

  const moderateContent = async (
    contentId: string,
    action: 'approve' | 'reject' | 'flag' | 'remove',
    reason: string
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Moderate: ${contentId} ${action} ${reason}`;
    await signMessageAsync({ message });
    
    const moderation: ModerationAction = {
      id: `mod-${Date.now()}`,
      contentId,
      moderator: address,
      action,
      reason,
      timestamp: Date.now(),
    };
    
    setModerations([...moderations, moderation]);
    return moderation;
  };

  return { moderateContent, moderations, address };
}

