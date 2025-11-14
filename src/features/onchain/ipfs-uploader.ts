'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface IPFSUpload {
  cid: string;
  fileName: string;
  size: number;
  timestamp: number;
}

export function useIPFSUploader() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [uploads, setUploads] = useState<IPFSUpload[]>([]);

  const uploadToIPFS = async (file: File) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const formData = new FormData();
    formData.append('file', file);

    const message = `IPFS Upload: ${file.name}\nTimestamp: ${Date.now()}`;
    await signMessageAsync({ message });

    const response = await fetch('/api/ipfs/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    const upload: IPFSUpload = {
      cid: data.cid,
      fileName: file.name,
      size: file.size,
      timestamp: Date.now(),
    };

    setUploads([...uploads, upload]);
    return upload;
  };

  return { uploadToIPFS, uploads, isConnected, address };
}


