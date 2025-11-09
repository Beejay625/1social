export interface Product {
  id: string;
  name: string;
  platform: string;
  price: number;
  sales: number;
  revenue: number;
  clicks: number;
  conversionRate: number;
  image: string;
}

export interface CommerceCampaign {
  id: string;
  name: string;
  products: string[];
  status: "active" | "paused" | "completed";
  startDate: string;
  endDate: string;
  totalRevenue: number;
  totalSales: number;
}

export const products: Product[] = [
  {
    id: "prod-1",
    name: "Premium Subscription",
    platform: "farcaster",
    price: 29.99,
    sales: 145,
    revenue: 4348.55,
    clicks: 1200,
    conversionRate: 12.1,
    image: "📦",
  },
  {
    id: "prod-2",
    name: "Pro Tools Bundle",
    platform: "instagram",
    price: 99.99,
    sales: 89,
    revenue: 8899.11,
    clicks: 890,
    conversionRate: 10.0,
    image: "🛠️",
  },
];

export const commerceCampaigns: CommerceCampaign[] = [
  {
    id: "camp-1",
    name: "Holiday Sale 2024",
    products: ["prod-1", "prod-2"],
    status: "active",
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    endDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 20).toISOString(),
    totalRevenue: 13247.66,
    totalSales: 234,
  },
];

export const commerceStats = {
  totalRevenue: 125000,
  totalSales: 2340,
  avgConversionRate: 11.2,
  topProduct: "Premium Subscription",
  activeCampaigns: 3,
};
