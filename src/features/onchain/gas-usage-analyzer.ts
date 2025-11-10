'use client';
import { useAccount, useFeeData } from 'wagmi';
export function useGasUsageAnalyzer() {
  const { address, isConnected } = useAccount();
  const { data: feeData } = useFeeData();
  const analyzeGasUsage = () => {
    if (!isConnected || !address) return null;
    return { gasPrice: feeData?.gasPrice, maxFee: feeData?.maxFeePerGas };
  };
  return { analyzeGasUsage, feeData, isConnected, address };
}
