export function handleContractError(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === 'string') {
    return error;
  }
  return 'An unknown error occurred';
}

export function isWalletError(error: unknown): boolean {
  if (error instanceof Error) {
    return error.message.includes('wallet') || error.message.includes('Reown');
  }
  return false;
}

