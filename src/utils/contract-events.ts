export interface ContractEvent {
  name: string;
  args: Record<string, any>;
  blockNumber: bigint;
  transactionHash: string;
}

export function parseContractEvent(event: any): ContractEvent {
  return {
    name: event.eventName || 'Unknown',
    args: event.args || {},
    blockNumber: event.blockNumber || BigInt(0),
    transactionHash: event.transactionHash || '',
  };
}

