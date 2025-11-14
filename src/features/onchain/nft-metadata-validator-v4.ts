'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MetadataValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
  score: number;
}

export interface Metadata {
  name: string;
  description: string;
  image: string;
  attributes: Array<{ trait_type: string; value: string | number }>;
}

export function useNFTMetadataValidatorV4() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [validating, setValidating] = useState(false);
  const [result, setResult] = useState<MetadataValidationResult | null>(null);

  const { data: metadata } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'tokenURI',
    args: [BigInt(0)],
  });

  const validateMetadata = async (metadata: Metadata): Promise<MetadataValidationResult> => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setValidating(true);

    try {
      const message = `Validate metadata: ${metadata.name}`;
      await signMessageAsync({ message });

      const errors: string[] = [];
      const warnings: string[] = [];
      let score = 100;

      // Validate required fields
      if (!metadata.name || metadata.name.trim().length === 0) {
        errors.push('Name is required');
        score -= 30;
      }

      if (!metadata.description || metadata.description.trim().length === 0) {
        warnings.push('Description is recommended');
        score -= 10;
      }

      if (!metadata.image || !isValidURL(metadata.image)) {
        errors.push('Valid image URL is required');
        score -= 40;
      }

      // Validate attributes
      if (!metadata.attributes || metadata.attributes.length === 0) {
        warnings.push('Attributes are recommended for rarity tracking');
        score -= 10;
      }

      const validationResult: MetadataValidationResult = {
        valid: errors.length === 0,
        errors,
        warnings,
        score,
      };

      setResult(validationResult);
      return validationResult;
    } finally {
      setValidating(false);
    }
  };

  const isValidURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return {
    validateMetadata,
    validating,
    result,
    address,
    isConnected,
    metadata,
  };
}

