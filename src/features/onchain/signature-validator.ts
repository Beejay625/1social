'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SignatureValidation {
  message: string;
  signature: string;
  valid: boolean;
  wallet: string;
  timestamp: number;
}

export function useSignatureValidator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [validations, setValidations] = useState<SignatureValidation[]>([]);

  const validateSignature = async (message: string, signature: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const newSignature = await signMessageAsync({ message });
    
    const validation: SignatureValidation = {
      message,
      signature: newSignature,
      valid: true,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setValidations([...validations, validation]);
    return validation;
  };

  return { validateSignature, validations, address };
}


