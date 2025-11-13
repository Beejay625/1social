'use client';

import { useAccount, useSignMessage, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';

export interface QuorumInfo {
  proposalId: string;
  requiredQuorum: number;
  currentVotes: number;
  quorumMet: boolean;
  quorumPercentage: number;
}

export function useTokenGovernanceQuorumTrackerV2() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash });
  const [quorumInfos, setQuorumInfos] = useState<QuorumInfo[]>([]);

  const trackQuorum = async (proposalId: string, requiredQuorum: number, currentVotes: number) => {
    if (!address || !isConnected) throw new Error('Reown wallet not connected');
    
    const quorumMet = currentVotes >= requiredQuorum;
    const quorumPercentage = (currentVotes / requiredQuorum) * 100;
    
    const message = `Track quorum for proposal ${proposalId}: ${currentVotes}/${requiredQuorum}`;
    await signMessageAsync({ message });
    
    const quorumInfo: QuorumInfo = {
      proposalId,
      requiredQuorum,
      currentVotes,
      quorumMet,
      quorumPercentage,
    };
    
    setQuorumInfos([...quorumInfos, quorumInfo]);
    return quorumInfo;
  };

  return { 
    trackQuorum, 
    quorumInfos, 
    address, 
    isConnected,
    hash,
    isPending,
    isConfirming,
    isConfirmed
  };
}

