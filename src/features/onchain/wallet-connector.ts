'use client';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
export function useWalletConnector() {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const connectWallet = async () => {
    if (connectors[0]) {
      await connect({ connector: connectors[0] });
    }
  };
  return { connectWallet, disconnect, isConnected, address };
}

