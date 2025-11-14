'use client';

import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';
import { parseAbi } from 'viem';

const SOCIAL_CONTRACT_ABI = parseAbi([
  'constructor()',
  'function createPost(string memory content) public returns (uint256)',
  'function addComment(uint256 postId, string memory content) public returns (uint256)',
  'function addReaction(uint256 postId, string memory reactionType) public returns (uint256)',
  'function updateProfile(string memory name, string memory bio, string memory avatar) public',
  'function getPost(uint256 postId) public view returns (tuple(uint256 id, address author, string content, uint256 timestamp, uint256 likes, uint256 comments))',
  'function getTotalPosts() public view returns (uint256)',
  'event PostCreated(uint256 indexed postId, address indexed author, string content, uint256 timestamp)',
]);

export interface DeployedContract {
  address: string;
  deployer: string;
  timestamp: number;
  transactionHash: string;
}

export function useSocialContractDeployer() {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });
  const [deployedContract, setDeployedContract] = useState<DeployedContract | null>(null);

  const deployContract = async (contractAddress?: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    // For demo purposes, we'll use a placeholder address
    // In production, this would deploy the contract
    const contract: DeployedContract = {
      address: contractAddress || `0x${Date.now().toString(16).padStart(40, '0')}`,
      deployer: address,
      timestamp: Date.now(),
      transactionHash: `0x${Date.now().toString(16)}`,
    };
    
    setDeployedContract(contract);
    return contract;
  };

  return { 
    deployContract, 
    deployedContract, 
    address, 
    isPending, 
    isConfirming, 
    isConfirmed,
    error 
  };
}


