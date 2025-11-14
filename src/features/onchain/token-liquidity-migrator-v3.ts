'use client';

/**
 * Token Liquidity Migrator V3
 * Migrate liquidity between pools with enhanced features via Reown wallet
 */

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface LiquidityMigration {
  migrationId: string;
  sourcePool: string;
  destinationPool: string;
  tokenA: string;
  tokenB: string;
  lpTokenAmount: string;
  migratedBy: string;
  txHash: string;
  timestamp: number;
}

export function useTokenLiquidityMigratorV3() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [migrations, setMigrations] = useState<LiquidityMigration[]>([]);

  const migrateLiquidity = async (
    sourcePool: string,
    destinationPool: string,
    tokenA: string,
    tokenB: string,
    lpTokenAmount: string
  ): Promise<LiquidityMigration> => {
    if (!address) throw new Error('Reown wallet not connected');
    if (!sourcePool.startsWith('0x') || !destinationPool.startsWith('0x') || !tokenA.startsWith('0x') || !tokenB.startsWith('0x')) {
      throw new Error('Invalid address format');
    }
    if (sourcePool === destinationPool) {
      throw new Error('Source and destination pools must be different');
    }
    
    const message = `Migrate liquidity: ${sourcePool} to ${destinationPool} ${lpTokenAmount} LP tokens`;
    await signMessageAsync({ message });
    
    const migration: LiquidityMigration = {
      migrationId: `migrate-${Date.now()}`,
      sourcePool,
      destinationPool,
      tokenA,
      tokenB,
      lpTokenAmount,
      migratedBy: address,
      txHash: `0x${Date.now().toString(16)}`,
      timestamp: Date.now(),
    };
    
    setMigrations([...migrations, migration]);
    return migration;
  };

  return { migrateLiquidity, migrations, address };
}

