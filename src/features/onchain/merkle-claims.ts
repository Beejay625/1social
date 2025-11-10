'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useMerkleClaims() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const claimReward = async (merkleRoot: string, proof: string[]) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Claim:${merkleRoot}:${address}`;
    await signMessageAsync({ message });
    return { merkleRoot, proof, claimedBy: address };
  };
  return { claimReward, isConnected, address };
}

