'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { useState } from 'react';

export interface Connection {
  address: string;
  chainId: number;
  connected: boolean;
  timestamp: number;
}

export function useWalletConnector() {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const [connections, setConnections] = useState<Connection[]>([]);

  const connectWallet = async () => {
    if (connectors[0]) {
      await connect({ connector: connectors[0] });
      const connection: Connection = {
        address: address || '',
        chainId: chainId || 0,
        connected: true,
        timestamp: Date.now(),
      };
      setConnections([...connections, connection]);
    }
  };

  const disconnectWallet = async () => {
    await disconnect();
    setConnections([]);
  };

  return { connectWallet, disconnectWallet, connections, address, isConnected };
}
