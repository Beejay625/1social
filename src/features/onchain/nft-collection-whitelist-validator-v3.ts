'use client';

import { useAccount, useReadContract, useSignMessage } from 'wagmi';
import { useState } from 'react';

export function useNFTCollectionWhitelistValidatorV3() {
  const { address, isConnected } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [validated, setValidated] = useState<boolean>(false);

  const { data: isWhitelisted } = useReadContract({
    address: '0x' as `0x${string}`,
    abi: [],
    functionName: 'isWhitelisted',
    args: address ? [address] : undefined,
    query: { enabled: !!address && isConnected },
  });

  const validate = async (collectionAddress: string, userAddress: string) => {
    if (!address || !isConnected) throw new Error('Wallet not connected');

    const message = `Validate whitelist for ${userAddress}`;
    await signMessageAsync({ message });

    const isValid = isWhitelisted as boolean || false;
    setValidated(isValid);
    return isValid;
  };

  return {
    validate,
    validated,
    address,
    isConnected,
    isWhitelisted: isWhitelisted as boolean,
  };
}

