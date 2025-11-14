'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface MultisigProposal {
  multisigAddress: string;
  target: string;
  value: bigint;
  data: string;
  description: string;
}

export function useTokenMultisigProposalCreatorV2() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [creating, setCreating] = useState(false);

  const { data: isOwner } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'isOwner',
    args: [address],
  });

  const { data: threshold } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'getThreshold',
  });

  const createProposal = async (proposal: MultisigProposal) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    if (!isOwner) {
      throw new Error('Not a multisig owner');
    }
    setCreating(true);

    try {
      const message = `Create multisig proposal: ${proposal.description}`;
      await signMessageAsync({ message });

      await writeContract({
        address: proposal.multisigAddress as `0x${string}`,
        abi: [],
        functionName: 'submitTransaction',
        args: [proposal.target, proposal.value, proposal.data],
      });
    } finally {
      setCreating(false);
    }
  };

  const approveProposal = async (multisigAddress: string, proposalId: number) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setCreating(true);

    try {
      const message = `Approve multisig proposal: ${proposalId}`;
      await signMessageAsync({ message });

      await writeContract({
        address: multisigAddress as `0x${string}`,
        abi: [],
        functionName: 'confirmTransaction',
        args: [proposalId],
      });
    } finally {
      setCreating(false);
    }
  };

  return {
    createProposal,
    approveProposal,
    creating,
    address,
    isConnected,
    isOwner,
    threshold,
  };
}

