'use client';
import { useAccount, useSignMessage } from 'wagmi';
export interface AttributionModel {
  type: 'first-touch' | 'last-touch' | 'linear';
  conversions: number;
}
export function useContentAttribution() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const trackAttribution = async (contentId: string, model: AttributionModel) => {
    if (!address) throw new Error('Wallet not connected');
    const message = `Attribution:${contentId}:${model.type}`;
    await signMessageAsync({ message });
    return { contentId, model, tracked: true };
  };
  return { trackAttribution };
}

