'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useNFTCollectionBurnManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [burning, setBurning] = useState(false);

  const { data: isOwner } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'ownerOf',
    args: [BigInt(0)],
  });

  const burnNFT = async (collectionAddress: string, tokenId: bigint) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setBurning(true);

    try {
      const message = `Burn NFT token ${tokenId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'burn',
        args: [tokenId],
      });
    } finally {
      setBurning(false);
    }
  };

  const batchBurn = async (collectionAddress: string, tokenIds: bigint[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setBurning(true);

    try {
      await signMessageAsync({ message: `Batch burn ${tokenIds.length} NFTs` });
      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'batchBurn',
        args: [tokenIds],
      });
    } finally {
      setBurning(false);
    }
  };

  return {
    burnNFT,
    batchBurn,
    burning,
    address,
    isConnected,
    isOwner: address?.toLowerCase() === (isOwner as string)?.toLowerCase(),
  };
}

