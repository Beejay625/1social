export const billingPlans = [
  {
    id: "plan-starter",
    name: "Starter",
    price: 29,
    interval: "month",
    features: [
      "5 social accounts",
      "100 posts/month",
      "Basic analytics",
      "Email support",
    ],
    current: false,
  },
  {
    id: "plan-pro",
    name: "Pro",
    price: 99,
    interval: "month",
    features: [
      "20 social accounts",
      "Unlimited posts",
      "Advanced analytics",
      "AI content generation",
      "Priority support",
    ],
    current: true,
  },
  {
    id: "plan-enterprise",
    name: "Enterprise",
    price: 299,
    interval: "month",
    features: [
      "Unlimited accounts",
      "Unlimited posts",
      "Custom analytics",
      "Dedicated support",
      "API access",
      "Custom integrations",
    ],
    current: false,
  },
];

export const usageMetrics = {
  postsUsed: 1240,
  postsLimit: 5000,
  accountsUsed: 8,
  accountsLimit: 20,
  storageUsed: 2.4,
  storageLimit: 50,
  apiCallsUsed: 45600,
  apiCallsLimit: 100000,
};

export const invoiceHistory = [
  {
    id: "inv-1",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 15).toISOString(),
    amount: 99,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "inv-2",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 45).toISOString(),
    amount: 99,
    status: "paid",
    downloadUrl: "#",
  },
  {
    id: "inv-3",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 75).toISOString(),
    amount: 99,
    status: "paid",
    downloadUrl: "#",
  },
];

