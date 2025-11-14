'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ERC721Info {
  contract: string;
  name: string;
  symbol: string;
  totalSupply: bigint;
  timestamp: number;
}

export function useContractERC721Checker() {
  const { address } = useAccount();
  const [nfts, setNfts] = useState<ERC721Info[]>([]);

  const { data: totalSupplyData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'totalSupply',
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (address && totalSupplyData !== undefined) {
      const nft: ERC721Info = {
        contract: '0x',
        name: 'NFT',
        symbol: 'NFT',
        totalSupply: (totalSupplyData as bigint) || 0n,
        timestamp: Date.now(),
      };
      setNfts([nft]);
    }
  }, [address, totalSupplyData]);

  return { nfts, address };
}


