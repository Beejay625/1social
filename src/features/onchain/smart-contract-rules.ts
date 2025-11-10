'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface AutomationRule {
  id: string;
  trigger: string;
  action: string;
  enabled: boolean;
  conditions: string[];
}

export function useSmartContractRules() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [rules, setRules] = useState<AutomationRule[]>([]);

  const createRule = async (trigger: string, action: string, conditions: string[]) => {
    if (!isConnected || !address) {
      throw new Error('Reown wallet not connected');
    }

    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'createRule',
      args: [trigger, action, conditions],
    });

    const rule: AutomationRule = {
      id: txHash || '',
      trigger,
      action,
      enabled: true,
      conditions,
    };

    setRules([...rules, rule]);
    return txHash;
  };

  return { createRule, rules, isConnected, address };
}
