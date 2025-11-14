'use client';

import { useAccount, useReadContract } from 'wagmi';
import { parseAbi } from 'viem';

const CONTRACT_ABI = parseAbi(['function getPost(uint256 postId) public view returns (tuple(uint256 id, address author, string content, uint256 timestamp, uint256 likes, uint256 comments))']);

export function useContractInteraction18(contractAddress: string) {
  const { address } = useAccount();
  const { data } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: CONTRACT_ABI,
    functionName: 'getPost',
    args: [BigInt(1)],
  });

  return { post: data, address };
}


