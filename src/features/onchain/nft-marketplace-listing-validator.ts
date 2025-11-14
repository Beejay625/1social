'use client';

/**
 * NFT Marketplace Listing Validator
 * Validate marketplace listings with Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface ListingValidation {
  validationId: string;
  listingId: string;
  tokenId: string;
  collectionAddress: string;
  price: string;
  isValid: boolean;
  errors: string[];
  validatedBy: string;
  timestamp: number;
}

export function useNFTMarketplaceListingValidator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [validations, setValidations] = useState<ListingValidation[]>([]);

  const validate = async (
    listingId: string,
    tokenId: string,
    collectionAddress: string,
    price: string
  ): Promise<ListingValidation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (parseFloat(price) <= 0) {
      throw new Error('Price must be greater than zero');
    }
    
    const message = `Validate listing: ${listingId} for ${collectionAddress} #${tokenId}`;
    await signMessageAsync({ message });
    
    const validation: ListingValidation = {
      validationId: `validate-${Date.now()}`,
      listingId,
      tokenId,
      collectionAddress,
      price,
      isValid: false,
      errors: [],
      validatedBy: address,
      timestamp: Date.now(),
    };
    
    setValidations([...validations, validation]);
    return validation;
  };

  return { validate, validations, address };
}

