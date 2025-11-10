'use client';

import { useAccount, useConnect } from 'wagmi';
import { useState } from 'react';

export interface WalletStatus {
  connected: boolean;
  address: string | undefined;
  chainId: number | undefined;
}

export function useWalletConnectivity() {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors } = useConnect();
  const [status, setStatus] = useState<WalletStatus>({
    connected: isConnected,
    address,
    chainId,
  });

  const connectWallet = async () => {
    if (connectors[0]) {
      await connect({ connector: connectors[0] });
      setStatus({
        connected: true,
        address,
        chainId,
      });
    }
  };

  return { connectWallet, status, isConnected, address };
}

