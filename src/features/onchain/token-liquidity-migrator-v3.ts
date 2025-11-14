'use client';

/**
 * Token Liquidity Migrator V3
 * Migrate liquidity between pools with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface LiquidityMigration {
  migrationId: string;
  sourcePool: string;
  targetPool: string;
  lpTokenAmount: string;
  migratedBy: string;
  timestamp: number;
}

export function useTokenLiquidityMigratorV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContractAsync } = useWriteContract();
  const [migrations, setMigrations] = useState<LiquidityMigration[]>([]);

  const migrateLiquidity = async (
    sourcePool: string,
    targetPool: string,
    lpTokenAmount: string
  ): Promise<LiquidityMigration> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!sourcePool.startsWith('0x') || !targetPool.startsWith('0x')) {
      throw new Error('Invalid pool address format');
    }
    
    const message = `Migrate liquidity V3: ${sourcePool} to ${targetPool} amount ${lpTokenAmount}`;
    await signMessageAsync({ message });
    
    const migration: LiquidityMigration = {
      migrationId: `migrate-v3-${Date.now()}`,
      sourcePool,
      targetPool,
      lpTokenAmount,
      migratedBy: address,
      timestamp: Date.now(),
    };
    
    setMigrations([...migrations, migration]);
    return migration;
  };

  return { migrateLiquidity, migrations, address };
}
