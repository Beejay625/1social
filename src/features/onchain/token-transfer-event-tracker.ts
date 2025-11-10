'use client';
import { useAccount, useWatchContractEvent } from 'wagmi';
export function useTokenTransferEventTracker() {
  const { address, isConnected } = useAccount();
  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'Transfer',
    onLogs: (logs) => console.log('Transfers:', logs),
    enabled: isConnected && !!address,
  });
  return { isConnected, address };
}
