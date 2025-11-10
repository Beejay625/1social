'use client';

import { useAccount, useBalance } from 'wagmi';
import { useState, useEffect } from 'react';

export interface CrossChainAsset {
  chain: string;
  asset: string;
  balance: bigint;
  value: number;
}

export function useCrossChainAssetTracker() {
  const { address, chainId } = useAccount();
  const { data: balance } = useBalance({ address });
  const [assets, setAssets] = useState<CrossChainAsset[]>([]);

  useEffect(() => {
    if (address && balance) {
      const asset: CrossChainAsset = {
        chain: `chain_${chainId}`,
        asset: balance.symbol,
        balance: balance.value,
        value: 0,
      };
      setAssets([asset]);
    }
  }, [address, balance, chainId]);

  return { assets, address, chainId };
}

