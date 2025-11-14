export function estimateGasCost(gasPrice: bigint, gasLimit: bigint): bigint {
  return gasPrice * gasLimit;
}

export function formatGasCost(cost: bigint): string {
  const eth = Number(cost) / 1e18;
  return `${eth.toFixed(6)} ETH`;
}


