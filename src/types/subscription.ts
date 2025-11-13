export interface Subscription {
  id: string;
  subscriber: string;
  creator: string;
  price: string;
  currency: string;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startTime: number;
  endTime: number;
  active: boolean;
}

export interface SubscriptionPayment {
  id: string;
  subscriptionId: string;
  amount: string;
  currency: string;
  timestamp: number;
  transactionHash?: string;
}

