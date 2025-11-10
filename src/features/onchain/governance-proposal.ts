'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useGovernanceProposal() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const createProposal = async (title: string, description: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Proposal:${title}:${description}`;
    await signMessageAsync({ message });
    return { title, description, proposer: address };
  };
  return { createProposal, isConnected, address };
}
