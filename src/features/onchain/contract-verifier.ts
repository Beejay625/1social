'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useSmartContractVerifier() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const verifyContract = async (contractAddress: string, sourceCode: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `Verify:${contractAddress}:${sourceCode.substring(0, 50)}`;
    await signMessageAsync({ message });
    return { contractAddress, verifiedBy: address };
  };
  return { verifyContract, isConnected, address };
}

