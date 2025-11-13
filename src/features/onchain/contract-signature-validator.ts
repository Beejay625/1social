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

export function useContractSignatureValidator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [validations, setValidations] = useState<SignatureValidation[]>([]);

  const validateSignature = async (message: string, signature: string, valid: boolean) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const msg = `Validate Signature: ${message}`;
    await signMessageAsync({ message: msg });
    
    const validation: SignatureValidation = {
      message,
      signature,
      valid,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setValidations([...validations, validation]);
    return validation;
  };

  return { validateSignature, validations, address };
}

