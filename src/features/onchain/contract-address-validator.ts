'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface AddressValidation {
  address: string;
  valid: boolean;
  checksum: string;
  wallet: string;
  timestamp: number;
}

export function useContractAddressValidator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [validations, setValidations] = useState<AddressValidation[]>([]);

  const validateAddress = async (addr: string, valid: boolean, checksum: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Validate Address: ${addr}`;
    await signMessageAsync({ message });
    
    const validation: AddressValidation = {
      address: addr,
      valid,
      checksum,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setValidations([...validations, validation]);
    return validation;
  };

  return { validateAddress, validations, address };
}
