'use client';

/**
 * NFT Metadata Validator V2
 * Validate NFT metadata with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MetadataValidation {
  validationId: string;
  tokenId: string;
  collectionAddress: string;
  metadata: Record<string, any>;
  valid: boolean;
  errors: string[];
  timestamp: number;
}

export function useNFTMetadataValidatorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [validations, setValidations] = useState<MetadataValidation[]>([]);

  const validate = async (
    tokenId: string,
    collectionAddress: string,
    metadata: Record<string, any>
  ): Promise<MetadataValidation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Validate metadata: ${collectionAddress} #${tokenId}`;
    await signMessageAsync({ message });
    
    const errors: string[] = [];
    if (!metadata.name) errors.push('Missing name field');
    if (!metadata.description) errors.push('Missing description field');
    
    const validation: MetadataValidation = {
      validationId: `val-${Date.now()}`,
      tokenId,
      collectionAddress,
      metadata,
      valid: errors.length === 0,
      errors,
      timestamp: Date.now(),
    };
    
    setValidations([...validations, validation]);
    return validation;
  };

  return { validate, validations, address };
}

