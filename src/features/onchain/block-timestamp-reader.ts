'use client';
import { useAccount, useBlockNumber } from 'wagmi';
export function useBlockTimestampReader() {
  const { address, isConnected } = useAccount();
  const { data: blockNumber } = useBlockNumber({ watch: true });
  const getTimestamp = () => {
    if (!isConnected || !address) return null;
    return { blockNumber, timestamp: Date.now() };
  };
  return { getTimestamp, blockNumber, isConnected, address };
}
