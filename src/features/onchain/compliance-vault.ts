'use client';
import { useAccount, useSignMessage } from 'wagmi';
export interface ComplianceProof {
  contentId: string;
  decision: string;
  timestamp: number;
  signature: string;
}
export function useComplianceProofVault() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const attestDecision = async (contentId: string, decision: string) => {
    if (!address) throw new Error('Wallet not connected');
    const message = `Compliance:${contentId}:${decision}`;
    const signature = await signMessageAsync({ message });
    return { contentId, decision, signature, attestedBy: address };
  };
  return { attestDecision };
}

