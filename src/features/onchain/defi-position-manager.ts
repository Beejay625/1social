'use client';
import { useAccount, useReadContract, useSignMessage } from 'wagmi';
export function useDeFiPositionManager() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { data: position } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getPosition',
    args: address ? [address] : undefined,
    query: { enabled: isConnected && !!address },
  });
  return { position, isConnected, address };
}
