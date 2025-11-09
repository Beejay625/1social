export const teamPerformance = {
  overallScore: 87,
  avgResponseTime: "2.8 hours",
  contentCreated: 245,
  engagementGenerated: 12450,
  goalsMet: 18,
  goalsTotal: 20,
};

export const teamMembers = [
  {
    id: "member-1",
    name: "Sarah Chen",
    role: "Content Creator",
    score: 92,
    contentCreated: 45,
    engagementGenerated: 2340,
    responseRate: 95,
    goalsMet: 8,
    goalsTotal: 8,
    trend: "up",
  },
  {
    id: "member-2",
    name: "Mike Johnson",
    role: "Social Media Manager",
    score: 88,
    contentCreated: 38,
    engagementGenerated: 1890,
    responseRate: 89,
    goalsMet: 7,
    goalsTotal: 8,
    trend: "up",
  },
  {
    id: "member-3",
    name: "Emma Davis",
    role: "Community Manager",
    score: 85,
    contentCreated: 32,
    engagementGenerated: 1560,
    responseRate: 92,
    goalsMet: 6,
    goalsTotal: 8,
    trend: "stable",
  },
];

export const teamGoals = [
  {
    id: "goal-1",
    name: "Content Creation",
    target: 50,
    current: 45,
    progress: 90,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "goal-2",
    name: "Engagement Rate",
    target: 6.5,
    current: 6.2,
    progress: 95,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
  {
    id: "goal-3",
    name: "Response Time",
    target: 2.5,
    current: 2.8,
    progress: 89,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
  },
];

export const teamProductivity = [
  {
    period: "This Week",
    contentCreated: 45,
    engagementGenerated: 2340,
    avgScore: 88,
    change: 5,
  },
  {
    period: "Last Week",
    contentCreated: 42,
    engagementGenerated: 2180,
    avgScore: 85,
    change: 3,
  },
];

export const teamInsights = [
  {
    id: "insight-1",
    type: "strength",
    title: "High Response Rate",
    description: "Team maintains 92% average response rate",
    impact: "positive",
  },
  {
    id: "insight-2",
    type: "opportunity",
    title: "Increase Content Volume",
    description: "Content creation is 10% below target",
    impact: "medium",
  },
];

