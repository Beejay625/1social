'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface SocialGraphNode {
  address: string;
  connections: string[];
  protocols: string[];
  reputation: number;
}

export function useSocialGraphBuilder() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [graph, setGraph] = useState<SocialGraphNode[]>([]);

  const addConnection = async (targetAddress: string, protocol: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Add Connection: ${targetAddress} on ${protocol}`;
    await signMessageAsync({ message });
    
    const node = graph.find(n => n.address === address);
    if (node) {
      if (!node.connections.includes(targetAddress)) {
        node.connections.push(targetAddress);
      }
      if (!node.protocols.includes(protocol)) {
        node.protocols.push(protocol);
      }
      setGraph([...graph]);
    } else {
      const newNode: SocialGraphNode = {
        address,
        connections: [targetAddress],
        protocols: [protocol],
        reputation: 0,
      };
      setGraph([...graph, newNode]);
    }
    
    return graph.find(n => n.address === address);
  };

  return { addConnection, graph, address };
}

