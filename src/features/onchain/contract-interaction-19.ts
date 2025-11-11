'use client';

import { useAccount, useReadContract } from 'wagmi';
import { parseAbi } from 'viem';

const CONTRACT_ABI = parseAbi(['function getUserPosts(address user) public view returns (uint256[] memory)']);

export function useContractInteraction19(contractAddress: string) {
  const { address } = useAccount();
  const { data } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getUserPosts',
    args: [address as `0x${string}`],
    query: { enabled: !!address },
  });

  return { userPosts: data, address };
}

