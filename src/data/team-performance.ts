export interface TeamMemberPerformance {
  id: string;
  name: string;
  role: string;
  avatar: string;
  metrics: {
    postsCreated: number;
    engagementGenerated: number;
    avgEngagementRate: number;
    responseTime: number;
    goalsMet: number;
  };
  goals: {
    target: number;
    current: number;
    completionRate: number;
  };
  trends: {
    postsCreated: "up" | "down" | "stable";
    engagement: "up" | "down" | "stable";
  };
}

export interface TeamGoal {
  id: string;
  name: string;
  target: number;
  current: number;
  deadline: string;
  assignedTo: string[];
  progress: number;
}

export const teamMemberPerformance: TeamMemberPerformance[] = [
  {
    id: "member-1",
    name: "Sarah Chen",
    role: "Content Manager",
    avatar: "SC",
    metrics: {
      postsCreated: 45,
      engagementGenerated: 12500,
      avgEngagementRate: 8.5,
      responseTime: 2.3,
      goalsMet: 4,
    },
    goals: {
      target: 50,
      current: 45,
      completionRate: 90,
    },
    trends: {
      postsCreated: "up",
      engagement: "up",
    },
  },
  {
    id: "member-2",
    name: "Mike Johnson",
    role: "Social Media Manager",
    avatar: "MJ",
    metrics: {
      postsCreated: 38,
      engagementGenerated: 9800,
      avgEngagementRate: 7.2,
      responseTime: 3.1,
      goalsMet: 3,
    },
    goals: {
      target: 40,
      current: 38,
      completionRate: 95,
    },
    trends: {
      postsCreated: "stable",
      engagement: "up",
    },
  },
];

export const teamGoals: TeamGoal[] = [
  {
    id: "goal-1",
    name: "Q1 Content Creation",
    target: 200,
    current: 156,
    deadline: new Date(Date.now() + 86400000 * 30).toISOString(),
    assignedTo: ["Sarah Chen", "Mike Johnson"],
    progress: 78,
  },
  {
    id: "goal-2",
    name: "Engagement Target",
    target: 50000,
    current: 38900,
    deadline: new Date(Date.now() + 86400000 * 45).toISOString(),
    assignedTo: ["Sarah Chen", "Mike Johnson", "Emma Wilson"],
    progress: 77.8,
  },
];

export const teamPerformanceStats = {
  totalMembers: 5,
  activeMembers: 4,
  avgEngagementRate: 7.8,
  totalPostsCreated: 156,
  totalEngagement: 38900,
};
