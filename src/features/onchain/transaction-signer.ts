'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SignedTransaction {
  message: string;
  signature: string;
  wallet: string;
  timestamp: number;
}

export function useTransactionSigner() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [signedTxs, setSignedTxs] = useState<SignedTransaction[]>([]);

  const signTransaction = async (message: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const signature = await signMessageAsync({ message });
    
    const signed: SignedTransaction = {
      message,
      signature,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setSignedTxs([...signedTxs, signed]);
    return signed;
  };

  return { signTransaction, signedTxs, address };
}
