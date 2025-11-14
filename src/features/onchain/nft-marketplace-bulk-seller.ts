'use client';

import { useAccount, useWriteContract, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface BulkListing {
  nftAddress: string;
  tokenIds: bigint[];
  prices: bigint[];
  marketplaceAddress: string;
}

export function useNFTMarketplaceBulkSeller() {
  const { address, isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  const { signMessageAsync } = useSignMessage();
  const [selling, setSelling] = useState(false);
  const [approved, setApproved] = useState(false);

  const { data: allowance } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'isApprovedForAll',
    args: [address, '0x'],
  });

  const approveMarketplace = async (nftAddress: string, marketplaceAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const message = `Approve marketplace: ${marketplaceAddress}`;
    await signMessageAsync({ message });

    await writeContract({
      address: nftAddress as `0x${string}`,
      abi: [],
      functionName: 'setApprovalForAll',
      args: [marketplaceAddress, true],
    });

    setApproved(true);
  };

  const bulkList = async (listing: BulkListing) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');
    setSelling(true);

    try {
      const message = `Bulk list ${listing.tokenIds.length} NFTs`;
      await signMessageAsync({ message });

      await writeContract({
        address: listing.marketplaceAddress as `0x${string}`,
        abi: [],
        functionName: 'bulkList',
        args: [listing.nftAddress, listing.tokenIds, listing.prices],
      });
    } finally {
      setSelling(false);
    }
  };

  return {
    approveMarketplace,
    bulkList,
    selling,
    approved: allowance || approved,
    address,
    isConnected,
  };
}

