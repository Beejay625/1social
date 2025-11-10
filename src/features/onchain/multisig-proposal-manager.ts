'use client';
import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
export function useMultiSigProposalManager() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const createProposal = async (target: string, value: bigint, data: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Proposal:${target}:${value}:${data.substring(0, 20)}`;
    await signMessageAsync({ message });
    return { target, value, data, proposedBy: address };
  };
  return { createProposal, isConnected, address };
}

