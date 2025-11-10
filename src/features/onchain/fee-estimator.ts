'use client';
import { useAccount, useEstimateGas, useFeeData } from 'wagmi';
export function useTransactionFeeEstimator() {
  const { address, isConnected } = useAccount();
  const { data: feeData } = useFeeData();
  const estimateFee = async (to: string, value: bigint) => {
    if (!isConnected || !address) throw new Error('Reown wallet not connected');
    return { estimatedFee: feeData?.gasPrice || 0n, to, value };
  };
  return { estimateFee, feeData, isConnected, address };
}

