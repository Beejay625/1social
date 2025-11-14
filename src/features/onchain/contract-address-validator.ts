'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface AddressValidation {
  address: string;
  isValid: boolean;
  isContract: boolean;
  codeHash: string;
}

export function useContractAddressValidator() {
  const { address } = useAccount();
  const [validations, setValidations] = useState<AddressValidation[]>([]);

  const { data: code } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'code',
    args: [],
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (address) {
      const validation: AddressValidation = {
        address,
        isValid: true,
        isContract: !!code,
        codeHash: code ? '0x' : '',
      };
      setValidations([validation]);
    }
  }, [address, code]);

  return { validations, address };
}


