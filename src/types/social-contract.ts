export interface Post {
  id: bigint;
  author: string;
  content: string;
  timestamp: bigint;
  likes: bigint;
  comments: bigint;
}

export interface Comment {
  id: bigint;
  postId: bigint;
  author: string;
  content: string;
  timestamp: bigint;
}

export interface Reaction {
  id: bigint;
  postId: bigint;
  user: string;
  reactionType: string;
  timestamp: bigint;
}

export interface Profile {
  user: string;
  name: string;
  bio: string;
  avatar: string;
  reputation: bigint;
  verified: boolean;
}


