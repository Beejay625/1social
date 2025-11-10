'use client';

import { useAccount, useWriteContract, useReadContract } from 'wagmi';
import { useState } from 'react';
import { parseEther } from 'viem';

export interface StakingPosition {
  amount: bigint;
  lockPeriod: number;
  rewards: bigint;
  startTime: number;
}

export function useTokenStaking() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const [positions, setPositions] = useState<StakingPosition[]>([]);

  const { data: stakedBalance } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const stakeTokens = async (amount: string, lockPeriod: number) => {
    if (!isConnected || !address) {
      throw new Error('Wallet not connected');
    }

    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'stake',
      args: [parseEther(amount), lockPeriod],
    });

    const position: StakingPosition = {
      amount: parseEther(amount),
      lockPeriod,
      rewards: BigInt(0),
      startTime: Date.now(),
    };

    setPositions([...positions, position]);
    return txHash;
  };

  return { stakeTokens, positions, stakedBalance, isConnected, address };
}

