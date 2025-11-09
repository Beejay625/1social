export const socialCommerceProducts = [
  {
    id: "product-1",
    name: "Premium Subscription",
    price: 99,
    currency: "USD",
    status: "active",
    sales: 1240,
    revenue: 122760,
    conversionRate: 5.2,
    lastSale: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "product-2",
    name: "Enterprise Plan",
    price: 299,
    currency: "USD",
    status: "active",
    sales: 456,
    revenue: 136344,
    conversionRate: 3.8,
    lastSale: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

export const shoppingPosts = [
  {
    id: "post-1",
    product: "Premium Subscription",
    platform: "farcaster",
    clicks: 234,
    conversions: 12,
    revenue: 1188,
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
  },
  {
    id: "post-2",
    product: "Enterprise Plan",
    platform: "instagram",
    clicks: 189,
    conversions: 8,
    revenue: 2392,
    postedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

export const commerceStats = {
  totalRevenue: 259104,
  totalOrders: 1696,
  conversionRate: 5.2,
  avgOrderValue: 152.7,
};

