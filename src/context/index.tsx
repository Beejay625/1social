'use client';

import { networks, projectId, wagmiAdapter, wagmiConfig } from '@/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createAppKit } from '@reown/appkit/react';
import React, { type ReactNode } from 'react';
import { WagmiProvider, cookieToInitialState, type Config as WagmiConfig } from 'wagmi';

const queryClient = new QueryClient();

const metadata = {
  name: '1Social Dashboard',
  description: 'Share updates across Farcaster and Instagram in one place.',
  url: 'https://1social.local', // replace with your deployed origin
  icons: ['https://avatars.githubusercontent.com/u/179229932'],
};

export const appKitModal = createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks,
  defaultNetwork: networks[0],
  metadata,
  features: {
    analytics: true,
  },
});

type ContextProviderProps = {
  children: ReactNode;
  cookies: string | null;
};

function ContextProvider({ children, cookies }: ContextProviderProps) {
  const initialState = cookieToInitialState(wagmiConfig as WagmiConfig, cookies);

  return (
    <WagmiProvider config={wagmiConfig as WagmiConfig} initialState={initialState}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

export default ContextProvider;

