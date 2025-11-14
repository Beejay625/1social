'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ZKProof {
  id: string;
  circuit: string;
  publicInputs: string[];
  proof: string;
  verified: boolean;
}

export function useZKProofs() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [proofs, setProofs] = useState<ZKProof[]>([]);

  const generateProof = async (circuit: string, publicInputs: string[]) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `ZK Proof: ${circuit} ${publicInputs.join(',')}`;
    const signature = await signMessageAsync({ message });

    const proof: ZKProof = {
      id: signature,
      circuit,
      publicInputs,
      proof: `proof_${Date.now()}`,
      verified: false,
    };

    setProofs([...proofs, proof]);
    return proof;
  };

  return { generateProof, proofs, address };
}


