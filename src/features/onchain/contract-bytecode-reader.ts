'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface BytecodeInfo {
  address: string;
  bytecode: string;
  length: number;
  timestamp: number;
}

export function useContractBytecodeReader() {
  const { address } = useAccount();
  const [bytecodes, setBytecodes] = useState<BytecodeInfo[]>([]);

  const { data: codeData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'code',
    args: [],
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (address && codeData) {
      const bytecode: BytecodeInfo = {
        address: '0x',
        bytecode: codeData as string || '0x',
        length: (codeData as string)?.length || 0,
        timestamp: Date.now(),
      };
      setBytecodes([bytecode]);
    }
  }, [address, codeData]);

  return { bytecodes, address };
}

