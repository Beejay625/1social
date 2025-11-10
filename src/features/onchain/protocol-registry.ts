'use client';

import { useAccount, useSignMessage } from 'wagmi';
import { useState } from 'react';

export interface ProtocolRegistration {
  protocol: string;
  wallet: string;
  registered: boolean;
  timestamp: number;
}

export function useProtocolRegistry() {
  const { address } = useAccount();
  const { signMessageAsync } = useSignMessage();
  const [registrations, setRegistrations] = useState<ProtocolRegistration[]>([]);

  const registerProtocol = async (protocol: string) => {
    if (!address) throw new Error('Reown wallet not connected');
    
    const message = `Register: ${protocol}`;
    await signMessageAsync({ message });
    
    const registration: ProtocolRegistration = {
      protocol,
      wallet: address,
      registered: true,
      timestamp: Date.now(),
    };
    
    setRegistrations([...registrations, registration]);
    return registration;
  };

  return { registerProtocol, registrations, address };
}

