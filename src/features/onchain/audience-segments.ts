'use client';
import { useAccount, useReadContract } from 'wagmi';
export interface AudienceSegment {
  id: string;
  criteria: { tokenAddress?: string; minBalance: string };
}
export function useOnchainAudienceSegments() {
  const { address } = useAccount();
  const createSegment = async (criteria: AudienceSegment['criteria']) => {
    if (!address) throw new Error('Wallet not connected');
    const segment: AudienceSegment = {
      id: `segment_${Date.now()}`,
      criteria,
    };
    return segment;
  };
  return { createSegment };
}

