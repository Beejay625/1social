'use client';

import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseAbi } from 'viem';
import { SOCIAL_MEDIA_CONTRACT_ADDRESS } from '@/constants/contractAddress';

const CONTRACT_ABI = parseAbi(['function createPost(string memory content) public returns (uint256)']);

export function useContractWrite() {
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });

  const write = (functionName: string, args: any[]) => {
    writeContract({
      address: SOCIAL_MEDIA_CONTRACT_ADDRESS as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: functionName as any,
      args,
    });
  };

  return { write, hash, isPending, isConfirming, isConfirmed, error };
}

