export interface Collaboration {
  id: string;
  contentId: string;
  creator: string;
  collaborator: string;
  role: 'co-author' | 'editor' | 'contributor';
  share: number;
  timestamp: number;
}

export interface CollaborationInvite {
  id: string;
  contentId: string;
  creator: string;
  invitee: string;
  role: 'co-author' | 'editor' | 'contributor';
  share: number;
  status: 'pending' | 'accepted' | 'rejected';
  timestamp: number;
}

