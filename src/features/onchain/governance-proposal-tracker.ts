'use client';
import { useAccount, useReadContract, useWatchContractEvent } from 'wagmi';
export function useGovernanceProposalTracker() {
  const { address, isConnected } = useAccount();
  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'ProposalCreated',
    onLogs: (logs) => console.log('Proposals:', logs),
    enabled: isConnected && !!address,
  });
  return { isConnected, address };
}
