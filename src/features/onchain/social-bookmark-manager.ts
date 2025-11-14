'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SocialBookmark {
  id: string;
  postId: string;
  user: string;
  timestamp: number;
  tags: string[];
}

export function useSocialBookmarkManager() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [bookmarks, setBookmarks] = useState<SocialBookmark[]>([]);

  const addBookmark = async (postId: string, tags: string[] = []) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Bookmark: ${postId}${tags.length > 0 ? ` tags: ${tags.join(',')}` : ''}`;
    await signMessageAsync({ message });
    
    const bookmark: SocialBookmark = {
      id: `bookmark-${Date.now()}`,
      postId,
      user: address,
      timestamp: Date.now(),
      tags,
    };
    
    setBookmarks([...bookmarks, bookmark]);
    return bookmark;
  };

  const removeBookmark = async (postId: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Remove Bookmark: ${postId}`;
    await signMessageAsync({ message });
    
    setBookmarks(bookmarks.filter(b => b.postId !== postId || b.user !== address));
  };

  return { addBookmark, removeBookmark, bookmarks, address };
}


