'use client';
import { useFeeData } from 'wagmi';
export function useGasPriceMonitor() {
  const { data: feeData } = useFeeData();
  const getCurrentGasPrice = () => {
    return feeData?.gasPrice || 0n;
  };
  return { getCurrentGasPrice, feeData };
}
