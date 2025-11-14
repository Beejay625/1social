'use client';

import { useAccount, useWriteContract } from 'wagmi';
import { useState } from 'react';

export interface MerkleProof {
  leaf: string;
  proof: string[];
  root: string;
  verified: boolean;
}

export function useMerkleVerification() {
  const { address } = useAccount();
  const { writeContract } = useWriteContract();
  const [proofs, setProofs] = useState<MerkleProof[]>([]);

  const verifyProof = async (leaf: string, proof: string[], root: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const txHash = await writeContract({
      address: '0x' as `0x${string}`,
      abi: [],
      functionName: 'verify',
      args: [leaf, proof, root],
    });

    const merkleProof: MerkleProof = {
      leaf,
      proof,
      root,
      verified: true,
    };

    setProofs([...proofs, merkleProof]);
    return txHash;
  };

  return { verifyProof, proofs, address };
}


