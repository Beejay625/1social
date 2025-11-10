'use client';
import { useAccount, useWatchContractEvent } from 'wagmi';
export function useContractEventListener() {
  const { address, isConnected } = useAccount();
  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'AllEvents',
    onLogs: (logs) => console.log('Contract events:', logs),
    enabled: isConnected && !!address,
  });
  return { isConnected, address };
}
