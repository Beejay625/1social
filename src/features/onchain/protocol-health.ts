'use client';
import { useAccount, useReadContract } from 'wagmi';
export interface ProtocolStatus {
  chainId: number;
  healthy: boolean;
  lastCheck: number;
}
export function useProtocolHealthMonitor() {
  const { chainId } = useAccount();
  const checkHealth = async () => {
    const status: ProtocolStatus = {
      chainId: chainId || 1,
      healthy: true,
      lastCheck: Date.now(),
    };
    return status;
  };
  return { checkHealth };
}

