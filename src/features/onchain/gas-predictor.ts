'use client';
import { useAccount, useFeeData } from 'wagmi';
export function useGasPricePredictor() {
  const { address, isConnected } = useAccount();
  const { data: feeData } = useFeeData();
  const predictGasPrice = () => {
    if (!isConnected || !address) return null;
    const current = feeData?.gasPrice || 0n;
    return { current, predicted: current * 110n / 100n };
  };
  return { predictGasPrice, feeData, isConnected, address };
}

