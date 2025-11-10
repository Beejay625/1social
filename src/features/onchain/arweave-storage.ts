'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ArweaveUpload {
  txId: string;
  contentHash: string;
  timestamp: number;
  permanent: boolean;
}

export function useArweaveStorage() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [uploads, setUploads] = useState<ArweaveUpload[]>([]);

  const storeOnArweave = async (content: string) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const message = `Arweave Storage: ${content.substring(0, 50)}\nTimestamp: ${Date.now()}`;
    await signMessageAsync({ message });

    const response = await fetch('/api/arweave/store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content }),
    });

    const data = await response.json();
    const upload: ArweaveUpload = {
      txId: data.txId,
      contentHash: data.hash,
      timestamp: Date.now(),
      permanent: true,
    };

    setUploads([...uploads, upload]);
    return upload;
  };

  return { storeOnArweave, uploads, isConnected, address };
}

