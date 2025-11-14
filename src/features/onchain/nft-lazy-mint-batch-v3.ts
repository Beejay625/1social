'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LazyMintData {
  tokenId: bigint;
  uri: string;
  signature: string;
}

export function useNFTLazyMintBatchV3() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [minting, setMinting] = useState(false);

  const mintBatch = async (collectionAddress: string, mints: LazyMintData[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setMinting(true);

    try {
      const message = `Lazy mint batch of ${mints.length} NFTs`;
      await signMessageAsync({ message });

      const tokenIds = mints.map(m => m.tokenId);
      const uris = mints.map(m => m.uri);
      const signatures = mints.map(m => m.signature);

      await writeContract({
        address: collectionAddress as `0x${string}`,
        abi: [],
        functionName: 'lazyMintBatch',
        args: [tokenIds, uris, signatures],
      });
    } finally {
      setMinting(false);
    }
  };

  return {
    mintBatch,
    minting,
    address,
    isConnected,
  };
}
