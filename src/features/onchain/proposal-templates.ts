'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProposalTemplate {
  id: string;
  title: string;
  description: string;
  category: string;
  creator: string;
  wallet: string;
}

export function useProposalTemplates() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [templates, setTemplates] = useState<ProposalTemplate[]>([]);

  const createTemplate = async (title: string, description: string, category: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Template: ${title} ${category}`;
    await signMessageAsync({ message });
    
    const template: ProposalTemplate = {
      id: `template_${Date.now()}`,
      title,
      description,
      category,
      creator: address,
      wallet: address,
    };
    
    setTemplates([...templates, template]);
    return template;
  };

  return { createTemplate, templates, address };
}

