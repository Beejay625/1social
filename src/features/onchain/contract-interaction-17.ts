'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { parseAbi } from 'viem';

const CONTRACT_ABI = parseAbi(['function updateProfile(string memory name, string memory bio, string memory avatar) public']);

export function useContractInteraction17(contractAddress: string) {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();

  const interact = async () => {
    if (!address) throw new Error('Reown wallet not connected');
    writeContract({
      address: contractAddress as `0x${string}`,
      abi: CONTRACT_ABI,
      functionName: 'updateProfile',
      args: ['Updated Name', 'Updated Bio', 'https://updated-avatar.url'],
    });
  };

  return { interact, address };
}

