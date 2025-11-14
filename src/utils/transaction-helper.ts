export function getTransactionUrl(txHash: string, chainId: number): string {
  const explorers: Record<number, string> = {
    1: 'https://etherscan.io/tx/',
    8453: 'https://basescan.org/tx/',
    10: 'https://optimistic.etherscan.io/tx/',
    42161: 'https://arbiscan.io/tx/',
    137: 'https://polygonscan.com/tx/',
  };
  
  const baseUrl = explorers[chainId] || explorers[1];
  return `${baseUrl}${txHash}`;
}

export function isValidTransactionHash(hash: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(hash);
}


