'use client';
import { useAccount, useWriteContract } from 'wagmi';
export function useGovernanceVoteCaster() {
  const { address, isConnected } = useAccount();
  const { writeContractAsync } = useWriteContract();
  const castVote = async (proposalId: bigint, support: number) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return await writeContractAsync({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'castVote',
      args: [proposalId, support],
    });
  };
  return { castVote, isConnected, address };
}
