'use client';
import { useAccount, useSignMessage } from 'wagmi';
export function useContractBytecodeVerifier() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const verifyBytecode = async (contractAddress: string, bytecode: string) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    const message = `VerifyBytecode:${contractAddress}:${bytecode.substring(0, 20)}`;
    await signMessageAsync({ message });
    return { contractAddress, verifiedBy: address };
  };
  return { verifyBytecode, isConnected, address };
}
