'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useDAOVoting() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const castVote = async (proposalId: string, vote: boolean) => {
    if (!address) throw new Error('Wallet not connected');
    const message = `Vote:${proposalId}:${vote}`;
    await signMessageAsync({ message });
    return { proposalId, vote, voter: address };
  };
  return { castVote };
}
