'use client';
import { useAccount } from 'wagmi';
export function useSmartContractWebhooks() {
  const { address } = useAccount();
  const registerWebhook = async (event: string, url: string) => {
    if (!address) throw new Error('Wallet not connected');
    return { event, url, registeredBy: address };
  };
  return { registerWebhook };
}
