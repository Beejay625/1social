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
  metadataURI: string;
  valid: boolean;
  errors: string[];
  validatedBy: string;
  timestamp: number;
}

export function useNFTMetadataValidatorV2() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [validations, setValidations] = useState<MetadataValidation[]>([]);

  const validateMetadata = async (
    tokenId: string,
    collectionAddress: string,
    metadataURI: string
  ): Promise<MetadataValidation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    
    const message = `Validate metadata V2: ${tokenId} in ${collectionAddress}`;
    await signMessageAsync({ message });
    
    const valid = metadataURI.startsWith('http://') || metadataURI.startsWith('https://') || metadataURI.startsWith('ipfs://');
    const errors = valid ? [] : ['Invalid URI format'];
    
    const validation: MetadataValidation = {
      validationId: `validate-v2-${Date.now()}`,
      tokenId,
      collectionAddress,
      metadataURI,
      valid,
      errors,
      validatedBy: address,
      timestamp: Date.now(),
    };
    
    setValidations([...validations, validation]);
    return validation;
  };

  return { validateMetadata, validations, address };
}
