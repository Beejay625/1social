export interface TeamMemberPerformance {
  id: string;
  name: string;
  role: string;
  postsCreated: number;
  engagementRate: number;
  avgResponseTime: string;
  contentApproved: number;
  contentRejected: number;
  score: number;
}

export interface TeamGoal {
  id: string;
  goal: string;
  target: number;
  current: number;
  deadline: string;
  status: "on-track" | "at-risk" | "completed";
}

export const teamMembersPerformance: TeamMemberPerformance[] = [
  {
    id: "member-1",
    name: "Alex Chen",
    role: "Content Creator",
    postsCreated: 45,
    engagementRate: 5.2,
    avgResponseTime: "1.5h",
    contentApproved: 42,
    contentRejected: 3,
    score: 92,
  },
  {
    id: "member-2",
    name: "Sarah Johnson",
    role: "Social Media Manager",
    postsCreated: 38,
    engagementRate: 6.8,
    avgResponseTime: "0.8h",
    contentApproved: 36,
    contentRejected: 2,
    score: 95,
  },
  {
    id: "member-3",
    name: "Mike Rodriguez",
    role: "Content Strategist",
    postsCreated: 32,
    engagementRate: 4.9,
    avgResponseTime: "2.1h",
    contentApproved: 30,
    contentRejected: 2,
    score: 88,
  },
];

export const teamGoals: TeamGoal[] = [
  {
    id: "goal-1",
    goal: "Increase engagement rate by 20%",
    target: 20,
    current: 15,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    status: "on-track",
  },
  {
    id: "goal-2",
    goal: "Publish 100 posts this month",
    target: 100,
    current: 78,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10).toISOString(),
    status: "on-track",
  },
  {
    id: "goal-3",
    goal: "Reduce response time to under 1 hour",
    target: 1,
    current: 1.2,
    deadline: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
    status: "at-risk",
  },
];

export const teamPerformanceStats = {
  avgEngagementRate: 5.6,
  totalPosts: 115,
  avgResponseTime: "1.5h",
  approvalRate: 94,
  topPerformer: "Sarah Johnson",
};

