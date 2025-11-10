'use client';

import { useAccount, useWatchContractEvent } from 'wagmi';
import { useState } from 'react';

export interface Deployment {
  address: string;
  deployer: string;
  bytecode: string;
  timestamp: number;
}

export function useContractDeploymentTracker() {
  const { address } = useAccount();
  const [deployments, setDeployments] = useState<Deployment[]>([]);

  useWatchContractEvent({
    address: '0x' as `0x${string}`,
    abi: [],
    eventName: 'ContractCreated',
    onLogs(logs) {
      const deployment: Deployment = {
        address: logs[0]?.args?.contract || '',
        deployer: logs[0]?.args?.deployer || '',
        bytecode: '',
        timestamp: Date.now(),
      };
      setDeployments([...deployments, deployment]);
    },
  });

  return { deployments, address };
}

