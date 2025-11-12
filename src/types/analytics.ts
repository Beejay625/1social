export interface OnchainAnalytics {
  id: string;
  contentId: string;
  views: number;
  likes: number;
  shares: number;
  comments: number;
  tips: string;
  revenue: string;
  timestamp: number;
  updatedAt: number;
}

export interface AnalyticsReport {
  id: string;
  contentId: string;
  period: 'daily' | 'weekly' | 'monthly';
  metrics: OnchainAnalytics;
  generatedAt: number;
}

