'use client';

import { useAccount, useSignMessage } from 'wagmi';

export interface ABTestVariant {
  id: string;
  content: string;
  results: Record<string, number>;
}

export function useOnchainABTesting() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();

  const registerTest = async (testId: string, variants: ABTestVariant[]) => {
    if (!address) throw new Error('Wallet not connected');
    
    const message = `ABTest:${testId}:${JSON.stringify(variants)}`;
    await signMessageAsync({ message });
    
    return { testId, variants, registered: true };
  };

  return { registerTest };
}

