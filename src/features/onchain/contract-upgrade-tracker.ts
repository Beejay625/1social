'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useContractUpgradeTracker() {
  const { address, isConnected } = useAccount();
  const { data: version } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'version',
    query: { enabled: isConnected && !!address },
  });
  return { version, isConnected, address };
}
