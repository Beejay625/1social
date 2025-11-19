'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface AutomationRule {
  ruleId: string;
  trigger: string;
  action: string;
  conditions: string[];
  creator: string;
  active: boolean;
  timestamp: bigint;
}

export function useOnchainContentAutomationRule() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);
  const [rules, setRules] = useState<AutomationRule[]>([]);

  const { data: ruleData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getRules',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createRule = async (trigger: string, action: string, conditions: string[]) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Create automation rule onchain: ${trigger}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createRule',
        args: [trigger, action, conditions, address],
      });
    } finally {
      setManaging(false);
    }
  };

  useEffect(() => {
    if (ruleData) {
      const rule = ruleData as AutomationRule;
      setRules(prev => {
        const filtered = prev.filter(r => r.ruleId !== rule.ruleId);
        return [...filtered, rule];
      });
    }
  }, [ruleData]);

  return {
    createRule,
    managing,
    rules,
    address,
    isConnected,
    ruleData,
  };
}

