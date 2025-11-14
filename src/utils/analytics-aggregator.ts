export function aggregateAnalytics(
  analytics: Array<{
    views: number;
    likes: number;
    shares: number;
    comments: number;
    tips: string;
    revenue: string;
  }>
): {
  totalViews: number;
  totalLikes: number;
  totalShares: number;
  totalComments: number;
  totalTips: string;
  totalRevenue: string;
} {
  const totals = analytics.reduce(
    (acc, curr) => ({
      totalViews: acc.totalViews + curr.views,
      totalLikes: acc.totalLikes + curr.likes,
      totalShares: acc.totalShares + curr.shares,
      totalComments: acc.totalComments + curr.comments,
      totalTips: (BigInt(acc.totalTips) + BigInt(curr.tips)).toString(),
      totalRevenue: (BigInt(acc.totalRevenue) + BigInt(curr.revenue)).toString(),
    }),
    {
      totalViews: 0,
      totalLikes: 0,
      totalShares: 0,
      totalComments: 0,
      totalTips: '0',
      totalRevenue: '0',
    }
  );
  
  return totals;
}


