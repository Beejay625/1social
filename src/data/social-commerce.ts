export interface CommerceProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  image: string;
  platform: string;
  status: "active" | "draft" | "archived";
  metrics: {
    views: number;
    clicks: number;
    purchases: number;
    revenue: number;
    conversionRate: number;
  };
  createdAt: string;
}

export interface CommerceOrder {
  id: string;
  productId: string;
  productName: string;
  platform: string;
  customer: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "cancelled" | "refunded";
  orderDate: string;
}

export interface CommerceAnalytics {
  totalRevenue: number;
  totalOrders: number;
  avgOrderValue: number;
  conversionRate: number;
  topProduct: string;
  revenueGrowth: number;
  ordersGrowth: number;
}

export const commerceProducts: CommerceProduct[] = [
  {
    id: "product-1",
    name: "Premium Subscription",
    description: "Monthly premium subscription with all features",
    price: 29.99,
    currency: "USD",
    image: "/products/premium-subscription.jpg",
    platform: "farcaster",
    status: "active",
    metrics: {
      views: 12500,
      clicks: 890,
      purchases: 67,
      revenue: 2009.33,
      conversionRate: 7.5,
    },
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: "product-2",
    name: "Enterprise Plan",
    description: "Annual enterprise plan for teams",
    price: 299.99,
    currency: "USD",
    image: "/products/enterprise-plan.jpg",
    platform: "instagram",
    status: "active",
    metrics: {
      views: 8900,
      clicks: 450,
      purchases: 23,
      revenue: 6899.77,
      conversionRate: 5.1,
    },
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
  {
    id: "product-3",
    name: "Starter Kit",
    description: "Getting started kit for new users",
    price: 49.99,
    currency: "USD",
    image: "/products/starter-kit.jpg",
    platform: "x",
    status: "active",
    metrics: {
      views: 15600,
      clicks: 1200,
      purchases: 89,
      revenue: 4449.11,
      conversionRate: 7.4,
    },
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
];

export const recentOrders: CommerceOrder[] = [
  {
    id: "order-1",
    productId: "product-1",
    productName: "Premium Subscription",
    platform: "farcaster",
    customer: "@user123",
    amount: 29.99,
    currency: "USD",
    status: "completed",
    orderDate: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "order-2",
    productId: "product-3",
    productName: "Starter Kit",
    platform: "x",
    customer: "@user456",
    amount: 49.99,
    currency: "USD",
    status: "completed",
    orderDate: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "order-3",
    productId: "product-2",
    productName: "Enterprise Plan",
    platform: "instagram",
    customer: "@user789",
    amount: 299.99,
    currency: "USD",
    status: "pending",
    orderDate: new Date(Date.now() - 10800000).toISOString(),
  },
];

export const commerceAnalytics: CommerceAnalytics = {
  totalRevenue: 13358.21,
  totalOrders: 179,
  avgOrderValue: 74.63,
  conversionRate: 6.7,
  topProduct: "Premium Subscription",
  revenueGrowth: 15.8,
  ordersGrowth: 12.3,
};
