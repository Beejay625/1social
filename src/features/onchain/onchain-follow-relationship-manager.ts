'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface FollowRelationship {
  follower: string;
  following: string;
  timestamp: bigint;
  onchain: boolean;
}

export function useOnchainFollowRelationshipManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [following, setFollowing] = useState(false);
  const [relationships, setRelationships] = useState<FollowRelationship[]>([]);

  const { data: followData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getFollowRelationships',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const followUser = async (targetAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setFollowing(true);

    try {
      const message = `Follow user onchain: ${targetAddress}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'follow',
        args: [address, targetAddress],
      });
    } finally {
      setFollowing(false);
    }
  };

  const unfollowUser = async (targetAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setFollowing(true);

    try {
      const message = `Unfollow user onchain: ${targetAddress}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'unfollow',
        args: [address, targetAddress],
      });
    } finally {
      setFollowing(false);
    }
  };

  useEffect(() => {
    if (followData) {
      const relationship = followData as FollowRelationship;
      setRelationships(prev => {
        const filtered = prev.filter(r => r.follower !== relationship.follower || r.following !== relationship.following);
        return [...filtered, relationship];
      });
    }
  }, [followData]);

  return {
    followUser,
    unfollowUser,
    following,
    relationships,
    address,
    isConnected,
    followData,
  };
}

