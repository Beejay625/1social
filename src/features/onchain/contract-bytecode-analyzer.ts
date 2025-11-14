'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BytecodeAnalysis {
  contract: string;
  size: number;
  opcodes: number;
  wallet: string;
  timestamp: number;
}

export function useContractBytecodeAnalyzer() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [analyses, setAnalyses] = useState<BytecodeAnalysis[]>([]);

  const analyzeBytecode = async (contract: string, bytecode: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Analyze Bytecode: ${contract}`;
    await signMessageAsync({ message });
    
    const analysis: BytecodeAnalysis = {
      contract,
      size: bytecode.length,
      opcodes: bytecode.length / 2,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setAnalyses([...analyses, analysis]);
    return analysis;
  };

  return { analyzeBytecode, analyses, address };
}


