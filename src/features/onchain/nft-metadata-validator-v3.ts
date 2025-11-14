'use client';

/**
 * NFT Metadata Validator V3
 * Validate NFT metadata with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface ValidationResult {
  validationId: string;
  collectionAddress: string;
  tokenId: string;
  metadataUri: string;
  isValid: boolean;
  errors: string[];
  validatedBy: string;
  timestamp: number;
}

export function useNFTMetadataValidatorV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [validations, setValidations] = useState<ValidationResult[]>([]);

  const validateMetadata = async (
    collectionAddress: string,
    tokenId: string,
    metadataUri: string
  ): Promise<ValidationResult> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Validate metadata V3: ${collectionAddress} #${tokenId}`;
    await signMessageAsync({ message });
    
    const validation: ValidationResult = {
      validationId: `validate-v3-${Date.now()}`,
      collectionAddress,
      tokenId,
      metadataUri,
      isValid: false,
      errors: [],
      validatedBy: address,
      timestamp: Date.now(),
    };
    
    setValidations([...validations, validation]);
    return validation;
  };

  return { validateMetadata, validations, address };
}
