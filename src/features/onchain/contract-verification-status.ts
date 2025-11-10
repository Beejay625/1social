'use client';
import { useAccount, useReadContract } from 'wagmi';
export function useContractVerificationStatus() {
  const { address, isConnected } = useAccount();
  const { data: verified } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getCode',
    query: { enabled: isConnected && !!address },
  });
  return { verified: !!verified, isConnected, address };
}
