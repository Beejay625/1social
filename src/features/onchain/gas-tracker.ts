'use client';
import { useFeeData } from 'wagmi';
export function useGasTracker() {
  const { data: feeData } = useFeeData();
  const trackGasUsage = () => {
    return {
      gasPrice: feeData?.gasPrice,
      maxFeePerGas: feeData?.maxFeePerGas,
      maxPriorityFeePerGas: feeData?.maxPriorityFeePerGas,
    };
  };
  return { trackGasUsage, feeData };
}
