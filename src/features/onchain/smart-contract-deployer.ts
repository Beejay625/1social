'use client';

import { useAccount, useDeployContract } from 'wagmi';
import { useState } from 'react';

export interface DeployedContract {
  address: string;
  abi: any[];
  bytecode: string;
  chainId: number;
  timestamp: number;
}

export function useSmartContractDeployer() {
  const { address, isConnected, chainId } = useAccount();
  const { deployContract } = useDeployContract();
  const [deployedContracts, setDeployedContracts] = useState<DeployedContract[]>([]);

  const deployContract = async (abi: any[], bytecode: string) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const hash = await deployContract({
      abi,
      bytecode: bytecode as `0x${string}`,
    });

    const contract: DeployedContract = {
      address: hash || '',
      abi,
      bytecode,
      chainId: chainId || 1,
      timestamp: Date.now(),
    };

    setDeployedContracts([...deployedContracts, contract]);
    return hash;
  };

  return { deployContract, deployedContracts, isConnected, address, chainId };
}

