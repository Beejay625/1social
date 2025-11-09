export interface BudgetAllocation {
  id: string;
  campaign: string;
  platform: string;
  allocated: number;
  spent: number;
  remaining: number;
  period: string;
  status: "on-track" | "over-budget" | "under-budget";
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  percentage: number;
}

export const budgetAllocations: BudgetAllocation[] = [
  {
    id: "budget-1",
    campaign: "Q4 Product Launch",
    platform: "farcaster",
    allocated: 10000,
    spent: 6500,
    remaining: 3500,
    period: "Q4 2024",
    status: "on-track",
  },
  {
    id: "budget-2",
    campaign: "Holiday Promotion",
    platform: "instagram",
    allocated: 15000,
    spent: 14200,
    remaining: 800,
    period: "Q4 2024",
    status: "on-track",
  },
];

export const budgetCategories: BudgetCategory[] = [
  {
    id: "cat-1",
    name: "Paid Advertising",
    allocated: 50000,
    spent: 32000,
    percentage: 64,
  },
  {
    id: "cat-2",
    name: "Influencer Marketing",
    allocated: 30000,
    spent: 25000,
    percentage: 83.3,
  },
  {
    id: "cat-3",
    name: "Content Creation",
    allocated: 20000,
    spent: 12000,
    percentage: 60,
  },
];

export const budgetStats = {
  totalAllocated: 100000,
  totalSpent: 69000,
  totalRemaining: 31000,
  utilizationRate: 69,
  onTrackCampaigns: 5,
  overBudgetCampaigns: 1,
};
