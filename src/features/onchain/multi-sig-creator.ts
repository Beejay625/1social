'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MultiSigWallet {
  address: string;
  owners: string[];
  threshold: number;
  wallet: string;
}

export function useMultiSigCreator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [wallets, setWallets] = useState<MultiSigWallet[]>([]);

  const createMultiSig = async (owners: string[], threshold: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Create MultiSig: ${owners.length} owners, threshold ${threshold}`;
    await signMessageAsync({ message });
    
    const wallet: MultiSigWallet = {
      address: `0x${Date.now().toString(16)}`,
      owners,
      threshold,
      wallet: address,
    };
    
    setWallets([...wallets, wallet]);
    return wallet;
  };

  return { createMultiSig, wallets, address };
}


