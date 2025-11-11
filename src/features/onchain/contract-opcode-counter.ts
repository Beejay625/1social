'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface OpcodeCount {
  contract: string;
  opcode: string;
  count: number;
  wallet: string;
  timestamp: number;
}

export function useContractOpcodeCounter() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [counts, setCounts] = useState<OpcodeCount[]>([]);

  const countOpcode = async (contract: string, opcode: string, count: number) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Count Opcode: ${opcode} in ${contract}`;
    await signMessageAsync({ message });
    
    const opcodeCount: OpcodeCount = {
      contract,
      opcode,
      count,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setCounts([...counts, opcodeCount]);
    return opcodeCount;
  };

  return { countOpcode, counts, address };
}

