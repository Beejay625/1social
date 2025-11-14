'use client';

import { useReadContract } from 'wagmi';
import { parseAbi } from 'viem';
import { SOCIAL_MEDIA_CONTRACT_ADDRESS } from '@/constants/contractAddress';

const CONTRACT_ABI = parseAbi(['function getTotalPosts() public view returns (uint256)']);

export function useContractRead(functionName: string, args: any[] = []) {
  const { data, isLoading, error } = useReadContract({
    address: SOCIAL_MEDIA_CONTRACT_ADDRESS as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: functionName as any,
    args,
  });

  return { data, isLoading, error };
}


