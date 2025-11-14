'use client';

import { useAccount, useBalance } from 'wagmi';
import { useState, useEffect } from 'react';

export interface PortfolioAsset {
  chain: string;
  token: string;
  balance: bigint;
  value: number;
}

export function useMultiChainPortfolio() {
  const { address, chainId } = useAccount();
  const { data: balance } = useBalance({ address });
  const [assets, setAssets] = useState<PortfolioAsset[]>([]);

  useEffect(() => {
    if (address && balance) {
      const asset: PortfolioAsset = {
        chain: `chain_${chainId}`,
        token: 'ETH',
        balance: balance.value,
        value: 0,
      };
      setAssets([asset]);
    }
  }, [address, balance, chainId]);

  return { assets, address, chainId };
}


