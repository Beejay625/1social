'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentBookmark {
  contentHash: string;
  walletAddress: string;
  timestamp: bigint;
  category?: string;
}

export function useOnchainContentBookmarkManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [bookmarking, setBookmarking] = useState(false);
  const [bookmarks, setBookmarks] = useState<ContentBookmark[]>([]);

  const { data: bookmarkData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getBookmarks',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const bookmarkContent = async (contentHash: string, category?: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setBookmarking(true);

    try {
      const message = `Bookmark content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'bookmarkContent',
        args: [contentHash, address, category || ''],
      });
    } finally {
      setBookmarking(false);
    }
  };

  const removeBookmark = async (contentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setBookmarking(true);

    try {
      const message = `Remove bookmark onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'removeBookmark',
        args: [contentHash, address],
      });
    } finally {
      setBookmarking(false);
    }
  };

  useEffect(() => {
    if (bookmarkData) {
      const bookmark = bookmarkData as ContentBookmark;
      setBookmarks(prev => {
        const filtered = prev.filter(b => b.contentHash !== bookmark.contentHash);
        return [...filtered, bookmark];
      });
    }
  }, [bookmarkData]);

  return {
    bookmarkContent,
    removeBookmark,
    bookmarking,
    bookmarks,
    address,
    isConnected,
    bookmarkData,
  };
}

