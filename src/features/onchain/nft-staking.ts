'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface NFTStake {
  id: string;
  tokenId: string;
  collection: string;
  stakedAt: number;
  rewards: bigint;
}

export function useNFTStaking() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [stakes, setStakes] = useState<NFTStake[]>([]);

  const stakeNFT = async (collection: string, tokenId: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: collection as `0x${string}`,
      abi: [],
      functionName: 'stake',
      args: [BigInt(tokenId)],
    });

    const stake: NFTStake = {
      id: txHash || '',
      tokenId,
      collection,
      stakedAt: Date.now(),
      rewards: BigInt(0),
    };

    setStakes([...stakes, stake]);
    return txHash;
  };

  return { stakeNFT, stakes, address };
}


