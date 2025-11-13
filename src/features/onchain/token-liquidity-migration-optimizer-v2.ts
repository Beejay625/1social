'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface MigrationPlan {
  sourcePool: string;
  targetPool: string;
  tokenA: string;
  tokenB: string;
  amountA: string;
  amountB: string;
  estimatedGas: string;
  migrationId: string;
}

export function useTokenLiquidityMigrationOptimizerV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [migrations, setMigrations] = useState<MigrationPlan[]>([]);

  const createMigrationPlan = async (
    sourcePool: string,
    targetPool: string,
    tokenA: string,
    tokenB: string,
    amountA: string,
    amountB: string
  ) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const message = `Create migration plan from ${sourcePool} to ${targetPool}`;
    await signMessageAsync({ message });
    
    const migration: MigrationPlan = {
      sourcePool,
      targetPool,
      tokenA,
      tokenB,
      amountA,
      amountB,
      estimatedGas: '0',
      migrationId: `migrate_${Date.now()}`,
    };
    
    setMigrations([...migrations, migration]);
    return migration;
  };

  return { 
    createMigrationPlan, 
    migrations, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

