'use client';

import { useAccount } from 'wagmi';
import { useState } from 'react';

export interface AudienceSegment {
  id: string;
  name: string;
  criteria: Record<string, any>;
  size: number;
}

export function useAudienceSegments() {
  const { address } = useAccount();
  const [segments, setSegments] = useState<AudienceSegment[]>([]);

  const createSegment = async (name: string, criteria: Record<string, any>) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const segment: AudienceSegment = {
      id: `seg_${Date.now()}`,
      name,
      criteria,
      size: 0,
    };
    
    setSegments([...segments, segment]);
    return segment;
  };

  return { createSegment, segments, address };
}
