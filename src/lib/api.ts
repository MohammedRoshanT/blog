export interface DummyJSONPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: { likes: number; dislikes: number };
  views: number;
  userId: number;
}

export interface DummyJSONResponse {
  posts: DummyJSONPost[];
  total: number;
  skip: number;
  limit: number;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  tags?: string[];
  views?: number;
  likes?: number;
}

function mapPost(post: DummyJSONPost): BlogPost {
  const date = new Date(1672531200000 + post.id * 86400000 * 3);
  return {
    id: post.id.toString(),
    title: post.title,
    content: post.body,
    author: `User ${post.userId}`,
    createdAt: date.toISOString(),
    tags: post.tags,
    views: post.views,
    likes: post.reactions?.likes || 0,
  };
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch('https://dummyjson.com/posts?limit=30');
  if (!res.ok) {
    throw new Error('Failed to fetch posts');
  }
  const data: DummyJSONResponse = await res.json();
  return data.posts.map(mapPost);
}

export async function fetchBlogPostById(id: string): Promise<BlogPost | undefined> {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  if (!res.ok) {
    if (res.status === 404) return undefined;
    throw new Error('Failed to fetch post');
  }
  const data: DummyJSONPost = await res.json();
  if (!data.id) return undefined; // Sometimes API returns empty object on 404
  return mapPost(data);
}
