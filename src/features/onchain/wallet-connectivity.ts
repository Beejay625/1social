'use client';

import { useAccount, useDisconnect, useConnect } from 'wagmi';
import { useState } from 'react';

export interface ConnectionStatus {
  connected: boolean;
  address: string | undefined;
  chainId: number | undefined;
  connector: string | undefined;
}

export function useWalletConnectivity() {
  const { address, isConnected, chainId, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect, connectors } = useConnect();
  const [status, setStatus] = useState<ConnectionStatus>({
    connected: isConnected,
    address,
    chainId,
    connector: connector?.name,
  });

  const connectWallet = async () => {
    if (connectors[0]) {
      await connect({ connector: connectors[0] });
    }
  };

  const disconnectWallet = async () => {
    await disconnect();
    setStatus({
      connected: false,
      address: undefined,
      chainId: undefined,
      connector: undefined,
    });
  };

  return { connectWallet, disconnectWallet, status, isConnected, address };
}
