import { cookieStorage, createStorage } from '@wagmi/core';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { arbitrum, base, mainnet, optimism, polygon } from '@reown/appkit/networks';

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || 'demo-project-id';

if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  console.warn('⚠️ NEXT_PUBLIC_PROJECT_ID is not set. Using demo project ID. Get your project ID from https://cloud.reown.com');
}

export const networks = [mainnet, base, optimism, arbitrum, polygon];

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
});

export const wagmiConfig = wagmiAdapter.wagmiConfig;

