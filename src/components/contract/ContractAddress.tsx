'use client';

import { SOCIAL_MEDIA_CONTRACT_ADDRESS } from '@/constants/contractAddress';
import { formatContractAddress } from '@/utils/contract-helpers';

export function ContractAddress() {
  return (
    <div className="text-sm text-gray-600">
      Contract: {formatContractAddress(SOCIAL_MEDIA_CONTRACT_ADDRESS)}
    </div>
  );
}

