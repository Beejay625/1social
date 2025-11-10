'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BytecodeVerification {
  contract: string;
  bytecode: string;
  verified: boolean;
  signature: string;
}

export function useContractBytecodeVerifier() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [verifications, setVerifications] = useState<BytecodeVerification[]>([]);

  const verifyBytecode = async (contract: string, bytecode: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Verify: ${contract} ${bytecode.slice(0, 10)}`;
    const signature = await signMessageAsync({ message });

    const verification: BytecodeVerification = {
      contract,
      bytecode,
      verified: true,
      signature,
    };

    setVerifications([...verifications, verification]);
    return verification;
  };

  return { verifyBytecode, verifications, address };
}

