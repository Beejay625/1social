'use client';

import { useAccount, useReadContract } from 'wagmi';
import { useState, useEffect } from 'react';

export interface ERC165Support {
  contract: string;
  interfaceId: string;
  supported: boolean;
  timestamp: number;
}

export function useContractERC165Checker() {
  const { address } = useAccount();
  const [supports, setSupports] = useState<ERC165Support[]>([]);

  const { data: supportData } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'supportsInterface',
    args: ['0x80ac58cd'],
    query: { enabled: !!address },
  });

  useEffect(() => {
    if (address && supportData !== undefined) {
      const support: ERC165Support = {
        contract: '0x',
        interfaceId: '0x80ac58cd',
        supported: supportData as boolean,
        timestamp: Date.now(),
      };
      setSupports([support]);
    }
  }, [address, supportData]);

  return { supports, address };
}


