'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentDraft {
  draftId: string;
  contentHash: string;
  creator: string;
  lastModified: bigint;
  status: 'draft' | 'published';
}

export function useOnchainContentDraftManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [saving, setSaving] = useState(false);
  const [drafts, setDrafts] = useState<ContentDraft[]>([]);

  const { data: draftData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getDrafts',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const saveDraft = async (contentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setSaving(true);

    try {
      const message = `Save draft onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'saveDraft',
        args: [contentHash, address],
      });
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    if (draftData) {
      const draft = draftData as ContentDraft;
      setDrafts(prev => {
        const filtered = prev.filter(d => d.draftId !== draft.draftId);
        return [...filtered, draft];
      });
    }
  }, [draftData]);

  return {
    saveDraft,
    saving,
    drafts,
    address,
    isConnected,
    draftData,
  };
}

