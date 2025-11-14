import { SOCIAL_MEDIA_CONTRACT_ADDRESS } from '@/constants/contractAddress';

export function getContractAddress(): string {
  return SOCIAL_MEDIA_CONTRACT_ADDRESS;
}

export function isValidContractAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

export function formatContractAddress(address: string): string {
  if (!isValidContractAddress(address)) {
    return address;
  }
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}


