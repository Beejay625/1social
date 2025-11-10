'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FractionalNFT {
  nftId: string;
  shares: number;
  pricePerShare: string;
  totalShares: number;
  wallet: string;
}

export function useFractionalNFT() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [fractions, setFractions] = useState<FractionalNFT[]>([]);

  const fractionalize = async (nftId: string, shares: number, pricePerShare: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Fractionalize NFT: ${nftId} into ${shares} shares`;
    await signMessageAsync({ message });
    
    const fraction: FractionalNFT = {
      nftId,
      shares,
      pricePerShare,
      totalShares: shares,
      wallet: address,
    };
    
    setFractions([...fractions, fraction]);
    return fraction;
  };

  return { fractionalize, fractions, address };
}
