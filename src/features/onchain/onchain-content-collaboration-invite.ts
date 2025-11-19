'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface CollaborationInvite {
  inviteId: string;
  contentHash: string;
  inviter: string;
  invitee: string;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: bigint;
}

export function useOnchainContentCollaborationInvite() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [inviting, setInviting] = useState(false);
  const [invites, setInvites] = useState<CollaborationInvite[]>([]);

  const { data: inviteData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getInvites',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const sendInvite = async (contentHash: string, invitee: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setInviting(true);

    try {
      const message = `Send collaboration invite onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'sendInvite',
        args: [contentHash, invitee, address],
      });
    } finally {
      setInviting(false);
    }
  };

  useEffect(() => {
    if (inviteData) {
      const invite = inviteData as CollaborationInvite;
      setInvites(prev => {
        const filtered = prev.filter(i => i.inviteId !== invite.inviteId);
        return [...filtered, invite];
      });
    }
  }, [inviteData]);

  return {
    sendInvite,
    inviting,
    invites,
    address,
    isConnected,
    inviteData,
  };
}

