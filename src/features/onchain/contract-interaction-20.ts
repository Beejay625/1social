'use client';

import { useAccount, useReadContract } from 'wagmi';
import { parseAbi } from 'viem';

const CONTRACT_ABI = parseAbi(['function getProfile(address user) public view returns (tuple(address user, string name, string bio, string avatar, uint256 reputation, bool verified))']);

export function useContractInteraction20(contractAddress: string) {
  const { address } = useAccount();
  const { data } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getProfile',
    args: [address as `0x${string}`],
    query: { enabled: !!address },
  });

  return { profile: data, address };
}

