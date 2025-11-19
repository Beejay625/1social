'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ContentWidget {
  widgetId: string;
  widgetType: string;
  config: string;
  creator: string;
  timestamp: bigint;
}

export function useOnchainContentWidgetManager() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [managing, setManaging] = useState(false);
  const [widgets, setWidgets] = useState<ContentWidget[]>([]);

  const { data: widgetData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getWidgets',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const createWidget = async (widgetType: string, config: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setManaging(true);

    try {
      const message = `Create widget onchain: ${widgetType}`;
      await signMessageAsync({ message });

      await writeContract({
        address: '0x' as `0x${string}`,
        abi: [],
        functionName: 'createWidget',
        args: [widgetType, config, address],
      });
    } finally {
      setManaging(false);
    }
  };

  useEffect(() => {
    if (widgetData) {
      const widget = widgetData as ContentWidget;
      setWidgets(prev => {
        const filtered = prev.filter(w => w.widgetId !== widget.widgetId);
        return [...filtered, widget];
      });
    }
  }, [widgetData]);

  return {
    createWidget,
    managing,
    widgets,
    address,
    isConnected,
    widgetData,
  };
}

