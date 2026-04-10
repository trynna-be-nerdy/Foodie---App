import {api} from './api';

// Types
export interface SocialPost {
  id: string;
  content: string;
  mediaUrls: string[];
  rating: number | null;
  dishTags: string[];
  viewCount: number;
  createdAt: string;
  user: {
    id: string;
    name: string;
    profilePhoto: string | null;
  };
  restaurant: {
    id: string;
    name: string;
    imageUrl: string | null;
  } | null;
  likeCount: number;
  commentCount: number;
  isLiked: boolean;
  pointsPossible?: number; // Mock field for UI (calculated client-side)
}

export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    profilePhoto: string | null;
  };
  parentId?: string | null;
  replies?: Comment[];
  replyCount?: number;
}

export interface CreatePostData {
  content: string;
  mediaUrls?: string[];
  restaurantId?: string;
  rating?: number;
  dishTags?: string[];
  privacy?: 'PUBLIC' | 'FRIENDS_ONLY' | 'PRIVATE';
}

export interface FeedResponse {
  posts: SocialPost[];
  nextCursor: string | null;
}

export interface CommentsResponse {
  comments: Comment[];
  nextCursor: string | null;
}

/**
 * Get personalized social feed
 */
export async function getSocialFeed(cursor?: string, limit: number = 20): Promise<FeedResponse> {
  const response = await api.get<FeedResponse>('/posts/feed', {
    params: {
      cursor,
      limit: limit.toString(),
    },
  });

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to fetch feed');
  }

  // Add mock points to each post (10-100 random)
  const postsWithPoints = response.data.posts.map(post => ({
    ...post,
    pointsPossible: Math.floor(Math.random() * 90) + 10, // Random 10-100 points
  }));

  return {
    posts: postsWithPoints,
    nextCursor: response.data.nextCursor,
  };
}

/**
 * Get a single post by ID
 */
export async function getPost(postId: string): Promise<SocialPost> {
  const response = await api.get<{post: SocialPost}>(`/posts/${postId}`);

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to fetch post');
  }

  return {
    ...response.data.post,
    pointsPossible: Math.floor(Math.random() * 90) + 10,
  };
}

/**
 * Create a new post
 */
export async function createPost(data: CreatePostData): Promise<SocialPost> {
  const response = await api.post<{post: SocialPost}>('/posts', data);

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to create post');
  }

  return {
    ...response.data.post,
    pointsPossible: Math.floor(Math.random() * 90) + 10,
  };
}

/**
 * Toggle like on a post
 */
export async function toggleLike(postId: string): Promise<{isLiked: boolean; likeCount: number}> {
  const response = await api.post<{isLiked: boolean; likeCount: number}>(`/posts/${postId}/like`);

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to toggle like');
  }

  return response.data;
}

/**
 * Add a comment to a post
 */
export async function addComment(
  postId: string,
  content: string,
  parentId?: string,
): Promise<{comment: Comment; commentCount: number}> {
  const response = await api.post<{comment: Comment; commentCount: number}>(
    `/posts/${postId}/comment`,
    {
      content,
      parentId,
    },
  );

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to add comment');
  }

  return response.data;
}

/**
 * Get comments for a post
 */
export async function getComments(
  postId: string,
  cursor?: string,
  limit: number = 20,
): Promise<CommentsResponse> {
  const response = await api.get<CommentsResponse>(`/posts/${postId}/comments`, {
    params: {
      cursor,
      limit: limit.toString(),
    },
  });

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to fetch comments');
  }

  return response.data;
}

/**
 * Delete a post (own posts only)
 */
export async function deletePost(postId: string): Promise<void> {
  const response = await api.delete(`/posts/${postId}`);

  if (!response.success) {
    throw new Error(response.error?.message || 'Failed to delete post');
  }
}

/**
 * Save/bookmark a post (placeholder - needs backend endpoint)
 */
export async function savePost(postId: string): Promise<{isSaved: boolean}> {
  // TODO: Implement backend endpoint POST /posts/:id/save
  // For now, return mock response
  console.log('Save post:', postId);
  return {isSaved: true};
}

/**
 * Unsave/unbookmark a post (placeholder - needs backend endpoint)
 */
export async function unsavePost(postId: string): Promise<{isSaved: boolean}> {
  // TODO: Implement backend endpoint DELETE /posts/:id/save
  // For now, return mock response
  console.log('Unsave post:', postId);
  return {isSaved: false};
}

/**
 * Get user's saved posts (placeholder - needs backend endpoint)
 */
export async function getSavedPosts(cursor?: string, limit: number = 20): Promise<FeedResponse> {
  // TODO: Implement backend endpoint GET /posts/saved
  // For now, return empty response
  console.log('Get saved posts:', cursor, limit);
  return {
    posts: [],
    nextCursor: null,
  };
}

/**
 * Get posts by a specific user (user profile feed)
 */
export async function getUserPosts(
  userId: string,
  cursor?: string,
  limit: number = 20,
): Promise<FeedResponse> {
  const response = await api.get<FeedResponse>(`/posts/user/${userId}`, {
    params: {
      cursor,
      limit: limit.toString(),
    },
  });

  if (!response.success || !response.data) {
    throw new Error(response.error?.message || 'Failed to fetch user posts');
  }

  const postsWithPoints = response.data.posts.map(post => ({
    ...post,
    pointsPossible: Math.floor(Math.random() * 90) + 10,
  }));

  return {
    posts: postsWithPoints,
    nextCursor: response.data.nextCursor,
  };
}

/**
 * Search restaurants for tagging (placeholder)
 */
export async function searchRestaurants(
  query: string,
  latitude?: number,
  longitude?: number,
): Promise<Array<{id: string; name: string; cuisineType: string; distance?: number}>> {
  // Mock data for now
  const mockRestaurants = [
    {id: 'r1', name: 'Chipotle Mexican Grill', cuisineType: 'Mexican'},
    {id: 'r2', name: 'Shake Shack', cuisineType: 'American'},
    {id: 'r3', name: 'Panera Bread', cuisineType: 'Bakery'},
    {id: 'r4', name: 'Sweetgreen', cuisineType: 'Salads'},
    {id: 'r5', name: 'Chick-fil-A', cuisineType: 'Fast Food'},
    {id: 'r6', name: 'The Cheesecake Factory', cuisineType: 'American'},
    {id: 'r7', name: 'In-N-Out Burger', cuisineType: 'Fast Food'},
    {id: 'r8', name: 'Olive Garden', cuisineType: 'Italian'},
    {id: 'r9', name: 'Red Lobster', cuisineType: 'Seafood'},
    {id: 'r10', name: 'Texas Roadhouse', cuisineType: 'Steakhouse'},
    {id: 'r11', name: 'P.F. Chang\'s', cuisineType: 'Asian'},
    {id: 'r12', name: 'Outback Steakhouse', cuisineType: 'Steakhouse'},
    {id: 'r13', name: 'Buffalo Wild Wings', cuisineType: 'American'},
    {id: 'r14', name: 'Applebee\'s', cuisineType: 'American'},
    {id: 'r15', name: 'Maggiano\'s Little Italy', cuisineType: 'Italian'},
    {id: 'r16', name: 'Benihana', cuisineType: 'Japanese'},
    {id: 'r17', name: 'Hard Rock Cafe', cuisineType: 'American'},
    {id: 'r18', name: 'Morton\'s The Steakhouse', cuisineType: 'Steakhouse'},
    {id: 'r19', name: 'Ruth\'s Chris Steak House', cuisineType: 'Steakhouse'},
    {id: 'r20', name: 'The Capital Grille', cuisineType: 'Steakhouse'},
  ];

  if (!query) {
    return mockRestaurants;
  }

  return mockRestaurants.filter(r =>
    r.name.toLowerCase().includes(query.toLowerCase()),
  );
}
