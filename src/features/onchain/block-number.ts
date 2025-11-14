'use client';
import { useBlockNumber } from 'wagmi';
export function useBlockNumberTracker() {
  const { data: blockNumber } = useBlockNumber({ watch: true });
  return { blockNumber };
}


