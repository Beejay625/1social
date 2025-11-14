'use client';

import { formatTimestamp } from '@/utils/timestamp-formatter';
import { formatNumber } from '@/utils/numbers';

interface PostCardProps {
  id: bigint;
  author: string;
  content: string;
  timestamp: bigint;
  likes: bigint;
  comments: bigint;
}

export function PostCard({ id, author, content, timestamp, likes, comments }: PostCardProps) {
  return (
    <div className="border rounded-lg p-4">
      <div className="text-sm text-gray-600">{author}</div>
      <div className="mt-2">{content}</div>
      <div className="mt-4 flex gap-4 text-sm text-gray-500">
        <span>{formatNumber(likes)} likes</span>
        <span>{formatNumber(comments)} comments</span>
        <span>{formatTimestamp(timestamp)}</span>
      </div>
    </div>
  );
}


