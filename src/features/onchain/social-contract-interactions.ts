'use client';

import { useAccount, useWriteContract, useReadContract, useWaitForTransactionReceipt } from 'wagmi';
import { useState } from 'react';
import { parseAbi, encodeFunctionData } from 'viem';

const SOCIAL_CONTRACT_ABI = parseAbi([
  'function createPost(string memory content) public returns (uint256)',
  'function addComment(uint256 postId, string memory content) public returns (uint256)',
  'function addReaction(uint256 postId, string memory reactionType) public returns (uint256)',
  'function updateProfile(string memory name, string memory bio, string memory avatar) public',
  'function getPost(uint256 postId) public view returns (tuple(uint256 id, address author, string content, uint256 timestamp, uint256 likes, uint256 comments))',
  'function getTotalPosts() public view returns (uint256)',
  'function getTotalComments() public view returns (uint256)',
  'function getTotalReactions() public view returns (uint256)',
  'function getUserPosts(address user) public view returns (uint256[] memory)',
  'event PostCreated(uint256 indexed postId, address indexed author, string content, uint256 timestamp)',
]);

export interface ContractInteraction {
  id: string;
  functionName: string;
  contractAddress: string;
  timestamp: number;
  transactionHash?: string;
  status: 'pending' | 'confirmed' | 'failed';
}

export function useSocialContractInteractions(contractAddress: string) {
  const { address } = useAccount();
  const { writeContract, data: hash, isPending, error } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({
    hash,
  });
  const [interactions, setInteractions] = useState<ContractInteraction[]>([]);

  const createPost = async (content: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const interaction: ContractInteraction = {
      id: `interaction-${Date.now()}`,
      functionName: 'createPost',
      contractAddress,
      timestamp: Date.now(),
      status: 'pending',
    };
    
    setInteractions([...interactions, interaction]);
    
    try {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: SOCIAL_CONTRACT_ABI,
        functionName: 'createPost',
        args: [content],
      });
    } catch (err) {
      interaction.status = 'failed';
      setInteractions([...interactions]);
    }
    
    return interaction;
  };

  const addComment = async (postId: bigint, content: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const interaction: ContractInteraction = {
      id: `interaction-${Date.now()}`,
      functionName: 'addComment',
      contractAddress,
      timestamp: Date.now(),
      status: 'pending',
    };
    
    setInteractions([...interactions, interaction]);
    
    try {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: SOCIAL_CONTRACT_ABI,
        functionName: 'addComment',
        args: [postId, content],
      });
    } catch (err) {
      interaction.status = 'failed';
      setInteractions([...interactions]);
    }
    
    return interaction;
  };

  const addReaction = async (postId: bigint, reactionType: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const interaction: ContractInteraction = {
      id: `interaction-${Date.now()}`,
      functionName: 'addReaction',
      contractAddress,
      timestamp: Date.now(),
      status: 'pending',
    };
    
    setInteractions([...interactions, interaction]);
    
    try {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: SOCIAL_CONTRACT_ABI,
        functionName: 'addReaction',
        args: [postId, reactionType],
      });
    } catch (err) {
      interaction.status = 'failed';
      setInteractions([...interactions]);
    }
    
    return interaction;
  };

  const updateProfile = async (name: string, bio: string, avatar: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const interaction: ContractInteraction = {
      id: `interaction-${Date.now()}`,
      functionName: 'updateProfile',
      contractAddress,
      timestamp: Date.now(),
      status: 'pending',
    };
    
    setInteractions([...interactions, interaction]);
    
    try {
      writeContract({
        address: contractAddress as `0x${string}`,
        abi: SOCIAL_CONTRACT_ABI,
        functionName: 'updateProfile',
        args: [name, bio, avatar],
      });
    } catch (err) {
      interaction.status = 'failed';
      setInteractions([...interactions]);
    }
    
    return interaction;
  };

  const { data: totalPosts } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: SOCIAL_CONTRACT_ABI,
    functionName: 'getTotalPosts',
  });

  const { data: totalComments } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: SOCIAL_CONTRACT_ABI,
    functionName: 'getTotalComments',
  });

  const { data: totalReactions } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: SOCIAL_CONTRACT_ABI,
    functionName: 'getTotalReactions',
  });

  return {
    createPost,
    addComment,
    addReaction,
    updateProfile,
    interactions,
    totalPosts,
    totalComments,
    totalReactions,
    address,
    isPending,
    isConfirming,
    isConfirmed,
    error,
  };
}


