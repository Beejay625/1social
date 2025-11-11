'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ABIValidation {
  abi: any[];
  valid: boolean;
  errors: string[];
  wallet: string;
  timestamp: number;
}

export function useContractABIValidator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [validations, setValidations] = useState<ABIValidation[]>([]);

  const validateABI = async (abi: any[], errors: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Validate ABI: ${abi.length} items`;
    await signMessageAsync({ message });
    
    const validation: ABIValidation = {
      abi,
      valid: errors.length === 0,
      errors,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setValidations([...validations, validation]);
    return validation;
  };

  return { validateABI, validations, address };
}
