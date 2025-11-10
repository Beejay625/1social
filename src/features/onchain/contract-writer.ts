'use client';

import { useAccount, useWriteContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface WriteOperation {
  address: string;
  functionName: string;
  args: any[];
  txHash: string;
  wallet: string;
}

export function useContractWriter() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [writes, setWrites] = useState<WriteOperation[]>([]);

  const writeToContract = async (contractAddress: string, functionName: string, args: any[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Write: ${functionName} to ${contractAddress}`;
    await signMessageAsync({ message });
    
    const txHash = await writeContract({
      address: contractAddress as `0x${string}`,
      abi: [],
      functionName,
      args,
    });

    const write: WriteOperation = {
      address: contractAddress,
      functionName,
      args,
      txHash: txHash || '',
      wallet: address,
    };
    
    setWrites([...writes, write]);
    return write;
  };

  return { writeToContract, writes, address };
}
