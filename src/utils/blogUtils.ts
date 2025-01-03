import { fetchBlog, fetchBlogMetadata } from "../services/api";
import { BlogPost, BlogMetadata } from "../types/blog";

export const getBlogPosts = async (): Promise<BlogMetadata[]> => {
  const posts: BlogMetadata[] = await fetchBlogMetadata()

  // Sort by published date, newest first
  return posts.sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
};

export const getBlogPost = async (slug: string): Promise<BlogPost | null> => {
  try {

    const allMetadata: BlogMetadata[] = await fetchBlogMetadata()
    const metadata = allMetadata.find(metadata => metadata.slug == slug)
    if(metadata == null){
        throw Error("Invalid Post");
    }

    const content = await fetchBlog(slug);
    
    return {
      ...metadata,
      content: content
    };
  } catch (error) {
    console.error('Error loading blog post:', error);
    return null;
  }
};