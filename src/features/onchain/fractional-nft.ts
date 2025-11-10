'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface FractionalNFT {
  tokenId: string;
  shares: number;
  pricePerShare: string;
  owners: string[];
  wallet: string;
}

export function useFractionalNFT() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [fractionals, setFractionals] = useState<FractionalNFT[]>([]);

  const fractionalizeNFT = async (tokenId: string, shares: number, pricePerShare: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Fractionalize: ${tokenId} ${shares} shares @ ${pricePerShare}`;
    await signMessageAsync({ message });
    
    const fractional: FractionalNFT = {
      tokenId,
      shares,
      pricePerShare,
      owners: [address],
      wallet: address,
    };
    
    setFractionals([...fractionals, fractional]);
    return fractional;
  };

  return { fractionalizeNFT, fractionals, address };
}

