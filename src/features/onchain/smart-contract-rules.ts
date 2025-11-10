'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';

export interface AutomationRule {
  id: string;
  trigger: string;
  action: string;
  active: boolean;
}

export function useSmartContractRules() {
  const { address } = useAccount();
  const [rules, setRules] = useState<AutomationRule[]>([]);

  const createRule = async (trigger: string, action: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const rule: AutomationRule = {
      id: `rule_${Date.now()}`,
      trigger,
      action,
      active: true,
    };
    
    setRules([...rules, rule]);
    return rule;
  };

  return { createRule, rules, address };
}
