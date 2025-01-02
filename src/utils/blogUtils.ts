import { fetchBlog } from "../services/api";
import { BlogPost, BlogMetadata } from "../types/blog";

export const getBlogPosts = async (): Promise<BlogMetadata[]> => {
  const blogModules = import.meta.glob('/src/blog/*/metadata.json');
  const posts: BlogMetadata[] = [];

  for (const path in blogModules) {
    const metadata = await blogModules[path]() as { default: BlogMetadata };
    posts.push(metadata.default);
  }

  // Sort by published date, newest first
  return posts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  try {
    const metadata = await import(`/src/blog/${slug}/metadata.json`);
    const content = await fetchBlog(slug);
    
    return {
      ...metadata.default,
      content: content
    };
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
};