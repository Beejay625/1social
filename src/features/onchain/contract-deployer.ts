'use client';
import { useAccount, useDeployContract } from 'wagmi';
export function useContractDeployer() {
  const { address, isConnected } = useAccount();
  const { deployContractAsync } = useDeployContract();
  const deploy = async (bytecode: string, abi: any) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return await deployContractAsync({
      abi,
      bytecode: bytecode as `0x${string}`,
    });
  };
  return { deploy, isConnected, address };
}


