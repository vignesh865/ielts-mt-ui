export interface BlogMetadata {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    author: string;
    publishedAt: string;
    readTime: number;
    coverImage: string;
    tags: string[];
  }
  
  export interface BlogPost extends BlogMetadata {
    content: string;
  }