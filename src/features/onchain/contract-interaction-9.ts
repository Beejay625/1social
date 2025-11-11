'use client';

import { useAccount, useReadContract } from 'wagmi';
import { parseAbi } from 'viem';

const CONTRACT_ABI = parseAbi(['function getTotalComments() public view returns (uint256)']);

export function useContractInteraction9(contractAddress: string) {
  const { address } = useAccount();
  const { data } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getTotalComments',
  });

  return { totalComments: data, address };
}

