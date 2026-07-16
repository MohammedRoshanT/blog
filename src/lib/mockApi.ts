export interface BlogPost {
  id: string;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

const posts: BlogPost[] = [
  {
    id: "1",
    title: "Getting Started with Next.js App Router",
    content: "The App Router is a new paradigm for building Next.js applications, introducing Server Components, nested layouts, and advanced routing patterns. By defaulting to Server Components, Next.js significantly reduces the client-side JavaScript bundle size, leading to faster page loads and improved SEO. In this post, we explore how to set up your first App Router project and leverage its key features.",
    author: "Jane Doe",
    createdAt: "2026-07-10T10:00:00Z"
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS for Modern UIs",
    content: "Tailwind CSS has revolutionized the way we style web applications. With its utility-first approach, developers can build completely custom designs without ever leaving their HTML or JSX files. We will cover advanced techniques such as responsive design, dark mode, and creating reusable component abstractions.",
    author: "John Smith",
    createdAt: "2026-07-12T14:30:00Z"
  },
  {
    id: "3",
    title: "React Query: The Missing State Management Library",
    content: "Data fetching and state management are arguably the most complex parts of building a modern React application. React Query (now TanStack Query) abstracts away this complexity, providing powerful tools for fetching, caching, synchronizing, and updating server state. Let's dive into how it integrates seamlessly with Next.js.",
    author: "Alice Johnson",
    createdAt: "2026-07-15T09:15:00Z"
  }
];

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 800));
  return posts;
}

export async function fetchBlogPostById(id: string): Promise<BlogPost | undefined> {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return posts.find((post) => post.id === id);
}
