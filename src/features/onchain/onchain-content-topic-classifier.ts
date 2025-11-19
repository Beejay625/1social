'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentTopic {
  contentHash: string;
  topic: string;
  confidence: bigint;
  classifier: string;
  timestamp: bigint;
}

export function useOnchainContentTopicClassifier() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [classifying, setClassifying] = useState(false);
  const [topics, setTopics] = useState<ContentTopic[]>([]);

  const { data: topicData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getTopics',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const classifyContent = async (contentHash: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setClassifying(true);

    try {
      const message = `Classify content onchain: ${contentHash}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'classifyContent',
        args: [contentHash, address],
      });
    } finally {
      setClassifying(false);
    }
  };

  useEffect(() => {
    if (topicData) {
      const topic = topicData as ContentTopic;
      setTopics(prev => {
        const filtered = prev.filter(t => t.contentHash !== topic.contentHash || t.topic !== topic.topic);
        return [...filtered, topic];
      });
    }
  }, [topicData]);

  return {
    classifyContent,
    classifying,
    topics,
    address,
    isConnected,
    topicData,
  };
}

