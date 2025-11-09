export const experiments = [
  {
    id: "exp-1",
    name: "Headline Variations Test",
    status: "running",
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    variants: 3,
    participants: 1240,
    winner: null,
  },
  {
    id: "exp-2",
    name: "Image Style Test",
    status: "completed",
    startDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    variants: 2,
    participants: 2340,
    winner: "Variant B",
  },
];

export const experimentTemplates = [
  {
    id: "template-1",
    name: "A/B Test Post Copy",
    description: "Test different post captions",
    category: "content",
  },
  {
    id: "template-2",
    name: "Image Style Test",
    description: "Compare different image styles",
    category: "visual",
  },
];

export const experimentMetrics = {
  activeExperiments: 2,
  completedThisMonth: 8,
  avgImprovement: 12.5,
};

