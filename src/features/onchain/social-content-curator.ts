'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface CuratedContent {
  id: string;
  postId: string;
  curator: string;
  category: string;
  featured: boolean;
  timestamp: number;
}

export function useSocialContentCurator() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [curated, setCurated] = useState<CuratedContent[]>([]);

  const curateContent = async (postId: string, category: string, featured: boolean = false) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Curate Content: ${postId} in ${category}${featured ? ' (featured)' : ''}`;
    await signMessageAsync({ message });
    
    const curatedContent: CuratedContent = {
      id: `curated-${Date.now()}`,
      postId,
      curator: address,
      category,
      featured,
      timestamp: Date.now(),
    };
    
    setCurated([...curated, curatedContent]);
    return curatedContent;
  };

  return { curateContent, curated, address };
}

