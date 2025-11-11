export function calculateReputationScore(
  posts: number,
  engagement: number,
  followers: number,
  tips: number
): number {
  return posts * 10 + engagement * 5 + followers * 2 + tips * 20;
}

export function getReputationLevel(score: number): string {
  if (score >= 1000) return 'Elite';
  if (score >= 500) return 'Expert';
  if (score >= 100) return 'Advanced';
  if (score >= 50) return 'Intermediate';
  return 'Beginner';
}

