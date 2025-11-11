'use client';

import { useReownWallet } from '@/hooks/use-reown-wallet';
import { truncateAddress } from '@/utils/post-formatter';

export function WalletStatus() {
  const { address, isConnected } = useReownWallet();

  if (!isConnected) {
    return <div className="text-sm text-gray-500">Wallet not connected</div>;
  }

  return (
    <div className="text-sm text-gray-600">
      Connected: {truncateAddress(address || '')}
    </div>
  );
}

