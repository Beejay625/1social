'use client';
import { useAccount, useDeployContract } from 'wagmi';
export function useContractFactory() {
  const { address, isConnected } = useAccount();
  const { deployContractAsync } = useDeployContract();
  const deployViaFactory = async (bytecode: string, abi: any) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return await deployContractAsync({
      abi,
      bytecode: bytecode as `0x${string}`,
    });
  };
  return { deployViaFactory, isConnected, address };
}
