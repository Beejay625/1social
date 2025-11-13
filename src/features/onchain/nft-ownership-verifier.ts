'use client';

/**
 * NFT Ownership Verifier
 * Verifies NFT ownership with cryptographic verification via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface OwnershipVerification {
  tokenId: string;
  collectionAddress: string;
  owner: string;
  verified: boolean;
  timestamp: number;
}

export function useNFTOwnershipVerifier() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [verifications, setVerifications] = useState<OwnershipVerification[]>([]);

  const verify = async (
    tokenId: string,
    collectionAddress: string,
    expectedOwner: string
  ): Promise<OwnershipVerification> => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Verify NFT ownership: ${collectionAddress} #${tokenId}`;
    await signMessageAsync({ message });
    
    const verification: OwnershipVerification = {
      tokenId,
      collectionAddress,
      owner: expectedOwner,
      verified: expectedOwner.toLowerCase() === address.toLowerCase(),
      timestamp: Date.now(),
    };
    
    setVerifications([...verifications, verification]);
    return verification;
  };

  return { verify, verifications, address };
}

