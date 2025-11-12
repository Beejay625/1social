export interface ContentVerification {
  id: string;
  contentId: string;
  verifier: string;
  verificationType: 'authenticity' | 'copyright' | 'fact-check' | 'source';
  verified: boolean;
  proof: string;
  timestamp: number;
}

export interface VerificationProof {
  id: string;
  verificationId: string;
  proofType: 'signature' | 'hash' | 'timestamp' | 'blockchain';
  proof: string;
  timestamp: number;
}

