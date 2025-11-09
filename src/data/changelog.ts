export const releases = [
  {
    id: "release-1",
    version: "2.4.0",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
    type: "major",
    features: [
      "Added AI content generation",
      "New collaboration tools",
      "Enhanced analytics dashboard",
    ],
    improvements: [
      "Improved performance by 40%",
      "Better mobile responsiveness",
    ],
    fixes: [
      "Fixed Instagram publishing issue",
      "Resolved webhook timeout errors",
    ],
  },
  {
    id: "release-2",
    version: "2.3.5",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    type: "minor",
    features: [
      "Added export functionality",
      "New security features",
    ],
    improvements: [
      "Faster page load times",
    ],
    fixes: [
      "Fixed calendar sync bug",
      "Resolved authentication issues",
    ],
  },
  {
    id: "release-3",
    version: "2.3.0",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    type: "major",
    features: [
      "Multi-platform publishing",
      "Advanced scheduling",
      "Team collaboration",
    ],
    improvements: [
      "Redesigned UI",
      "Better error handling",
    ],
    fixes: [
      "Various bug fixes",
    ],
  },
];

export const upcomingFeatures = [
  {
    id: "upcoming-1",
    title: "Mobile app for iOS and Android",
    description: "Manage your social media on the go",
    status: "in-development",
    estimatedRelease: "Q2 2024",
  },
  {
    id: "upcoming-2",
    title: "Advanced AI content suggestions",
    description: "Get personalized content recommendations",
    status: "planned",
    estimatedRelease: "Q3 2024",
  },
  {
    id: "upcoming-3",
    title: "Video content support",
    description: "Upload and schedule video posts",
    status: "planned",
    estimatedRelease: "Q3 2024",
  },
];

