'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { parseAbi } from 'viem';

const CONTRACT_ABI = parseAbi(['function addComment(uint256 postId, string memory content) public returns (uint256)']);

export function useContractInteraction3(contractAddress: string) {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const interact = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'addComment',
      args: [BigInt(1), 'First comment interaction'],
    });
  };

  return { interact, address };
}

