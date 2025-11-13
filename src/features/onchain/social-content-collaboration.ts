'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface Collaboration {
  id: string;
  contentId: string;
  creator: string;
  collaborator: string;
  role: 'co-author' | 'editor' | 'contributor';
  share: number;
  timestamp: number;
}

export function useSocialContentCollaboration() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [collaborations, setCollaborations] = useState<Collaboration[]>([]);

  const addCollaborator = async (
    contentId: string,
    collaborator: string,
    role: 'co-author' | 'editor' | 'contributor',
    share: number
  ) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Add Collaborator: ${contentId} ${collaborator} ${role} ${share}%`;
    await signMessageAsync({ message });
    
    const collaboration: Collaboration = {
      id: `collab-${Date.now()}`,
      contentId,
      creator: address,
      collaborator,
      role,
      share,
      timestamp: Date.now(),
    };
    
    setCollaborations([...collaborations, collaboration]);
    return collaboration;
  };

  return { addCollaborator, collaborations, address };
}

