export const apiDocumentation = [
  {
    id: "doc-1",
    title: "Authentication",
    category: "getting-started",
    views: 3420,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "doc-2",
    title: "Publishing Posts",
    category: "publishing",
    views: 2890,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "doc-3",
    title: "Webhooks Guide",
    category: "integrations",
    views: 1560,
    lastUpdated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
];

export const sdkVersions = [
  {
    language: "JavaScript",
    version: "2.4.0",
    downloads: 125000,
    status: "stable",
  },
  {
    language: "Python",
    version: "2.3.5",
    downloads: 89000,
    status: "stable",
  },
  {
    language: "Ruby",
    version: "2.2.1",
    downloads: 34000,
    status: "beta",
  },
];

export const codeSnippets = [
  {
    id: "snippet-1",
    title: "Publish a post",
    language: "javascript",
    code: `await client.posts.create({
  content: "Hello world!",
  channels: ["farcaster", "instagram"]
});`,
  },
  {
    id: "snippet-2",
    title: "Get analytics",
    language: "python",
    code: `analytics = client.analytics.get(
  post_id="post_123",
  date_range="last_30_days"
)`,
  },
];

