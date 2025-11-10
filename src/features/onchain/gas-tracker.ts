'use client';
import { useFeeData, useAccount } from 'wagmi';
export function useGasTracker() {
  const { data: feeData } = useFeeData();
  const { chainId } = useAccount();
  const trackGasUsage = () => {
    return {
      gasPrice: feeData?.gasPrice,
      maxFeePerGas: feeData?.maxFeePerGas,
      chainId,
    };
  };
  return { trackGasUsage, feeData, chainId };
}
