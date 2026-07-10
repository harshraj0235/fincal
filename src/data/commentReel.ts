export interface ReelComment {
  postId: string;
  user: string;
  comment: string;
  createdAt: string;
}

export const commentReel: ReelComment[] = [];

export function addComment(comment: Omit<ReelComment, 'createdAt'>) {
  commentReel.push({ ...comment, createdAt: new Date().toISOString() });
}

export function getCommentsByPostId(postId: string): ReelComment[] {
  return commentReel.filter(c => c.postId === postId);
} 
