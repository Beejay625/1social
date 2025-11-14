'use client';

import { useAccount, useReadContract } from 'wagmi';
import { parseAbi } from 'viem';

const CONTRACT_ABI = parseAbi(['function getTotalReactions() public view returns (uint256)']);

export function useContractInteraction10(contractAddress: string) {
  const { address } = useAccount();
  const { data } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getTotalReactions',
  });

  return { totalReactions: data, address };
}


