export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  status: "active" | "draft" | "archived";
  metrics: {
    views: number;
    clicks: number;
    conversions: number;
    revenue: number;
  };
  createdAt: string;
}

export interface ShoppingPost {
  id: string;
  productId: string;
  productName: string;
  platform: string;
  postUrl: string;
  performance: {
    impressions: number;
    clicks: number;
    conversions: number;
    revenue: number;
    conversionRate: number;
  };
  publishedAt: string;
}

export const products: Product[] = [
  {
    id: "product-1",
    name: "Premium Subscription",
    description: "Monthly premium subscription plan",
    price: 29.99,
    image: "/products/premium.jpg",
    category: "Subscription",
    status: "active",
    metrics: {
      views: 12500,
      clicks: 890,
      conversions: 45,
      revenue: 1349.55,
    },
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
  },
  {
    id: "product-2",
    name: "Pro Tools Bundle",
    description: "Complete toolkit for professionals",
    price: 99.99,
    image: "/products/tools.jpg",
    category: "Software",
    status: "active",
    metrics: {
      views: 8900,
      clicks: 567,
      conversions: 23,
      revenue: 2299.77,
    },
    createdAt: new Date(Date.now() - 1728000000).toISOString(),
  },
];

export const shoppingPosts: ShoppingPost[] = [
  {
    id: "shop-post-1",
    productId: "product-1",
    productName: "Premium Subscription",
    platform: "farcaster",
    postUrl: "https://farcaster.xyz/...",
    performance: {
      impressions: 12500,
      clicks: 890,
      conversions: 45,
      revenue: 1349.55,
      conversionRate: 5.1,
    },
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
  },
];

export const commerceStats = {
  totalProducts: 12,
  activeProducts: 8,
  totalRevenue: 45678.90,
  totalConversions: 234,
  avgConversionRate: 4.2,
};
