'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ContractTemplate {
  name: string;
  type: string;
  code: string;
  wallet: string;
  timestamp: number;
}

export function useContractTemplateGenerator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [templates, setTemplates] = useState<ContractTemplate[]>([]);

  const generateTemplate = async (name: string, type: string, code: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Generate Template: ${name} (${type})`;
    await signMessageAsync({ message });
    
    const template: ContractTemplate = {
      name,
      type,
      code,
      wallet: address,
      timestamp: Date.now(),
    };
    
    setTemplates([...templates, template]);
    return template;
  };

  return { generateTemplate, templates, address };
}

