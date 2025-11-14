'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { parseAbi } from 'viem';

const CONTRACT_ABI = parseAbi(['function addReaction(uint256 postId, string memory reactionType) public returns (uint256)']);

export function useContractInteraction5(contractAddress: string) {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const interact = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'addReaction',
      args: [BigInt(1), 'like'],
    });
  };

  return { interact, address };
}


