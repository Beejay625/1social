'use client';

/**
 * NFT Batch Transfer Validator
 * Validate batch NFT transfers with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TransferValidation {
  validationId: string;
  collectionAddress: string;
  recipients: string[];
  tokenIds: string[];
  valid: boolean;
  validatedBy: string;
  timestamp: number;
}

export function useNFTBatchTransferValidator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [validations, setValidations] = useState<TransferValidation[]>([]);

  const validateBatchTransfer = async (
    collectionAddress: string,
    recipients: string[],
    tokenIds: string[]
  ): Promise<TransferValidation> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!collectionAddress.startsWith('0x')) {
      throw new Error('Invalid collection address format');
    }
    if (recipients.length !== tokenIds.length) {
      throw new Error('Recipients and tokenIds arrays must have same length');
    }
    
    const message = `Validate batch transfer: ${collectionAddress} ${tokenIds.length} NFTs`;
    await signMessageAsync({ message });
    
    const valid = recipients.every(r => r.startsWith('0x')) && tokenIds.length > 0;
    
    const validation: TransferValidation = {
      validationId: `validate-${Date.now()}`,
      collectionAddress,
      recipients,
      tokenIds,
      valid,
      validatedBy: address,
      timestamp: Date.now(),
    };
    
    setValidations([...validations, validation]);
    return validation;
  };

  return { validateBatchTransfer, validations, address };
}
