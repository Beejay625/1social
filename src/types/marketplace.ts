export interface NFTListing {
  id: string;
  tokenId: string;
  collection: string;
  seller: string;
  price: string;
  currency: string;
  timestamp: number;
  status: 'active' | 'sold' | 'cancelled';
}

export interface MarketplaceOffer {
  id: string;
  listingId: string;
  offerer: string;
  price: string;
  currency: string;
  timestamp: number;
  status: 'pending' | 'accepted' | 'rejected' | 'expired';
}


