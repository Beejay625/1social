export interface Auction {
  id: string;
  contentId: string;
  creator: string;
  startingPrice: string;
  reservePrice: string;
  endTime: number;
  highestBid: string;
  highestBidder: string;
  status: 'active' | 'ended' | 'cancelled';
  timestamp: number;
}

export interface Bid {
  id: string;
  auctionId: string;
  bidder: string;
  amount: string;
  timestamp: number;
  status: 'pending' | 'accepted' | 'rejected';
}

