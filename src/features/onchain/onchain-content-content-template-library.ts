'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentTemplate {
  templateId: string;
  name: string;
  structure: string;
  creator: string;
  usageCount: bigint;
  timestamp: bigint;
}

export function useOnchainContentTemplateLibrary() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);
  const [templates, setTemplates] = useState<ContentTemplate[]>([]);

  const { data: templateData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getTemplates',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createTemplate = async (name: string, structure: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Create template onchain: ${name}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createTemplate',
        args: [name, structure, address],
      });
    } finally {
      setManaging(false);
    }
  };

  useEffect(() => {
    if (templateData) {
      const template = templateData as ContentTemplate;
      setTemplates(prev => {
        const filtered = prev.filter(t => t.templateId !== template.templateId);
        return [...filtered, template];
      });
    }
  }, [templateData]);

  return {
    createTemplate,
    managing,
    templates,
    address,
    isConnected,
    templateData,
  };
}

