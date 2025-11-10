'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useVestingSchedule() {
  const { address, isConnected } = useAccount();
  const { data: vesting } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getVesting',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });
  return { vesting, isConnected, address };
}

