'use client';

import { useAccount, useReadContract, useBalance } from 'wagmi';
import { useState } from 'react';

export interface TokenGate {
  tokenAddress?: string;
  minBalance: string;
  nftContract?: string;
}

export function useTokenGatedCampaigns() {
  const { address } = useAccount();
  const { data: balance } = useBalance({ address });
  const [hasAccess, setHasAccess] = useState(false);

  const checkAccess = async (gate: TokenGate) => {
    if (!address) return false;
    
    if (gate.tokenAddress) {
      const { data: tokenBalance } = useReadContract({
        address: gate.tokenAddress as `0x${string}`,
        abi: [{
          name: 'balanceOf',
          type: 'function',
          stateMutability: 'view',
          inputs: [{ name: 'owner', type: 'address' }],
          outputs: [{ name: '', type: 'uint256' }],
        }],
        functionName: 'balanceOf',
        args: [address],
      });
      
      const hasBalance = Number(tokenBalance || 0) >= Number(gate.minBalance);
      setHasAccess(hasBalance);
      return hasBalance;
    }
    
    return false;
  };

  return { checkAccess, hasAccess, balance };
}


