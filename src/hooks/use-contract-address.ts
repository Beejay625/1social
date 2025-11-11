'use client';

import { SOCIAL_MEDIA_CONTRACT_ADDRESS } from '@/constants/contractAddress';
import { useAccount } from 'wagmi';

export function useContractAddress() {
  const { address } = useAccount();
  
  return {
    contractAddress: SOCIAL_MEDIA_CONTRACT_ADDRESS,
    userAddress: address,
    isConnected: !!address,
  };
}

