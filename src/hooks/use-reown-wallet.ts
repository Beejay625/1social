'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';

export function useReownWallet() {
  const { address, isConnected, connector } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();

  return {
    address,
    isConnected,
    connector,
    connect,
    connectors,
    disconnect,
  };
}

