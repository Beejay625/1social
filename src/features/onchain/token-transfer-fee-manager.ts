'use client';

/**
 * Token Transfer Fee Manager
 * Configure transfer fees with Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface TransferFeeConfig {
  tokenAddress: string;
  feePercentage: number;
  feeRecipient: string;
  enabled: boolean;
  configuredBy: string;
  timestamp: number;
}

export function useTokenTransferFeeManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [configs, setConfigs] = useState<TransferFeeConfig[]>([]);

  const configureFee = async (
    tokenAddress: string,
    feePercentage: number,
    feeRecipient: string
  ): Promise<TransferFeeConfig> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!tokenAddress.startsWith('0x') || !feeRecipient.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    if (feePercentage < 0 || feePercentage > 100) {
      throw new Error('Fee percentage must be between 0 and 100');
    }
    
    const message = `Configure transfer fee: ${tokenAddress} ${feePercentage}%`;
    await signMessageAsync({ message });
    
    const config: TransferFeeConfig = {
      tokenAddress,
      feePercentage,
      feeRecipient,
      enabled: true,
      configuredBy: address,
      timestamp: Date.now(),
    };
    
    setConfigs([...configs, config]);
    return config;
  };

  return { configureFee, configs, address };
}
